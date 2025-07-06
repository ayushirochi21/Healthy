"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { HeartPulse, ShieldCheck, AlertTriangle, ListChecks } from "lucide-react";

interface AnalysisDisplayProps {
  analysis: AnalyzeSymptomsOutput["analysis"];
}

const SectionCard = ({ title, icon, content }: { title: string; icon: React.ReactNode; content: string }) => (
    <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">{content}</p>
        </CardContent>
    </Card>
);

export default function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  return (
    <div className="space-y-6">
       <h2 className="text-3xl font-bold text-primary-foreground text-center">Symptom Analysis</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <SectionCard title="Prevention" icon={<ShieldCheck className="h-5 w-5 text-muted-foreground" />} content={analysis.prevention} />
        <SectionCard title="Treatments" icon={<HeartPulse className="h-5 w-5 text-muted-foreground" />} content={analysis.treatments} />
        <SectionCard title="Consequences" icon={<AlertTriangle className="h-5 w-5 text-muted-foreground" />} content={analysis.consequences} />
      </div>

       <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Relevant Article Summaries</CardTitle>
                <ListChecks className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    {analysis.articlesSummary.map((summary, index) => (
                        <li key={index}>{summary}</li>
                    ))}
                </ul>
            </CardContent>
       </Card>
    </div>
  );
}
