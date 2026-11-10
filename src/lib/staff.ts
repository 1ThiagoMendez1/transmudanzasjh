import { supabase } from './supabase';

export interface StaffMember {
  id?: string;
  name: string;
  role: string;
  phone: string;
  document_id: string;
  status?: string;
}

export async function getStaff(): Promise<StaffMember[]> {
  const { data, error } = await supabase.from('staff').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching staff:', error);
    return [];
  }
  return data;
}

export async function createStaffMember(staff: StaffMember): Promise<void> {
  const { error } = await supabase.from('staff').insert([staff]);
  if (error) {
    console.error('Error creating staff member:', error);
    throw new Error('No se pudo registrar al miembro del personal');
  }
}

export async function updateStaffMember(id: string, updates: Partial<StaffMember>): Promise<void> {
  const { error } = await supabase.from('staff').update(updates).eq('id', id);
  if (error) {
    console.error('Error updating staff member:', error);
    throw new Error('No se pudo actualizar al miembro del personal');
  }
}

export async function deleteStaffMember(id: string): Promise<void> {
  const { error } = await supabase.from('staff').delete().eq('id', id);
  if (error) {
    console.error('Error deleting staff member:', error);
    throw new Error('No se pudo eliminar al miembro del personal');
  }
}
