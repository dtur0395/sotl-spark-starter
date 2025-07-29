import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Target } from "lucide-react";

interface SoTLIntroScreenProps {
  onContinue: () => void;
}

export const SoTLIntroScreen = ({ onContinue }: SoTLIntroScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-unsw-light-blue to-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-unsw-yellow rounded-xl shadow-lg">
              <GraduationCap className="h-8 w-8 text-unsw-navy" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-unsw-navy">Start Your SoTL Journey</h1>
              <p className="text-lg text-unsw-gray">SoTL in Action – 5 Aug 2025</p>
            </div>
          </div>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Reflect on your teaching and learning context. This tool will guide you through a short activity 
            to help you identify a possible SoTL project idea.
          </p>
          <p className="text-lg text-unsw-gray mt-4">
            Your answers will generate a personalised summary to download or share.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-unsw-light-blue/50 hover:border-unsw-blue/70 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-unsw-light-blue rounded-lg w-fit mb-3">
                <Target className="h-6 w-6 text-unsw-navy" />
              </div>
              <CardTitle className="text-unsw-navy">🎯 Inquiry Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Define teaching and learning problems that matter to you and your students
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-unsw-light-blue/50 hover:border-unsw-blue/70 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-unsw-light-blue rounded-lg w-fit mb-3">
                <Users className="h-6 w-6 text-unsw-navy" />
              </div>
              <CardTitle className="text-unsw-navy">🤝 Collaborative</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Identify potential partners and build meaningful connections for your research
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-unsw-light-blue/50 hover:border-unsw-blue/70 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-unsw-light-blue rounded-lg w-fit mb-3">
                <BookOpen className="h-6 w-6 text-unsw-navy" />
              </div>
              <CardTitle className="text-unsw-navy">📣 Shareable</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Create actionable next steps and connect with UNSW SoTL resources
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={onContinue}
            variant="unsw"
            size="lg"
            className="text-lg px-12 py-6 h-auto"
          >
            Begin Your Reflection
          </Button>
          <p className="text-sm text-unsw-gray mt-4">
            Takes approximately 5-10 minutes to complete
          </p>
        </div>
      </div>
    </div>
  );
};