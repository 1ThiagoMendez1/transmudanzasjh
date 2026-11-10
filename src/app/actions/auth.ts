'use server';

import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { supabase } from '@/lib/supabase';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'mivra-super-secret-key-2026-change-me');

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function loginAction(email: string, password: string) {
  try {
    const { data: user, error } = await supabase
      .from('system_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return { success: false, error: 'Credenciales inválidas' };
    }

    if (user.status !== 'Activo') {
      return { success: false, error: 'Usuario inactivo' };
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return { success: false, error: 'Credenciales inválidas' };
    }

    // Generate JWT
    const token = await new SignJWT({ 
        id: user.id, 
        email: user.email, 
        role: user.role,
        name: user.name
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(JWT_SECRET);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60 // 8 hours
    });

    return { success: true, role: user.role };
  } catch (err: any) {
    return { success: false, error: 'Ocurrió un error inesperado' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  return { success: true };
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (err) {
    return null;
  }
}

export async function createSystemUserAction(user: { name: string; email: string; password_raw: string; role: string; status?: string }) {
  try {
    const password_hash = await hashPassword(user.password_raw);
    
    const { error } = await supabase.from('system_users').insert([{
      name: user.name,
      email: user.email,
      password_hash: password_hash,
      role: user.role,
      status: user.status || 'Activo'
    }]);

    if (error) {
      throw new Error(error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
