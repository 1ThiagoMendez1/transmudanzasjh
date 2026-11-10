import { supabase } from './supabase';

export interface Expense {
  id?: string;
  journey_id?: string;
  amount: number;
  description: string;
  category: string;
  expense_date?: string;
}

export async function getExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase.from('expenses').select('*').order('expense_date', { ascending: false });
  if (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
  return data;
}

export async function createExpense(expense: Expense): Promise<void> {
  const { error } = await supabase.from('expenses').insert([expense]);
  if (error) {
    console.error('Error creating expense:', error);
    throw new Error('No se pudo registrar el gasto');
  }
}
