import { supabase } from './supabase';

export type PqrsfStatus = 'Pendiente' | 'En Revisión' | 'Resuelto';
export type TipoServicio = 'Mudanza residencial' | 'Mudanza empresarial' | 'Transporte de vehículos' | 'Envío nacional' | 'Otro';
export type TipoSolicitud = 'Petición (solicitud de información o servicio)' | 'Queja (inconformidad con la atención recibida)' | 'Reclamo (el servicio no se cumplió o se cumplió mal)' | 'Felicitación (reconocimiento a nuestro equipo o servicio)';

export interface PqrsfDocument {
  id?: string;
  created_at?: string;
  nombre: string;
  correo: string;
  telefono: string;
  fecha_servicio: string;
  tipo_servicio: string;
  tipo_solicitud: string;
  puntualidad: number;
  cuidado: number;
  amabilidad: number;
  seguridad: number;
  agilidad: number;
  mensaje: string;
  estado?: PqrsfStatus;
}

export async function submitPqrsf(data: Omit<PqrsfDocument, 'id' | 'created_at' | 'estado'>): Promise<string> {
  const { data: insertedData, error } = await supabase
    .from('pqrsf')
    .insert([{
      ...data,
      estado: 'Pendiente'
    }])
    .select()
    .single();

  if (error) {
    console.error('Error insertando PQRSF:', error);
    throw new Error('No se pudo enviar el formulario PQRSF.');
  }

  return insertedData.id;
}

export async function getAllPqrsf(): Promise<PqrsfDocument[]> {
  const { data, error } = await supabase
    .from('pqrsf')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error consultando PQRSF:', error);
    return [];
  }

  return data as PqrsfDocument[];
}

export async function updatePqrsfStatus(id: string, newStatus: PqrsfStatus): Promise<void> {
  const { error } = await supabase
    .from('pqrsf')
    .update({ estado: newStatus })
    .eq('id', id);

  if (error) {
    console.error('Error actualizando estado PQRSF:', error);
    throw new Error('No se pudo actualizar el estado.');
  }
}
