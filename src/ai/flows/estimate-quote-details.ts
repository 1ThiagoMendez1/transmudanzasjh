'use server';
/**
 * @fileOverview An AI agent that estimates suitable truck types and tonnage for a given cargo.
 *
 * - estimateQuoteDetails - A function that handles the estimation process.
 * - EstimateQuoteDetailsInput - The input type for the estimateQuoteDetails function.
 * - EstimateQuoteDetailsOutput - The return type for the estimateQuoteDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateQuoteDetailsInputSchema = z.object({
  cargoDescription: z
    .string()
    .describe('A detailed description of the cargo, including dimensions, weight, and fragility.'),
  destination: z.string().describe('The destination of the cargo.'),
});
export type EstimateQuoteDetailsInput = z.infer<typeof EstimateQuoteDetailsInputSchema>;

const EstimateQuoteDetailsOutputSchema = z.object({
  suggestedTruckType: z.string().describe('The suggested type of truck suitable for the cargo (e.g., "Furgón", "Planchón", "Cisterna", "Contenedor", "Estacas").'),
  estimatedTonnage: z.number().describe('The estimated tonnage required for the cargo.'),
  reasoning: z.string().describe('A brief explanation for the suggested truck type and tonnage.'),
});
export type EstimateQuoteDetailsOutput = z.infer<typeof EstimateQuoteDetailsOutputSchema>;

export async function estimateQuoteDetails(
  input: EstimateQuoteDetailsInput
): Promise<EstimateQuoteDetailsOutput> {
  return estimateQuoteDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateQuoteDetailsPrompt',
  input: {schema: EstimateQuoteDetailsInputSchema},
  output: {schema: EstimateQuoteDetailsOutputSchema},
  prompt: `You are an expert logistics and transportation dispatcher in Colombia, skilled in cargo management and vehicle selection.

Based on the provided cargo description and destination, your task is to suggest the most suitable truck type and estimate the required tonnage. Provide a brief reasoning for your selection.

Cargo Description: {{{cargoDescription}}}
Destination: {{{destination}}}`,
});

const estimateQuoteDetailsFlow = ai.defineFlow(
  {
    name: 'estimateQuoteDetailsFlow',
    inputSchema: EstimateQuoteDetailsInputSchema,
    outputSchema: EstimateQuoteDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
