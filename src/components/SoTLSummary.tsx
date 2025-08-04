import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Share2, RotateCcw, ExternalLink, Calendar, Users, Database, Target, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { SoTLFormData } from "./SoTLForm";

interface SoTLSummaryProps {
  data: SoTLFormData;
  onRestart: () => void;
}

const feltenPrincipleLabels: Record<string, string> = {
  inquiry: "🎯 Inquiry focused on learning",
  context: "🌐 Grounded in context",
  methodological: "🧪 Methodologically sound", 
  partnership: "🤝 Partnered with students",
  public: "📣 Appropriately public"
};

export const SoTLSummary = ({ data, onRestart }: SoTLSummaryProps) => {
  const handleDownload = () => {
    // For now, just show a placeholder - in a real app this would generate a PDF
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My SoTL Starting Point',
        text: `My SoTL focus: ${data.problem.substring(0, 100)}...`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-unsw-light-blue to-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-unsw-yellow rounded-xl shadow-lg">
              <CheckCircle2 className="h-8 w-8 text-unsw-navy" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-unsw-navy">Your SoTL Snapshot</h1>
              <p className="text-lg text-unsw-gray">SoTL in Action – 5 Aug 2025</p>
            </div>
          </div>
          <p className="text-lg text-foreground/80">
            Here's your personalised starting point for Scholarship of Teaching and Learning
          </p>
        </div>

        {/* Summary Card */}
        <Card className="border-2 border-unsw-yellow/50 mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-unsw-yellow/10 to-unsw-light-blue/20">
            <CardTitle className="text-2xl text-unsw-navy flex items-center gap-2">
              <Target className="h-6 w-6" />
              Your Teaching & Learning Focus
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {/* Problem Statement */}
            <div>
              <h3 className="text-lg font-semibold text-unsw-navy mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-unsw-yellow rounded-full"></div>
                The Challenge You Care About
              </h3>
              <p className="text-foreground bg-muted/50 p-4 rounded-lg italic border-l-4 border-unsw-yellow">
                "{data.problem}"
              </p>
            </div>

            <Separator />

            {/* Collaboration */}
            <div>
              <h3 className="text-lg font-semibold text-unsw-navy mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Potential Collaboration
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.collaborators.map((collaborator, index) => (
                  <Badge key={index} variant="secondary" className="text-base px-4 py-2">
                    {collaborator}
                  </Badge>
                ))}
                {data.customCollaborator && (
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    {data.customCollaborator}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Data Sources */}
            <div>
              <h3 className="text-lg font-semibold text-unsw-navy mb-3 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Available Data Sources
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.dataSources.map((source, index) => (
                  <Badge key={index} variant="outline" className="border-unsw-blue text-unsw-navy">
                    {source}
                  </Badge>
                ))}
                {data.customDataSource && (
                  <Badge variant="outline" className="border-unsw-blue text-unsw-navy">
                    {data.customDataSource}
                  </Badge>
                )}
              </div>
            </div>

            {/* Felten's Principles */}
            {data.feltenPrinciples.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold text-unsw-navy mb-3">
                    Felten's Principles Already in Play
                  </h3>
                  <div className="space-y-2">
                    {data.feltenPrinciples.map(principle => (
                      <div key={principle} className="flex items-center gap-2 text-sm bg-unsw-light-blue/30 p-2 rounded">
                        <CheckCircle2 className="h-4 w-4 text-unsw-navy" />
                        {feltenPrincipleLabels[principle]}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Next Steps */}
            {data.nextStep && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold text-unsw-navy mb-3">
                    Your Next Small Step
                  </h3>
                  <p className="text-foreground bg-unsw-yellow/10 p-4 rounded-lg border-l-4 border-unsw-yellow">
                    {data.nextStep}
                  </p>
                </div>
              </>
            )}

            {/* Timeline */}
            {data.timeline && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold text-unsw-navy mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Target Timeline
                  </h3>
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    {format(data.timeline, "PPPP")}
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Resources Card */}
        <Card className="border-2 border-unsw-blue/50 mb-8">
          <CardHeader>
            <CardTitle className="text-unsw-navy">Next Steps & Resources</CardTitle>
            <CardDescription>
              Connect with UNSW SoTL community and resources to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://www.unsw.edu.au/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit SoTL@UNSW Resources
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownload} variant="unsw-yellow" size="lg" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Summary
          </Button>
          <Button onClick={handleShare} variant="outline" size="lg" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
          <Button onClick={onRestart} variant="ghost" size="lg" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Start Over
          </Button>
        </div>

        <div className="text-center mt-8 text-sm text-unsw-gray">
          <p>Generated on {format(new Date(), "PPPP")}</p>
          <p className="mt-2">This summary reflects your current thinking and can evolve as you develop your SoTL practice.</p>
        </div>
      </div>
    </div>
  );
};
