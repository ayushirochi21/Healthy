"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { HeartPulse, ShieldCheck, AlertTriangle, ListChecks } from "lucide-react";

interface AnalysisDisplayProps {
  analysis: AnalyzeSymptomsOutput["analysis"];
}

const SectionCard = ({ title, icon, content }: { title: string; icon: React.ReactNode; content: string }) => (
    <Card className="h-full bg-card shadow-md">
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                    {icon}
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">{content}</p>
        </CardContent>
    </Card>
);

export default function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  return (
    <div className="space-y-8">
       <h2 className="text-3xl font-bold text-foreground text-center">Symptom Analysis</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <SectionCard title="Prevention" icon={<ShieldCheck className="h-6 w-6 text-primary" />} content={analysis.prevention} />
        <SectionCard title="Treatments" icon={<HeartPulse className="h-6 w-6 text-primary" />} content={analysis.treatments} />
        <SectionCard title="Consequences" icon={<AlertTriangle className="h-6 w-6 text-primary" />} content={analysis.consequences} />
      </div>

       <Card className="shadow-md">
            <CardHeader>
                <div className="flex items-center gap-4">
                     <div className="bg-primary/10 p-3 rounded-lg">
                        <ListChecks className="h-6 w-6 text-primary" />
                     </div>
                    <CardTitle className="text-lg font-semibold text-foreground">Relevant Article Summaries</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-10">
                    {analysis.articlesSummary.map((summary, index) => (
                        <li key={index} className="pl-2">{summary}</li>
                    ))}
                </ul>
            </CardContent>
       </Card>
    </div>
  );
}
