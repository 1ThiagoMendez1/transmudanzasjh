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

const INITIAL_NODES_1: JourneyNode[] = [
  { id: '1', type: 'start', label: 'Origen', time: '08:00 AM', status: 'completed', details: { address: 'Calle 100, Bogotá' } },
  { id: '2', type: 'loading', label: 'Cargue Inicial', time: '10:30 AM', status: 'completed', details: { client: 'Juan Perez', address: 'Calle 140, Bogotá', description: 'Mudanza residencial base' } },
  { id: '3', type: 'expense', label: 'Peaje', time: '01:15 PM', status: 'completed', details: { amount: 15000, description: 'Peaje Andes' } },
  { id: '4', type: 'delivery', label: 'Entrega Principal', time: '03:45 PM', status: 'current', isOriginalFinal: true, details: { client: 'Juan Perez', address: 'Medellín, Antioquia' } },
  { id: 'return-node', type: 'return', label: 'Regreso', time: '--:--', status: 'pending' },
  { id: 'closure-node', type: 'closure', label: 'Cierre', time: '--:--', status: 'pending' },
];

const INITIAL_NODES_2: JourneyNode[] = [
  { id: '1', type: 'start', label: 'Origen', time: '06:00 AM', status: 'completed', details: { address: 'Zona Franca, Cali' } },
  { id: '2', type: 'loading', label: 'Cargue Industrial', time: '08:30 AM', status: 'completed', details: { client: 'TechCorp', address: 'Parque Industrial, Yumbo', description: 'Equipos de cómputo' } },
  { id: '3', type: 'expense', label: 'Gasolina', time: '09:15 AM', status: 'completed', details: { amount: 120000, description: 'Estación de servicio' } },
  { id: '4', type: 'delivery', label: 'Descargue 1', time: '12:45 PM', status: 'completed', details: { client: 'TechCorp', address: 'Pereira, Risaralda' } },
  { id: '5', type: 'delivery', label: 'Descargue 2', time: '04:00 PM', status: 'current', isOriginalFinal: true, details: { client: 'TechCorp', address: 'Manizales, Caldas' } },
  { id: 'return-node', type: 'return', label: 'Regreso', time: '--:--', status: 'pending' },
  { id: 'closure-node', type: 'closure', label: 'Cierre', time: '--:--', status: 'pending' },
];

const INITIAL_NODES_3: JourneyNode[] = [
  { id: '1', type: 'start', label: 'Origen', time: '05:00 AM', status: 'completed', details: { address: 'Bello, Antioquia' } },
  { id: '2', type: 'loading', label: 'Cargue', time: '07:30 AM', status: 'completed', details: { client: 'Muebles el Roble', address: 'Itagüí, Antioquia', description: 'Mobiliario de oficina' } },
  { id: '3', type: 'delivery', label: 'Entrega', time: '10:00 AM', status: 'current', isOriginalFinal: true, details: { client: 'Muebles el Roble', address: 'Envigado, Antioquia' } },
  { id: 'return-node', type: 'return', label: 'Regreso', time: '--:--', status: 'pending' },
  { id: 'closure-node', type: 'closure', label: 'Cierre', time: '--:--', status: 'pending' },
];

const ACTIVE_JOURNEYS_INITIAL: ActiveJourney[] = [
  { id: 'GUIA-000842', driver: 'Carlos Gómez', truck: 'Furgón NPR - XYZ-123', origin: 'Bogotá, D.C.', destination: 'Medellín, Antioquia', status: 'En Ruta', progress: 65, fund: '$1.240.000', spent: '$360.000' },
  { id: 'GUIA-000843', driver: 'Luis Martinez', truck: 'Camión Sencillo - ABC-987', origin: 'Cali, Valle del Cauca', destination: 'Manizales, Caldas', status: 'En Ruta', progress: 80, fund: '$850.000', spent: '$420.000' },
  { id: 'GUIA-000844', driver: 'Andrés Felipe', truck: 'Tractomula - DEF-456', origin: 'Medellín, Antioquia', destination: 'Envigado, Antioquia', status: 'Iniciando', progress: 30, fund: '$2.500.000', spent: '$150.000' }
];

const INITIAL_NODES_BY_JOURNEY: Record<string, JourneyNode[]> = {
  'GUIA-000842': INITIAL_NODES_1,
  'GUIA-000843': INITIAL_NODES_2,
  'GUIA-000844': INITIAL_NODES_3,
};

let journeysStore: ActiveJourney[] = [];
let nodesStore: Record<string, JourneyNode[]> = {};

