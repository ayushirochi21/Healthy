'use server';

/**
 * @fileOverview This flow generates an article preview with a relevant image.
 *
 * - generateArticlePreview - A function that takes article content and generates a preview with an AI-generated image.
 * - GenerateArticlePreviewInput - The input type for the generateArticlePreview function.
 * - GenerateArticlePreviewOutput - The return type for the generateArticlePreview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticlePreviewInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the article to generate a preview for.'),
});
export type GenerateArticlePreviewInput = z.infer<
  typeof GenerateArticlePreviewInputSchema
>;

const GenerateArticlePreviewOutputSchema = z.object({
  previewText: z.string().describe('A short preview of the article content.'),
  imageUrl: z
    .string()
    .describe(
      'A data URI containing a base64-encoded image relevant to the article content. The data URI must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type GenerateArticlePreviewOutput = z.infer<
  typeof GenerateArticlePreviewOutputSchema
>;

export async function generateArticlePreview(
  input: GenerateArticlePreviewInput
): Promise<GenerateArticlePreviewOutput> {
  return generateArticlePreviewFlow(input);
}

const previewPrompt = ai.definePrompt({
  name: 'previewPrompt',
  input: {schema: GenerateArticlePreviewInputSchema},
  output: {schema: GenerateArticlePreviewOutputSchema},
  prompt: `Given the following article content, generate a short preview text and an image that is relevant to the article.\n\nArticle Content: {{{articleContent}}}`,
});

const generateArticlePreviewFlow = ai.defineFlow(
  {
    name: 'generateArticlePreviewFlow',
    inputSchema: GenerateArticlePreviewInputSchema,
    outputSchema: GenerateArticlePreviewOutputSchema,
  },
  async input => {
    const {output} = await previewPrompt(input);
    if (!output) {
      throw new Error('No output from previewPrompt');
    }
    try {
      const {media} = await ai.generate({
        // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
        model: 'googleai/gemini-2.0-flash-preview-image-generation',

        prompt: [
          {text: `Generate an image that is relevant to this article: ${input.articleContent}`},
        ],

        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
        },
      });
      return {
        previewText: output.previewText,
        imageUrl: media.url,
      };
    } catch (e: any) {
      console.error('Image generation failed', e);
      return {
        previewText: output.previewText,
        imageUrl: '',
      };
    }
  }
);
