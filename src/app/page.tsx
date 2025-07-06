import SymptomAnalyzer from "@/components/symptom-analyzer";
import { Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-6">
           <div className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block text-lg">MediAdvice</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight text-glow">
              Your Personal Health Companion
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
      <footer className="w-full text-center p-6 bg-secondary/50">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MediAdvice. Created by @Ayushi Varshney.
        </p>
      </footer>
    </div>
  );
}
