export type QuoteStatus = 'Recibida' | 'En Análisis' | 'Cotizada' | 'Aceptada' | 'Rechazada';

export interface WebQuote {
  id: string;
  secretCode: string;
  status: QuoteStatus;
  createdAt: string;
  origin: string;
  destination: string;
  estimatedDate: string;
  description: string;
  photos: string[]; // mock URLs or base64
  clientName: string;
  clientPhone: string;
  adminNotes?: string;
  estimatedValue?: number;
}

export function generateQuoteId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `MIVRA-${randomNum}`;
}

export function generateSecretCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// In-memory mock storage (for development/UI prototyping)
// In a real scenario, this would interact with Firebase
let mockQuotesStore: WebQuote[] = [];

// Initialize with some fake data if empty
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('mivra_web_quotes');
  if (stored) {
    try {
      mockQuotesStore = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored quotes");
    }
  } else {
    // Add one fake received quote for the admin panel
    const mockData: WebQuote = {
      id: 'MIVRA-7777',
      secretCode: 'X9F2A1',
      status: 'Recibida',
      createdAt: new Date().toISOString(),
      origin: 'Bogotá (Chapinero)',
      destination: 'Medellín (El Poblado)',
      estimatedDate: '2026-05-10',
      description: 'Mudanza de apartamento de 2 habitaciones. Incluye 1 nevera grande, 2 camas dobles, 1 sofá, 1 comedor de 4 puestos y aprox 30 cajas.',
      photos: [],
      clientName: 'Carlos Ramírez',
      clientPhone: '3001234567'
    };
    mockQuotesStore = [mockData];
    localStorage.setItem('mivra_web_quotes', JSON.stringify(mockQuotesStore));
  }
}

export async function submitWebQuote(data: Omit<WebQuote, 'id' | 'secretCode' | 'status' | 'createdAt'>): Promise<{ id: string, secretCode: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const id = generateQuoteId();
  const secretCode = generateSecretCode();
  
  const newQuote: WebQuote = {
    ...data,
    id,
    secretCode,
    status: 'Recibida',
    createdAt: new Date().toISOString()
  };

  mockQuotesStore = [newQuote, ...mockQuotesStore];
  if (typeof window !== 'undefined') {
    localStorage.setItem('mivra_web_quotes', JSON.stringify(mockQuotesStore));
  }

  return { id, secretCode };
}

export async function getQuoteByCredentials(id: string, secretCode: string): Promise<WebQuote | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const quote = mockQuotesStore.find(q => q.id === id && q.secretCode === secretCode);
  return quote || null;
}

export async function getAllWebQuotes(): Promise<WebQuote[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockQuotesStore;
}

export async function updateQuoteStatus(id: string, newStatus: QuoteStatus, value?: number): Promise<void> {
  const index = mockQuotesStore.findIndex(q => q.id === id);
  if (index !== -1) {
    mockQuotesStore[index].status = newStatus;
    if (value !== undefined) mockQuotesStore[index].estimatedValue = value;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('mivra_web_quotes', JSON.stringify(mockQuotesStore));
    }
  }
}
