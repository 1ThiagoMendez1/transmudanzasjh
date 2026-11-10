import { NextResponse } from 'next/server';
import { createSystemUserAction } from '@/app/actions/auth';

export async function GET() {
  const result = await createSystemUserAction({
    name: 'Johanna Admin',
    email: 'johanna@transmudanzasjh.com',
    password_raw: 'TransMudanzas2026*', // Contraseña segura
    role: 'administrador',
    status: 'Activo'
  });

  if (result.success) {
    return NextResponse.json({ message: 'Usuario administrador creado correctamente.' });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}
