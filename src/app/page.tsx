import SymptomAnalyzer from "@/components/symptom-analyzer";
import { Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="bg-primary text-primary-foreground p-4 rounded-full mb-6 shadow-lg">
              <Stethoscope className="h-12 w-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              MediAdvice
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
              Describe your symptoms below, and our AI assistant will provide an analysis, including potential prevention methods, treatments, and consequences.
            </p>
             <p className="mt-2 text-sm text-muted-foreground max-w-2xl italic">
              This is not a substitute for professional medical advice.
            </p>
          </div>
          <SymptomAnalyzer />
        </div>
      </main>
      <footer className="w-full text-center p-6 bg-secondary">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MediAdvice. Created by @Ayushi Varshney.
        </p>
      </footer>
    </div>
  );
}
