import { supabase } from './supabase';

export interface FleetVehicle {
  id?: string;
  plate: string;
  brand: string;
  model: string;
  type: string;
  capacity_kg: number;
  status?: string;
}

export async function getFleet(): Promise<FleetVehicle[]> {
  const { data, error } = await supabase.from('fleet').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching fleet:', error);
    return [];
  }
  return data;
}

export async function createFleetVehicle(vehicle: FleetVehicle): Promise<void> {
  const { error } = await supabase.from('fleet').insert([vehicle]);
  if (error) {
    console.error('Error creating fleet vehicle:', error);
    throw new Error('No se pudo registrar el vehículo');
  }
}

export async function updateFleetVehicle(id: string, updates: Partial<FleetVehicle>): Promise<void> {
  const { error } = await supabase.from('fleet').update(updates).eq('id', id);
  if (error) {
    console.error('Error updating fleet vehicle:', error);
    throw new Error('No se pudo actualizar el vehículo');
  }
}

export async function deleteFleetVehicle(id: string): Promise<void> {
  const { error } = await supabase.from('fleet').delete().eq('id', id);
  if (error) {
    console.error('Error deleting fleet vehicle:', error);
    throw new Error('No se pudo eliminar el vehículo');
  }
}
