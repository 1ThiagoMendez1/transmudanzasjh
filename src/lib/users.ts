import { supabase } from './supabase';

export type UserRole = 'ayudante' | 'conductor' | 'administrador' | 'contador';
export type UserStatus = 'Activo' | 'Inactivo';

export interface SystemUser {
  id?: string;
  name: string;
  email: string;
  password_hash?: string; // Solo se envía en creación, nunca se debe leer por seguridad en UI
  role: UserRole;
  status?: UserStatus;
  created_at?: string;
}

export async function getUsers(): Promise<SystemUser[]> {
  const { data, error } = await supabase.from('system_users').select('id, name, email, role, status, created_at').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return data as SystemUser[];
}

export async function createUser(user: SystemUser & { password_hash: string }): Promise<void> {
  const { error } = await supabase.from('system_users').insert([{
    name: user.name,
    email: user.email,
    password_hash: user.password_hash,
    role: user.role,
    status: user.status || 'Activo'
  }]);
  
  if (error) {
    console.error('Error creating user:', error);
    throw new Error('No se pudo crear el usuario');
  }
}

export async function updateUser(id: string, updates: Partial<SystemUser>): Promise<void> {
  const { error } = await supabase.from('system_users').update(updates).eq('id', id);
  
  if (error) {
    console.error('Error updating user:', error);
    throw new Error('No se pudo actualizar el usuario');
  }
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from('system_users').delete().eq('id', id);
  
  if (error) {
    console.error('Error deleting user:', error);
    throw new Error('No se pudo eliminar el usuario');
  }
}
