'use server';
/**
 * @fileOverview A Genkit flow for predicting expenses for new logistics journeys.
 *
 * - predictJourneyExpenses - A function that handles the expense prediction process.
 * - PredictJourneyExpensesInput - The input type for the predictJourneyExpenses function.
 * - PredictJourneyExpensesOutput - The return type for the predictJourneyExpenses function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PredictJourneyExpensesInputSchema = z.object({
  journeyType: z.string().describe('The type of the new journey, e.g., "mudanza local", "transporte interurbano".'),
  routeDescription: z.string().describe('A description of the route for the new journey, e.g., "Bogotá - Cali", "recorrido urbano Chapinero".'),
  distanceKm: z.number().positive().describe('Estimated distance of the journey in kilometers.'),
  expectedDurationDays: z.number().int().positive().describe('Estimated duration of the journey in days.'),
  cargoWeightKg: z.number().positive().describe('Estimated cargo weight in kilograms.'),
  vehicleType: z.string().describe('Type of vehicle to be used, e.g., "Camión pequeño", "Furgoneta grande".'),
  historicalContext: z.string().optional().describe('Summarized historical financial data from similar completed trips to inform predictions.').default('No specific historical data provided.'),
});
export type PredictJourneyExpensesInput = z.infer<typeof PredictJourneyExpensesInputSchema>;

const PredictJourneyExpensesOutputSchema = z.object({
  totalPredictedExpenses: z.number().describe('The total predicted expenses for the journey.'),
  expenseBreakdown: z.array(z.object({
    category: z.string().describe('Category of the expense (e.g., "Combustible", "Peajes", "Alimentación", "Mantenimiento", "Extras", "Viáticos").'),
    amount: z.number().describe('Predicted amount for this expense category.'),
  })).describe('Detailed breakdown of predicted expenses by category.'),
  confidenceLevel: z.enum(['High', 'Medium', 'Low']).describe('Confidence level of the expense prediction.'),
  notes: z.string().optional().describe('Any additional notes, assumptions, or reasoning behind the prediction.'),
});
export type PredictJourneyExpensesOutput = z.infer<typeof PredictJourneyExpensesOutputSchema>;

export async function predictJourneyExpenses(input: PredictJourneyExpensesInput): Promise<PredictJourneyExpensesOutput> {
  return predictJourneyExpensesFlow(input);
}

const predictJourneyExpensesPrompt = ai.definePrompt({
  name: 'predictJourneyExpensesPrompt',
  input: { schema: PredictJourneyExpensesInputSchema },
  output: { schema: PredictJourneyExpensesOutputSchema },
  prompt: `You are an expert financial analyst for a logistics and moving company. Your task is to predict the expenses for a new journey based on its characteristics and historical data.

Consider the following details for the new journey:
Journey Type: {{{journeyType}}}
Route Description: {{{routeDescription}}}
Estimated Distance: {{{distanceKm}}} km
Expected Duration: {{{expectedDurationDays}}} days
Estimated Cargo Weight: {{{cargoWeightKg}}} kg
Vehicle Type: {{{vehicleType}}}

Historical context from similar completed trips:
{{{historicalContext}}}

Based on this information, provide a detailed prediction of the journey's expenses. The expense categories should include (but are not limited to) Combustible, Peajes, Alimentación, Mantenimiento, Extras, Viáticos. Provide a total predicted amount, a breakdown by category, a confidence level for your prediction, and any relevant notes or assumptions. The currency for expenses should be generic numbers, do not use currency symbols.`,
});

const predictJourneyExpensesFlow = ai.defineFlow(
  {
    name: 'predictJourneyExpensesFlow',
    inputSchema: PredictJourneyExpensesInputSchema,
    outputSchema: PredictJourneyExpensesOutputSchema,
  },
  async (input) => {
    const { output } = await predictJourneyExpensesPrompt(input);
    return output!;
  }
);
