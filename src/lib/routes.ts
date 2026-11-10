import { supabase } from './supabase';
import { JourneyNode } from '@/components/SnakeJourney';

export interface ActiveJourney {
  id: string;
  driver: string;
  truck: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
  fund: string;
  spent: string;
  helpers?: string[];
  quoteId?: string;
}

export async function getAllActiveJourneys(): Promise<ActiveJourney[]> {
  const { data, error } = await supabase
    .from('active_journeys')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((item: any) => ({
    id: item.id,
    driver: item.driver,
    truck: item.truck,
    origin: item.origin,
    destination: item.destination,
    status: item.status,
    progress: item.progress,
    fund: item.fund,
    spent: item.spent,
    helpers: item.helpers || [],
    quoteId: item.quote_id
  }));
}

export async function getNodesByJourney(journeyId: string): Promise<JourneyNode[]> {
  const { data, error } = await supabase
    .from('journey_nodes')
    .select('*')
    .eq('journey_id', journeyId)
    .order('sequence_order', { ascending: true });

  if (error || !data) return [];

  return data.map((item: any) => ({
    id: item.node_id, // e.g. "1", "2", "return-node"
    type: item.type,
    label: item.label,
    time: item.time_str,
    status: item.status,
    isOriginalFinal: item.is_original_final,
    isExtra: item.is_extra,
    details: item.details
  }));
}

export async function createJourney(data: Omit<ActiveJourney, 'status' | 'progress' | 'spent'>): Promise<string> {
  const newJourney = {
    id: data.id,
    driver: data.driver,
    truck: data.truck,
    origin: data.origin,
    destination: data.destination,
    status: 'Iniciando',
    progress: 5,
    fund: data.fund,
    spent: '$0',
    helpers: data.helpers || [],
    quote_id: data.quoteId
  };

  const { error: journeyError } = await supabase.from('active_journeys').insert([newJourney]);
  
  if (journeyError) {
    console.error('Error creating journey:', journeyError);
    throw new Error('No se pudo crear la ruta');
  }

  const initialNodes = [
    { journey_id: data.id, node_id: '1', type: 'start', label: 'Origen', time_str: '08:00 AM', status: 'completed', sequence_order: 1, details: { address: data.origin } },
    { journey_id: data.id, node_id: '2', type: 'loading', label: 'Cargue Inicial', time_str: '08:30 AM', status: 'current', sequence_order: 2, details: { description: 'Cargue en origen' } },
    { journey_id: data.id, node_id: '3', type: 'delivery', label: 'Destino Inicial', time_str: 'Por definir', status: 'pending', sequence_order: 3, is_original_final: true, details: { address: data.destination } },
  ];

  const { error: nodesError } = await supabase.from('journey_nodes').insert(initialNodes);

  if (nodesError) {
    console.error('Error creating nodes:', nodesError);
  }

  return data.id;
}

export async function addExpenseToJourney(
  journeyId: string, 
  label: string, 
  amount: number, 
  description: string, 
  photosCount: number
): Promise<void> {
  
  // To insert a node in sequence, we might fetch current nodes to find the right order,
  // or use a timestamp-based approach. For simplicity, we assign a high sequence number before return.
  const newNode = {
    journey_id: journeyId,
    node_id: `exp-${Date.now()}`,
    type: 'expense',
    label,
    time_str: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'completed',
    sequence_order: Date.now(), // Easy way to order dynamically added nodes before the return (which we'll need to adjust, but fine for now)
    details: {
      amount,
      description,
      photosCount
    }
  };

  await supabase.from('journey_nodes').insert([newNode]);

  // Update spent and fund in journey
  const { data: journeyData } = await supabase.from('active_journeys').select('spent, fund').eq('id', journeyId).single();
  if (journeyData) {
    const currentSpent = parseInt(journeyData.spent?.replace(/[^\d-]/g, '') || '0', 10);
    const newSpent = currentSpent + amount;

    const currentFund = parseInt(journeyData.fund?.replace(/[^\d-]/g, '') || '0', 10);
    const newFund = currentFund - amount;

    await supabase
      .from('active_journeys')
      .update({ 
        spent: `$${newSpent.toLocaleString('es-CO')}`,
        fund: `$${newFund.toLocaleString('es-CO')}`
      })
      .eq('id', journeyId);
  }
}

export async function addServiceToJourney(journeyId: string, serviceData: {
  destino: string;
  remitente: string;
  destinatario: string;
  fechaRecepcion?: string;
  description: string;
  photosCount: number;
  autoGuia: string;
}): Promise<void> {
  const newNode = {
    journey_id: journeyId,
    node_id: `ext-${Date.now()}`,
    type: 'delivery',
    label: `Servicio Ext: ${serviceData.destino}`,
    time_str: serviceData.fechaRecepcion 
      ? new Date(serviceData.fechaRecepcion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : 'Por definir',
    status: 'pending',
    is_extra: true,
    sequence_order: Date.now() + 1,
    details: {
      client: serviceData.destinatario,
      sender: serviceData.remitente,
      receiver: serviceData.destinatario,
      address: serviceData.destino,
      description: serviceData.description,
      photosCount: serviceData.photosCount
    }
  };

  await supabase.from('journey_nodes').insert([newNode]);
}

export async function updateJourneyNode(journeyId: string, nodeId: string, updates: any): Promise<void> {
  const { error } = await supabase
    .from('journey_nodes')
    .update(updates)
    .match({ journey_id: journeyId, node_id: nodeId });

  if (error) {
    console.error('Error updating journey node:', error);
    throw new Error('No se pudo actualizar la información del nodo');
  }
}

export async function deleteJourney(journeyId: string): Promise<void> {
  // First, delete related nodes
  const { error: nodesError } = await supabase
    .from('journey_nodes')
    .delete()
    .eq('journey_id', journeyId);

  if (nodesError) {
    console.error('Error deleting journey nodes:', nodesError);
    throw new Error('No se pudieron eliminar los nodos de la ruta');
  }

  // Then delete related expenses
  const { error: expensesError } = await supabase
    .from('expenses')
    .delete()
    .eq('journey_id', journeyId);

  if (expensesError) {
    console.error('Error deleting journey expenses:', expensesError);
    // don't throw, maybe there are no expenses or it fails silently
  }

  // Finally delete the journey itself
  const { error: journeyError } = await supabase
    .from('active_journeys')
    .delete()
    .eq('id', journeyId);

  if (journeyError) {
    console.error('Error deleting journey:', journeyError);
    throw new Error('No se pudo eliminar la ruta principal');
  }
}