function initStorage() {
  if (typeof window !== 'undefined') {
    const storedJourneys = localStorage.getItem('mivra_active_journeys');
    const storedNodes = localStorage.getItem('mivra_nodes_by_journey');
    
    if (storedJourneys && storedNodes) {
      try {
        journeysStore = JSON.parse(storedJourneys);
        nodesStore = JSON.parse(storedNodes);
      } catch (e) {
        console.error("Failed to parse stored active journeys or nodes");
      }
    } else {
      journeysStore = ACTIVE_JOURNEYS_INITIAL;
      nodesStore = INITIAL_NODES_BY_JOURNEY;
      localStorage.setItem('mivra_active_journeys', JSON.stringify(journeysStore));
      localStorage.setItem('mivra_nodes_by_journey', JSON.stringify(nodesStore));
    }
  }
}

// Initialize on load
initStorage();

function saveToLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mivra_active_journeys', JSON.stringify(journeysStore));
    localStorage.setItem('mivra_nodes_by_journey', JSON.stringify(nodesStore));
  }
}

export async function getAllActiveJourneys(): Promise<ActiveJourney[]> {
  initStorage();
  return journeysStore;
}

export async function getNodesByJourney(journeyId: string): Promise<JourneyNode[]> {
  initStorage();
  return nodesStore[journeyId] || [];
}

export async function createJourney(data: Omit<ActiveJourney, 'status' | 'progress' | 'spent'>): Promise<string> {
  initStorage();
  
  const newJourney: ActiveJourney = {
    ...data,
    status: 'Iniciando',
    progress: 5,
    spent: '$0'
  };

  const newNodes: JourneyNode[] = [
    { id: '1', type: 'start', label: 'Origen', time: '08:00 AM', status: 'completed', details: { address: data.origin } },
    { id: '2', type: 'loading', label: 'Cargue Inicial', time: '08:30 AM', status: 'current', details: { description: 'Cargue en origen' } },
    { id: '3', type: 'delivery', label: 'Destino Inicial', time: 'Por definir', status: 'pending', isOriginalFinal: true, details: { address: data.destination } },
    { id: 'return-node', type: 'return', label: 'Regreso', time: '--:--', status: 'pending' },
    { id: 'closure-node', type: 'closure', label: 'Cierre', time: '--:--', status: 'pending' },
  ];

  journeysStore = [newJourney, ...journeysStore];
  nodesStore[data.id] = newNodes;
  saveToLocalStorage();

  return data.id;
}

export async function addExpenseToJourney(
  journeyId: string, 
  label: string, 
  amount: number, 
  description: string, 
  photosCount: number
): Promise<void> {
  initStorage();

  const nodes = nodesStore[journeyId] || [];
  const returnIndex = nodes.findIndex(n => n.id === 'return-node');
  
  const newNode: JourneyNode = {
    id: `exp-${Date.now()}`,
    type: 'expense',
    label,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'completed',
    details: {
      amount,
      description,
      photosCount
    }
  };

  const updatedNodes = [...nodes];
  if (returnIndex !== -1) {
    updatedNodes.splice(returnIndex, 0, newNode);
  } else {
    updatedNodes.push(newNode);
  }
  nodesStore[journeyId] = updatedNodes;

  // Update spent in journey
  const journeyIndex = journeysStore.findIndex(j => j.id === journeyId);
  if (journeyIndex !== -1) {
    const journey = journeysStore[journeyIndex];
    const currentSpent = parseInt(journey.spent.replace(/[^0-9]/g, '') || '0', 10);
    const newSpent = currentSpent + amount;
    journeysStore[journeyIndex] = {
      ...journey,
      spent: `$${newSpent.toLocaleString('es-CO')}`
    };
  }

  saveToLocalStorage();
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
  initStorage();

  const nodes = nodesStore[journeyId] || [];
  const returnIndex = nodes.findIndex(n => n.id === 'return-node');

  const newNode: JourneyNode = {
    id: `ext-${Date.now()}`,
    type: 'delivery',
    label: `Servicio Ext: ${serviceData.destino}`,
    time: serviceData.fechaRecepcion 
      ? new Date(serviceData.fechaRecepcion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : 'Por definir',
    status: 'pending',
    isExtra: true,
    details: {
      client: serviceData.destinatario,
      sender: serviceData.remitente,
      receiver: serviceData.destinatario,
      address: serviceData.destino,
      description: serviceData.description,
      photosCount: serviceData.photosCount
    }
  };

  const updatedNodes = [...nodes];
  if (returnIndex !== -1) {
    updatedNodes.splice(returnIndex, 0, newNode);
  } else {
    updatedNodes.push(newNode);
  }
  nodesStore[journeyId] = updatedNodes;

  saveToLocalStorage();
}
