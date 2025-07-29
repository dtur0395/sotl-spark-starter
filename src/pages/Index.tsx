import { useState } from "react";
import { SoTLIntroScreen } from "@/components/SoTLIntroScreen";
import { SoTLForm, SoTLFormData } from "@/components/SoTLForm";
import { SoTLSummary } from "@/components/SoTLSummary";

type AppState = "intro" | "form" | "summary";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("intro");
  const [formData, setFormData] = useState<SoTLFormData | null>(null);

  const handleFormSubmit = (data: SoTLFormData) => {
    setFormData(data);
    setCurrentState("summary");
  };

  const handleRestart = () => {
    setFormData(null);
    setCurrentState("intro");
  };

  switch (currentState) {
    case "intro":
      return <SoTLIntroScreen onContinue={() => setCurrentState("form")} />;
    case "form":
      return (
        <SoTLForm 
          onSubmit={handleFormSubmit}
          onBack={() => setCurrentState("intro")}
        />
      );
    case "summary":
      return formData ? (
        <SoTLSummary 
          data={formData}
          onRestart={handleRestart}
        />
      ) : null;
    default:
      return null;
  }
};

export default Index;
