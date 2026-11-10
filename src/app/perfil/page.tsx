import React from 'react';
import { redirect } from 'next/navigation';
import { getSession, logoutAction } from '@/app/actions/auth';
import { Navigation } from '@/components/Navigation';
import { UserCog, Mail, ShieldAlert, BadgeCheck, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function PerfilPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { name, email, role } = session as any;

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <UserCog className="text-primary" size={32} />
          Mi Perfil
        </h1>
        <p className="text-muted-foreground">Información y configuración de tu cuenta.</p>
      </header>

      <div className="max-w-3xl">
        <Card className="glass-card overflow-hidden rounded-[2rem] border-white/10 shadow-2xl relative">
          <div className="h-32 bg-gradient-to-r from-primary to-primary/80 opacity-80" />
          
          <CardContent className="px-8 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 sm:-mt-16 mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-background border-4 border-background flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl">
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </div>
              
              <div className="text-center sm:text-left mb-2">
                <h2 className="text-2xl font-bold">{name}</h2>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-primary font-medium text-sm mt-1">
                  <BadgeCheck size={16} />
                  <span className="capitalize">{role}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="bg-muted/30 rounded-2xl p-6 border border-white/5 space-y-4">
                <h3 className="font-bold text-lg border-b border-white/10 pb-2 mb-4">Información de Contacto</h3>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                    <p className="font-medium">{email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nivel de Acceso</p>
                    <p className="font-medium capitalize">{role}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <form action={async () => {
                  'use server';
                  await logoutAction();
                  redirect('/login');
                }}>
                  <Button type="submit" variant="destructive" className="rounded-xl gap-2 shadow-lg hover:shadow-red-500/20 px-6">
                    <LogOut size={16} /> Cerrar Sesión
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
