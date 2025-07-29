import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalendarIcon, HelpCircle, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface SoTLFormData {
  problem: string;
  collaborator: string;
  customCollaborator?: string;
  dataSources: string[];
  feltenPrinciples: string[];
  nextStep: string;
  timeline?: Date;
}

interface SoTLFormProps {
  onSubmit: (data: SoTLFormData) => void;
  onBack: () => void;
}

const collaboratorOptions = [
  "Academic staff",
  "Educational developer", 
  "Librarian",
  "Learning designer",
  "Educational technologist",
  "Students as partners",
  "Other"
];

const dataSourceOptions = [
  "Student feedback",
  "LMS data",
  "Peer review",
  "Assessment artefacts",
  "Focus groups",
  "Institutional reports",
  "Other"
];

const feltenPrinciples = [
  {
    id: "inquiry",
    label: "🎯 Inquiry focused on learning",
    description: "Research questions emerge from real teaching and learning challenges"
  },
  {
    id: "context",
    label: "🌐 Grounded in context", 
    description: "Research is situated within specific institutional and disciplinary contexts"
  },
  {
    id: "methodological",
    label: "🧪 Methodologically sound",
    description: "Appropriate research methods are used to investigate the questions"
  },
  {
    id: "partnership",
    label: "🤝 Partnered with students",
    description: "Students are involved as collaborators in the research process"
  },
  {
    id: "public",
    label: "📣 Appropriately public",
    description: "Findings are shared with relevant communities for peer review and application"
  }
];

export const SoTLForm = ({ onSubmit, onBack }: SoTLFormProps) => {
  const [formData, setFormData] = useState<SoTLFormData>({
    problem: "",
    collaborator: "",
    dataSources: [],
    feltenPrinciples: [],
    nextStep: "",
  });

  const [showCustomCollaborator, setShowCustomCollaborator] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDataSourceChange = (source: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dataSources: checked 
        ? [...prev.dataSources, source]
        : prev.dataSources.filter(s => s !== source)
    }));
  };

  const handleFeltenPrincipleChange = (principle: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      feltenPrinciples: checked
        ? [...prev.feltenPrinciples, principle]
        : prev.feltenPrinciples.filter(p => p !== principle)
    }));
  };

  const isFormValid = formData.problem.trim() && formData.collaborator && formData.dataSources.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-unsw-light-blue to-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-unsw-navy">Reflective Prompts</h1>
            <p className="text-unsw-gray">Share your thoughts on your teaching and learning context</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Question 1: Problem */}
          <Card className="border-2 border-unsw-light-blue/50">
            <CardHeader>
              <CardTitle className="text-unsw-navy">What's a problem you care about in teaching or learning?</CardTitle>
              <CardDescription>
                Think about challenges you've noticed in your teaching practice or student learning experiences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g. Students disengage in large lectures"
                value={formData.problem}
                onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
                className="min-h-[120px]"
                required
              />
            </CardContent>
          </Card>

          {/* Question 2: Collaboration */}
          <Card className="border-2 border-unsw-light-blue/50">
            <CardHeader>
              <CardTitle className="text-unsw-navy">Who might you collaborate with on this?</CardTitle>
              <CardDescription>
                SoTL is often most effective as a collaborative endeavor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select 
                value={formData.collaborator} 
                onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, collaborator: value }));
                  setShowCustomCollaborator(value === "Other");
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a potential collaborator" />
                </SelectTrigger>
                <SelectContent>
                  {collaboratorOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {showCustomCollaborator && (
                <Input
                  placeholder="Please specify..."
                  value={formData.customCollaborator || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, customCollaborator: e.target.value }))}
                />
              )}
            </CardContent>
          </Card>

          {/* Question 3: Data Sources */}
          <Card className="border-2 border-unsw-light-blue/50">
            <CardHeader>
              <CardTitle className="text-unsw-navy">What existing data source might you draw on?</CardTitle>
              <CardDescription>
                Select all that apply. These could provide evidence for your inquiry.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {dataSourceOptions.map(source => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox
                      id={source}
                      checked={formData.dataSources.includes(source)}
                      onCheckedChange={(checked) => handleDataSourceChange(source, checked as boolean)}
                    />
                    <Label htmlFor={source} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {source}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question 4: Felten's Principles */}
          <Card className="border-2 border-unsw-light-blue/50">
            <CardHeader>
              <CardTitle className="text-unsw-navy">Which of Felten's five principles do you already see in play?</CardTitle>
              <CardDescription>
                Select any that resonate with your current thinking. Optional, but helpful for reflection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="space-y-4">
                  {feltenPrinciples.map(principle => (
                    <div key={principle.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={principle.id}
                        checked={formData.feltenPrinciples.includes(principle.id)}
                        onCheckedChange={(checked) => handleFeltenPrincipleChange(principle.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex items-start gap-2 flex-1">
                        <Label htmlFor={principle.id} className="text-sm font-medium leading-relaxed">
                          {principle.label}
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-unsw-gray cursor-help mt-0.5" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{principle.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Question 5: Next Step */}
          <Card className="border-2 border-unsw-light-blue/50">
            <CardHeader>
              <CardTitle className="text-unsw-navy">What's your next small step?</CardTitle>
              <CardDescription>
                Think of one concrete action you could take to move forward.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g. Set up a meeting with an educational designer"
                value={formData.nextStep}
                onChange={(e) => setFormData(prev => ({ ...prev, nextStep: e.target.value }))}
              />
            </CardContent>
          </Card>

          {/* Question 6: Timeline */}
          <Card className="border-2 border-unsw-light-blue/50">
            <CardHeader>
              <CardTitle className="text-unsw-navy">When do you hope to take this step?</CardTitle>
              <CardDescription>
                Setting a timeline can help with accountability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.timeline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.timeline ? format(formData.timeline, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.timeline}
                    onSelect={(date) => setFormData(prev => ({ ...prev, timeline: date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <Button 
              type="submit" 
              variant="unsw-yellow"
              size="lg"
              className="text-lg px-12 py-6 h-auto"
              disabled={!isFormValid}
            >
              Generate My SoTL Summary
            </Button>
            <p className="text-sm text-unsw-gray mt-4">
              All fields marked as required must be completed
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};