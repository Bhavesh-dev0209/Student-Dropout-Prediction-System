import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Calendar, 
  GraduationCap, 
  DollarSign, 
  Users, 
  AlertTriangle,
  Activity,
  Brain
} from "lucide-react";

interface FormData {
  attendance: string;
  age: string;
  marks: string;
  parentsEducation: string;
  parentsSalary: string;
  previousFailures: string;
  extracurriculars: string[];
  behaviorIssues: string;
}
const AssessmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState<FormData>({
    attendance: "",
    age: "",
    marks: "",
    parentsEducation: "",
    parentsSalary: "",
    previousFailures: "",
    extracurriculars: [],
    behaviorIssues: ""
  });

  // ✅ Add validateStep here
  const validateStep = () => {
    if (currentStep === 1) {
      return (
        formData.age.trim() !== "" &&
        formData.attendance.trim() !== "" &&
        formData.marks.trim() !== ""
      );
    }
    if (currentStep === 2) {
      return (
        formData.parentsEducation.trim() !== "" &&
        formData.parentsSalary.trim() !== "" &&
        formData.previousFailures.trim() !== ""
      );
    }
    if (currentStep === 3) {
      return formData.extracurriculars.length > 0;
    }
    if (currentStep === 4) {
      return formData.behaviorIssues.trim() !== "";
    }
    return true;
  };

  // ✅ Modify nextStep to use validateStep
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // ✅ Map parent education level to a numeric value
const mapEducationToNumber = (value: string): number => {
  switch (value) {
    case "no-formal": return 0;
    case "primary": return 1;
    case "secondary": return 2;
    case "high-school": return 3;
    case "diploma": return 4;
    case "bachelor": return 5;
    case "master": return 6;
    case "phd": return 7;
    default: return 0;
  }
};

// ✅ Map family monthly income range to a numeric value
const mapSalaryToNumber = (value: string): number => {
  switch (value) {
    case "below-10k": return 0;
    case "10k-25k": return 1;
    case "25k-50k": return 2;
    case "50k-75k": return 3;
    case "75k-100k": return 4;
    case "above-100k": return 5;
    default: return 0;
  }
};


  const handleSubmit = async () => {
  // Convert form data to match backend expectations
 const payload = {
  age: Number(formData.age),
  attendance_percent: Number(formData.attendance),
  avg_marks: Number(formData.marks),
  prev_failures: mapPrevFailures(formData.previousFailures),
  parents_education: mapEducationToNumber(formData.parentsEducation),
  family_income: mapSalaryToNumber(formData.parentsSalary),
  extracurricular: formData.extracurriculars.length,
  behavior_issues: mapBehaviorToNumber(formData.behaviorIssues),
};
  console.log("Submitting data:", payload);

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch prediction");
    }

    const result = await response.json();
    navigate("/report", { state: { result } });
  } catch (error) {
    console.error("Error submitting data:", error);
    toast({
      title: "Error",
      description: "Something went wrong while submitting your data. Please try again.",
      variant: "destructive",
    });
  }
};
const mapPrevFailures = (value: string) => {
  switch (value) {
    case "none": return 0;
    case "one": return 1;
    case "two": return 2;
    case "multiple": return 3;
    default: return 0;
  }
};

const mapBehaviorToNumber = (value: string) => {
  switch (value) {
    case "excellent": return 0;
    case "good": return 1;
    case "average": return 2;
    case "concerning": return 3;
    case "severe": return 4;
    default: return 0;
  }
};



  const handleExtracurricularChange = (activity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      extracurriculars: checked 
        ? [...prev.extracurriculars, activity]
        : prev.extracurriculars.filter(item => item !== activity)
    }));
  };

// On submit, call handleSubmit(formInputs) 
// On submit, call handleSubmit(formInputs) 


  // Removed duplicate nextStep function
  
  // (Removed duplicate prevStep function)

  const extracurricularOptions = [
    "Sports", "Music", "Drama/Theater", "Art", "Debate", "Science Club", 
    "Student Government", "Volunteer Work", "Programming/Tech", "Language Clubs"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card className="shadow-medium">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendance" className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Attendance Percentage
                </Label>
                <Input
                  id="attendance"
                  type="number"
                  placeholder="e.g., 85"
                  min="0"
                  max="100"
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks" className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Academic Marks/Grade (%)
              </Label>
              <Input
                id="marks"
                type="number"
                placeholder="Enter your overall percentage"
                min="0"
                max="100"
                value={formData.marks}
                onChange={(e) => setFormData({...formData, marks: e.target.value})}
                className="h-11"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Family Background */}
      {currentStep === 2 && (
        <Card className="shadow-medium">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Family Background
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Parent's Education Level</Label>
              <Select value={formData.parentsEducation} onValueChange={(value) => setFormData({...formData, parentsEducation: value})}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-formal">No Formal Education</SelectItem>
                  <SelectItem value="primary">Primary School</SelectItem>
                  <SelectItem value="secondary">Secondary School</SelectItem>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="diploma">Diploma/Certificate</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD/Doctorate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Family Monthly Income (₹)
              </Label>
              <Select value={formData.parentsSalary} onValueChange={(value) => setFormData({...formData, parentsSalary: value})}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below-10k">Below ₹10,000</SelectItem>
                  <SelectItem value="10k-25k">₹10,000 - ₹25,000</SelectItem>
                  <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-75k">₹50,000 - ₹75,000</SelectItem>
                  <SelectItem value="75k-100k">₹75,000 - ₹100,000</SelectItem>
                  <SelectItem value="above-100k">Above ₹100,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Previous Academic Failures
              </Label>
              <RadioGroup 
                value={formData.previousFailures} 
                onValueChange={(value) => setFormData({...formData, previousFailures: value})}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one" id="one" />
                  <Label htmlFor="one">1 Subject/Year</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="two" id="two" />
                  <Label htmlFor="two">2 Subjects/Years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multiple" id="multiple" />
                  <Label htmlFor="multiple">3+ Subjects/Years</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Activities & Interests */}
      {currentStep === 3 && (
        <Card className="shadow-medium">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Extracurricular Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Select all activities you participate in:</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {extracurricularOptions.map((activity) => (
                  <div key={activity} className="flex items-center space-x-2">
                    <Checkbox
                      id={activity}
                      checked={formData.extracurriculars.includes(activity)}
                      onCheckedChange={(checked) => handleExtracurricularChange(activity, checked as boolean)}
                    />
                    <Label htmlFor={activity} className="text-sm">{activity}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Behavioral Assessment */}
      {currentStep === 4 && (
        <Card className="shadow-medium">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Behavioral Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-medium">How would you rate your behavior in school?</Label>
              <RadioGroup 
                value={formData.behaviorIssues} 
                onValueChange={(value) => setFormData({...formData, behaviorIssues: value})}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="excellent" />
                  <Label htmlFor="excellent">Excellent - No behavioral issues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good" />
                  <Label htmlFor="good">Good - Minor occasional issues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="average" />
                  <Label htmlFor="average">Average - Some behavioral concerns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="concerning" id="concerning" />
                  <Label htmlFor="concerning">Concerning - Frequent behavioral issues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="severe" id="severe" />
                  <Label htmlFor="severe">Severe - Major behavioral problems</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={currentStep === 1}
          className="px-6"
        >
          Previous
        </Button>
        
        {currentStep < totalSteps ? (
          <Button onClick={nextStep} className="px-6 bg-gradient-primary">
            Next Step
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="px-6 bg-gradient-primary">
            Submit Assessment
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;