import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AssessmentForm from "@/components/AssessmentForm";
import { Brain, Users, TrendingUp, Shield, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/Gemini_Generated_Image_drdol5drdol5drdo.png";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => setShowForm(false)}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Assessment</h1>
            <p className="text-muted-foreground">Please complete all sections for accurate counseling recommendations</p>
          </div>
          <AssessmentForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                AI-Powered Student
                <span className="block text-primary-glow">Counseling System</span>
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Advanced dropout prediction and personalized counseling recommendations 
                using artificial intelligence to support student success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={() => setShowForm(true)}
                  className="bg-white text-primary hover:bg-primary-glow hover:text-primary-foreground shadow-strong text-lg px-8 py-6"
                >
                  Start Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white text-primary hover:bg-primary-glow hover:text-primary-foreground shadow-strong text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Students learning with AI guidance" 
                className="rounded-lg shadow-strong w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How Our AI System Helps
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive assessment analyzes multiple factors to provide 
              personalized insights and recommendations for student success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms analyze student data to predict dropout risk.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-education-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Personalized Support</h3>
                <p className="text-muted-foreground">
                  Tailored counseling recommendations based on individual student profiles.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Success Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor progress and adjust strategies for improved academic outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-warning-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Early Intervention</h3>
                <p className="text-muted-foreground">
                  Identify at-risk students early to provide timely support and guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Preview Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Comprehensive Student Assessment
              </h2>
              <p className="text-xl text-muted-foreground">
                Our assessment covers all key factors that influence academic success
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">Academic Performance & Attendance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">Family Background & Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">Extracurricular Involvement</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">Behavioral Assessment</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">Previous Academic History</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">Socioeconomic Factors</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">Age & Grade Level Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">Risk Factor Identification</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                size="lg" 
                onClick={() => setShowForm(true)}
                className="bg-gradient-primary text-primary-foreground shadow-medium text-lg px-8 py-6"
              >
                Begin Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">AI-Powered Student Success</h3>
          <p className="text-primary-foreground/80 mb-6">
            Empowering educators and students with data-driven insights for better outcomes.
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowForm(true)}
            className="bg-primary-foreground text-primary hover:bg-primary-glow hover:text-primary-foreground"
          >
            Start Your Assessment Today
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;