import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  BookOpen,
  Activity,
  ArrowLeft,
  RefreshCw
} from "lucide-react";


const ReportCard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const result = state?.result;

  // ✅ Handle direct page refresh or missing state
  if (!result) {
    return (
      <div className="max-w-md mx-auto p-6 text-center mt-20">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-4">No Report Data</h2>
            <p className="text-gray-600 mb-6">
              It seems you navigated here directly. Please complete the assessment first.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500"
            >
              Go Back to Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ✅ Extract data from corrected backend response
  const riskLevel = result.risk; // "High" or "Low"
  const confidence = result.confidence || 75; // Percentage
  const recommendations = result.recommendations || [];
  const analysis = result.analysis || {};
  const studentData = result.student || {};

  // ✅ Determine risk status and styling
  const isHighRisk = riskLevel === "High";
  const riskColor = isHighRisk ? "text-red-600" : "text-green-600";
  const riskBgColor = isHighRisk ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200";
  const riskIcon = isHighRisk ? AlertTriangle : CheckCircle;
  const RiskIcon = riskIcon;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎓 Student Assessment Report
        </h1>
        <p className="text-gray-600">
          AI-powered dropout prediction and counseling recommendations
        </p>
      </div>

      {/* Main Risk Assessment Card */}
      <Card className={`shadow-lg border-2 ${riskBgColor}`}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center items-center gap-3">
            <RiskIcon className={`w-8 h-8 ${riskColor}`} />
            <CardTitle className={`text-2xl ${riskColor}`}>
              {riskLevel} Dropout Risk
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Confidence Score */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Prediction Confidence</p>
            <div className="flex items-center justify-center gap-4">
              <Progress value={confidence} className="w-48 h-3" />
              <span className="text-2xl font-bold text-gray-900">{confidence}%</span>
            </div>
          </div>

          {/* Risk Interpretation */}
          <div className="text-center p-4 bg-white rounded-lg border">
            <p className="text-lg font-medium text-gray-900">
              {isHighRisk 
                ? "This student shows indicators that suggest intervention may be beneficial."
                : "This student demonstrates positive indicators for academic success."
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Breakdown */}
      {analysis && Object.keys(analysis).length > 0 && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {analysis.attendance_status && (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Activity className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="font-medium">Attendance</p>
                  <p className={`text-sm ${analysis.attendance_status === 'Good' ? 'text-green-600' : 'text-orange-600'}`}>
                    {analysis.attendance_status}
                  </p>
                </div>
              )}
              {analysis.academic_status && (
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="font-medium">Academic Performance</p>
                  <p className={`text-sm ${analysis.academic_status === 'Good' ? 'text-green-600' : 'text-orange-600'}`}>
                    {analysis.academic_status}
                  </p>
                </div>
              )}
              {analysis.engagement_level && (
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                  <p className="font-medium">Engagement Level</p>
                  <p className={`text-sm ${analysis.engagement_level === 'High' ? 'text-green-600' : 'text-orange-600'}`}>
                    {analysis.engagement_level}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student Summary */}
      {studentData && Object.keys(studentData).length > 0 && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Assessment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {studentData.age && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{studentData.age} years</span>
                </div>
              )}
              {studentData.attendance_percent && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Attendance:</span>
                  <span className="font-medium">{studentData.attendance_percent}%</span>
                </div>
              )}
              {studentData.avg_marks && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Marks:</span>
                  <span className="font-medium">{studentData.avg_marks}%</span>
                </div>
              )}
              {studentData.extracurricular !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Extracurricular Activities:</span>
                  <span className="font-medium">{studentData.extracurricular}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center pt-4">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment
        </Button>
        <Button
  onClick={() => navigate("/")}
  className="bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center gap-2"
>
  <RefreshCw className="w-4 h-4" />
  Take New Assessment
</Button>

      </div>
      
      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-6 border-t">
        <p>This assessment is generated using AI and should be used as guidance alongside professional counseling.</p>
      </div>
    </div>
  );
};

export default ReportCard;
