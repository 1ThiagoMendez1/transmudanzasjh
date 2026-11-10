import { supabase } from './supabase';

export type QuoteStatus = 'Recibida' | 'En Análisis' | 'Cotizada' | 'Aceptada' | 'Rechazada' | 'Finalizada';

export interface QuoteMessage {
  id: string;
  text: string;
  sender: 'client' | 'admin';
  timestamp: string;
}

export interface QuoteDocument {
  id: string;
  url: string;
  name: string;
  timestamp: string;
}

export interface WebQuote {
  id: string;
  secretCode: string;
  status: QuoteStatus;
  createdAt: string;
  origin: string;
  destination: string;
  estimatedDate: string;
  description: string;
  photos: string[];
  clientName: string;
  clientDocument: string;
  clientPhone: string;
  adminNotes?: string;
  estimatedValue?: number;
  
  // New fields for manual quotes / portal
  messages?: QuoteMessage[];
  documents?: QuoteDocument[];
  isLocked?: boolean;
  leadSource?: string;
}

export function generateQuoteId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `TRANS-${randomNum}`;
}

export function generateSecretCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Map db record to TS object
function mapDbToWebQuote(data: any): WebQuote {
  return {
    id: data.id,
    secretCode: data.secret_code,
    status: data.status,
    createdAt: data.created_at,
    origin: data.origin,
    destination: data.destination,
    estimatedDate: data.estimated_date,
    description: data.description,
    photos: data.photos || [],
    clientName: data.client_name,
    clientDocument: data.client_document,
    clientPhone: data.client_phone,
    adminNotes: data.admin_notes,
    estimatedValue: data.estimated_value,
    messages: data.messages || [],
    documents: data.documents || [],
    isLocked: data.is_locked || false,
    leadSource: data.lead_source
  };
}

export async function submitWebQuote(data: Omit<WebQuote, 'id' | 'secretCode' | 'status' | 'createdAt' | 'messages' | 'documents' | 'isLocked'>): Promise<{ id: string, clientDocument: string }> {
  const id = generateQuoteId();
  const secretCode = generateSecretCode(); // Keep it for DB constraint if needed, but we don't return it for login

  
  const newQuote = {
    ...data,
    id,
    secretCode: secretCode,
    status: 'Recibida',
    created_at: new Date().toISOString(), // Supabase uses snake_case usually, but we map it
  };

  const dbRecord = {
    id: newQuote.id,
    secret_code: newQuote.secretCode,
    status: newQuote.status,
    origin: newQuote.origin,
    destination: newQuote.destination,
    estimated_date: newQuote.estimatedDate,
    description: newQuote.description,
    photos: newQuote.photos,
    client_name: newQuote.clientName,
    client_document: newQuote.clientDocument,
    client_phone: newQuote.clientPhone,
    lead_source: newQuote.leadSource || 'web'
  };

  const { error } = await supabase.from('web_quotes').insert([dbRecord]);

  if (error) {
    console.error('Error inserting quote:', error);
    throw new Error('No se pudo enviar la cotización');
  }

  return { id, clientDocument: newQuote.clientDocument };
}

export async function createManualQuote(data: { clientName: string; clientDocument: string; clientPhone: string; origin: string; destination: string; leadSource?: string }): Promise<{ id: string, clientDocument: string }> {
  const id = generateQuoteId();
  const secretCode = generateSecretCode();
  
  const dbRecord = {
    id,
    secret_code: secretCode,
    status: 'Recibida',
    origin: data.origin,
    destination: data.destination,
    client_name: data.clientName,
    client_document: data.clientDocument,
    client_phone: data.clientPhone,
    lead_source: data.leadSource || 'whatsapp',
    description: 'Cotización creada manualmente',
    estimated_date: '',
    photos: [],
    messages: [],
    documents: [],
    is_locked: false
  };

  const { error } = await supabase.from('web_quotes').insert([dbRecord]);

  if (error) {
    console.error('Error inserting manual quote:', error);
    throw new Error('No se pudo crear la cotización');
  }

  return { id, clientDocument: data.clientDocument };
}

export async function getQuoteByCredentials(id: string, clientDocument: string): Promise<WebQuote | null> {
  const { data, error } = await supabase
    .from('web_quotes')
    .select('*')
    .eq('id', id)
    .eq('client_document', clientDocument)
    .single();

  if (error || !data) return null;
  return mapDbToWebQuote(data);
}

export async function getQuoteById(id: string): Promise<WebQuote | null> {
  const { data, error } = await supabase
    .from('web_quotes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return mapDbToWebQuote(data);
}

export async function getAllWebQuotes(): Promise<WebQuote[]> {
  const { data, error } = await supabase
    .from('web_quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data.map(mapDbToWebQuote);
}

export async function updateQuoteStatus(id: string, newStatus: QuoteStatus, value?: number): Promise<void> {
  const updates: any = { status: newStatus };
  if (value !== undefined) {
    updates.estimated_value = value;
  }
  
  if (newStatus === 'Rechazada' || newStatus === 'Finalizada') {
    updates.is_locked = true;
  }

  const { error } = await supabase
    .from('web_quotes')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating quote status:', error);
    throw new Error('No se pudo actualizar el estado de la cotización');
  }
}

export async function addQuoteMessage(id: string, currentMessages: QuoteMessage[], newMessage: Omit<QuoteMessage, 'id' | 'timestamp'>): Promise<void> {
  const message: QuoteMessage = {
    ...newMessage,
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString()
  };
  
  const updatedMessages = [...currentMessages, message];

  const { error } = await supabase
    .from('web_quotes')
    .update({ messages: updatedMessages })
    .eq('id', id);

  if (error) {
    console.error('Error adding message:', error);
    throw new Error('No se pudo enviar el mensaje');
  }
}

export async function addQuoteDocument(id: string, currentDocuments: QuoteDocument[], url: string, name: string): Promise<void> {
  const doc: QuoteDocument = {
    id: Math.random().toString(36).substring(7),
    url,
    name,
    timestamp: new Date().toISOString()
  };
  
  const updatedDocs = [...currentDocuments, doc];

  const { error } = await supabase
    .from('web_quotes')
    .update({ documents: updatedDocs })
    .eq('id', id);

  if (error) {
    console.error('Error adding document:', error);
    throw new Error('No se pudo guardar el documento');
  }
}

export async function updateQuotePhotos(id: string, photos: string[]): Promise<void> {
  const { error } = await supabase
    .from('web_quotes')
    .update({ photos })
    .eq('id', id);

  if (error) {
    console.error('Error updating photos:', error);
    throw new Error('No se pudieron actualizar las fotos');
  }
}

export async function lockQuote(id: string): Promise<void> {
  const { error } = await supabase
    .from('web_quotes')
    .update({ is_locked: true })
    .eq('id', id);

  if (error) {
    console.error('Error locking quote:', error);
    throw new Error('No se pudo cerrar la cotización');
  }
}
