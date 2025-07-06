"use server";

import { analyzeSymptoms, AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { generateArticlePreview, GenerateArticlePreviewOutput } from "@/ai/flows/generate-article-preview";

export async function getSymptomAnalysis(
  symptoms: string
): Promise<{ data?: AnalyzeSymptomsOutput; error?: string }> {
  if (!symptoms) {
    return { error: "Symptoms cannot be empty." };
  }
  try {
    const result = await analyzeSymptoms({ symptoms });
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: "Failed to analyze symptoms. Please try again." };
  }
}

export async function getArticlePreview(
  articleContent: string
): Promise<{ data?: GenerateArticlePreviewOutput; error?: string }> {
  if (!articleContent) {
    return { error: "Article content cannot be empty." };
  }
  try {
    const result = await generateArticlePreview({ articleContent });
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate article preview. Please try again." };
  }
}
