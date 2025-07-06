"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getArticlePreview } from "@/app/actions";
import { type GenerateArticlePreviewOutput } from "@/ai/flows/generate-article-preview";

interface ArticleCardProps {
  article: {
    title: string;
    content: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [preview, setPreview] = useState<GenerateArticlePreviewOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreview = async () => {
      setIsLoading(true);
      const result = await getArticlePreview(article.content);
      if (result.data) {
        setPreview(result.data);
      }
      setIsLoading(false);
    };
    fetchPreview();
  }, [article.content]);

  if (isLoading) {
    return (
      <Card className="flex flex-col h-full glassmorphism">
        <CardHeader>
           <Skeleton className="h-6 w-3/4 bg-white/20" />
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <Skeleton className="h-32 w-full rounded-md bg-white/20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-white/20" />
            <Skeleton className="h-4 w-full bg-white/20" />
            <Skeleton className="h-4 w-5/6 bg-white/20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300 glassmorphism">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        {preview?.imageUrl ? (
          <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-muted/50">
            <Image
              src={preview.imageUrl}
              alt={`AI generated image for ${article.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full h-40 mb-4 rounded-md bg-muted/50 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No image available</p>
          </div>
        )}
        <CardDescription className="flex-grow line-clamp-4">{preview?.previewText}</CardDescription>
      </CardContent>
    </Card>
  );
}
