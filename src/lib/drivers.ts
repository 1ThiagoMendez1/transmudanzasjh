import { supabase } from './supabase';

export interface Driver {
  id?: string;
  name: string;
  document_id: string;
  phone: string;
  license_number: string;
  license_category: string;
  license_expiration: string;
  status?: string;
}

export async function getDrivers(): Promise<Driver[]> {
  const { data, error } = await supabase.from('drivers').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching drivers:', error);
    return [];
  }
  return data;
}

export async function createDriver(driver: Driver): Promise<void> {
  const { error } = await supabase.from('drivers').insert([driver]);
  if (error) {
    console.error('Error creating driver:', error);
    throw new Error('No se pudo crear el conductor');
  }
}

export async function updateDriver(id: string, updates: Partial<Driver>): Promise<void> {
  const { error } = await supabase.from('drivers').update(updates).eq('id', id);
  if (error) {
    console.error('Error updating driver:', error);
    throw new Error('No se pudo actualizar el conductor');
  }
}

export async function deleteDriver(id: string): Promise<void> {
  const { error } = await supabase.from('drivers').delete().eq('id', id);
  if (error) {
    console.error('Error deleting driver:', error);
    throw new Error('No se pudo eliminar el conductor');
  }
}
