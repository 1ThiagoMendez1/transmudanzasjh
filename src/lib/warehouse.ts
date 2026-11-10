import { supabase } from './supabase';

export interface InventoryItemDetail {
  name: string;
  qty: number;
  state: string;
}

export interface InventoryItem {
  id: string;
  guideNumber: string;
  client: string;
  clientPhone: string;
  clientEmail: string;
  clientDoc: string;
  items: string;
  space: string;
  entry: string;
  exitEstimated: string;
  status: string;
  location: string;
  supervisor: string;
  monthlyRate: string;
  insuranceValue: string;
  inventoryDetails: InventoryItemDetail[];
  created_at?: string;
}

// Convert DB row to InventoryItem
function mapDbToItem(row: any): InventoryItem {
  return {
    id: row.id,
    guideNumber: row.guide_number,
    client: row.client_name,
    clientPhone: row.client_phone,
    clientEmail: row.client_email,
    clientDoc: row.client_doc,
    items: row.items_summary,
    space: row.space,
    entry: row.entry_date,
    exitEstimated: row.exit_estimated_date,
    status: row.status,
    location: row.location,
    supervisor: row.supervisor,
    monthlyRate: row.monthly_rate,
    insuranceValue: row.insurance_value,
    inventoryDetails: row.inventory_details || [],
    created_at: row.created_at
  };
}

// Convert InventoryItem to DB row format
function mapItemToDb(item: Omit<InventoryItem, 'id'>) {
  return {
    guide_number: item.guideNumber,
    client_name: item.client,
    client_phone: item.clientPhone,
    client_email: item.clientEmail,
    client_doc: item.clientDoc,
    items_summary: item.items,
    space: item.space,
    entry_date: item.entry,
    exit_estimated_date: item.exitEstimated,
    status: item.status,
    location: item.location,
    supervisor: item.supervisor,
    monthly_rate: item.monthlyRate,
    insurance_value: item.insuranceValue,
    inventory_details: item.inventoryDetails
  };
}

export async function getInventory(): Promise<InventoryItem[]> {
  const { data, error } = await supabase
    .from('warehouse_inventory')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }

  return (data || []).map(mapDbToItem);
}

export async function createInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem | null> {
  const dbData = mapItemToDb(item);
  
  const { data, error } = await supabase
    .from('warehouse_inventory')
    .insert([dbData])
    .select()
    .single();

  if (error) {
    console.error('Error creating inventory item:', error);
    throw new Error('No se pudo guardar el registro en la bodega');
  }

  return data ? mapDbToItem(data) : null;
}
