import SymptomAnalyzer from "@/components/symptom-analyzer";
import { Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-primary/20 text-primary p-3 rounded-full mb-4">
            <Stethoscope className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
            MediAdvice
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Describe your symptoms below, and our AI assistant will provide an analysis, including potential prevention methods, treatments, consequences, and related articles. This is not a substitute for professional medical advice.
          </p>
        </div>
        <SymptomAnalyzer />
      </div>
    </main>
  );
}
