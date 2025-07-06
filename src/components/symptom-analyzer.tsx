"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { getSymptomAnalysis } from "@/app/actions";
import { type AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import AnalysisDisplay from "./analysis-display";
import { mockArticles } from "@/lib/data";
import ArticleCard from "./article-card";
import LocationButtons from "./location-buttons";
import { Skeleton } from "./ui/skeleton";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SymptomAnalyzer() {
  const [analysis, setAnalysis] = useState<AnalyzeSymptomsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setAnalysis(null);
    const result = await getSymptomAnalysis(data.symptoms);
    setIsLoading(false);

    if (result.error || !result.data) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: result.error || "An unknown error occurred.",
      });
    } else {
      setAnalysis(result.data);
    }
  };

  return (
    <div className="space-y-12">
      <Card className="shadow-2xl border-2 border-primary/10 overflow-hidden">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I have a persistent headache, a runny nose, and I've been sneezing a lot..."
                        className="resize-none min-h-[120px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                {isLoading ? 'Analyzing...' : <><Sparkles className="mr-2 h-5 w-5" /> Analyze Symptoms</>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="space-y-12">
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3 mx-auto" />
                 <div className="grid gap-6 md:grid-cols-3">
                    <Skeleton className="h-40 rounded-lg" />
                    <Skeleton className="h-40 rounded-lg" />
                    <Skeleton className="h-40 rounded-lg" />
                </div>
                <Skeleton className="h-48 rounded-lg" />
            </div>
             <div className="space-y-4">
                <Skeleton className="h-8 w-1/3 mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-64 rounded-lg" />
                    <Skeleton className="h-64 rounded-lg" />
                    <Skeleton className="h-64 rounded-lg" />
                </div>
            </div>
             <div className="space-y-4">
                 <Skeleton className="h-8 w-1/3 mx-auto" />
                 <Skeleton className="h-24 rounded-lg" />
            </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-12 animate-in fade-in-50 duration-500">
          <AnalysisDisplay analysis={analysis.analysis} />
          
          <div className="space-y-6">
             <h2 className="text-3xl font-bold text-foreground text-center">Related Articles</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockArticles.map((article) => (
                    <ArticleCard key={article.title} article={article} />
                ))}
             </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">Find Medical Help Nearby</h2>
            <LocationButtons />
          </div>
        </div>
      )}
    </div>
  );
}
