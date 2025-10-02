import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import BeneficiaryProfile from './components/BeneficiaryProfile';
import DocumentViewer from './components/DocumentViewer';
import ScoreBreakdown from './components/ScoreBreakdown';
import RiskAssessment from './components/RiskAssessment';
import ActionPanel from './components/ActionPanel';
import PaymentBehaviorChart from './components/PaymentBehaviorChart';

const BeneficiaryDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [beneficiary, setBeneficiary] = useState(null);

  // Mock beneficiary data
  const mockBeneficiaryData = {
    id: "BEN-2024-001",
    name: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+91 98765 43210",
    address: "123 Gandhi Nagar, Sector 15, New Delhi - 110001",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "pending",
    creditScore: 742,
    riskBand: "Medium",
    estimatedIncome: 45000,
    loanAmount: 250000,
    loanTenure: 24,
    applicationDate: "15/09/2024",
    lastUpdated: "28/09/2024",
    assignedOfficer: "Priya Patel",
    processingDays: 5
  };

  const mockDocuments = [
    {
      id: "doc_001",
      type: "electricity_bill",
      uploadDate: "15/09/2024",
      verificationStatus: "verified",
      fileSize: "2.3 MB",
      format: "PDF",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      fullImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      extractedData: "Monthly consumption: 245 units, Amount: ₹2,450, Payment date: 10th of each month"
    },
    {
      id: "doc_002",
      type: "mobile_recharge",
      uploadDate: "15/09/2024",
      verificationStatus: "verified",
      fileSize: "1.8 MB",
      format: "JPG",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
      fullImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      extractedData: "Plan: ₹599/month, Validity: 84 days, Regular recharge pattern"
    },
    {
      id: "doc_003",
      type: "aadhaar",
      uploadDate: "16/09/2024",
      verificationStatus: "pending",
      fileSize: "1.2 MB",
      format: "PDF",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
      fullImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
      extractedData: "Name: Rajesh Kumar Sharma, DOB: 15/03/1985, Address verified"
    },
    {
      id: "doc_004",
      type: "bank_statement",
      uploadDate: "16/09/2024",
      verificationStatus: "verified",
      fileSize: "3.1 MB",
      format: "PDF",
      thumbnail: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=300&h=200&fit=crop",
      fullImage: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=800&h=600&fit=crop",
      extractedData: "Average monthly balance: ₹52,000, Salary credit: ₹45,000, Regular transactions"
    },
    {
      id: "doc_005",
      type: "water_bill",
      uploadDate: "17/09/2024",
      verificationStatus: "rejected",
      fileSize: "1.5 MB",
      format: "JPG",
      thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
      fullImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      extractedData: "Document quality insufficient for verification"
    },
    {
      id: "doc_006",
      type: "gas_bill",
      uploadDate: "17/09/2024",
      verificationStatus: "verified",
      fileSize: "2.0 MB",
      format: "PDF",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      fullImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      extractedData: "Monthly consumption: 28 units, Amount: ₹850, Regular payment history"
    }
  ];

  const mockScoreData = {
    compositeScore: 742,
    repaymentHistory: 85,
    utilityData: 78,
    rechargeData: 82,
    incomeStability: 75,
    confidenceLevel: 88
  };

  const mockRiskData = {
    overallRisk: "Medium",
    riskScore: 35,
    lastUpdated: "28/09/2024",
    paymentHistoryRisk: "Low",
    incomeStabilityRisk: "Medium",
    debtToIncomeRisk: "Low",
    geographicRisk: "Low",
    behavioralRisk: "Medium",
    defaultProbability: 8.5,
    expectedLoss: 21250,
    recoveryRate: 85
  };

  const mockPaymentData = [
    { month: 'Jan', onTimePayments: 8, latePayments: 2, averageAmount: 2400 },
    { month: 'Feb', onTimePayments: 9, latePayments: 1, averageAmount: 2350 },
    { month: 'Mar', onTimePayments: 10, latePayments: 0, averageAmount: 2500 },
    { month: 'Apr', onTimePayments: 8, latePayments: 2, averageAmount: 2450 },
    { month: 'May', onTimePayments: 9, latePayments: 1, averageAmount: 2600 },
    { month: 'Jun', onTimePayments: 10, latePayments: 0, averageAmount: 2550 }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchBeneficiaryData = async () => {
      setIsLoading(true);
      // Mock API delay
      setTimeout(() => {
        setBeneficiary(mockBeneficiaryData);
        setIsLoading(false);
      }, 1000);
    };

    fetchBeneficiaryData();
  }, [id]);

  const handleStatusUpdate = (newStatus, data) => {
    setBeneficiary(prev => ({
      ...prev,
      status: newStatus,
      lastUpdated: new Date()?.toLocaleDateString('en-GB')
    }));
    console.log(`Status updated to ${newStatus}`, data);
  };

  const handleLogout = () => {
    navigate('/admin-partner-login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'Home' },
    { label: 'Beneficiaries', path: '/admin-dashboard' },
    { label: beneficiary?.name || 'Loading...', path: `/beneficiary-detail-view/${id}` }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminSidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading beneficiary details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!beneficiary) {
    return (
      <div className="min-h-screen bg-background">
        <AdminSidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Beneficiary Not Found
              </h2>
              <p className="text-text-secondary mb-4">
                The requested beneficiary could not be found.
              </p>
              <Button onClick={() => navigate('/admin-dashboard')}>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin-dashboard')}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-xl font-semibold text-text-primary">
                Beneficiary Details
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>Last updated: {beneficiary?.lastUpdated}</span>
              </div>
              <UserProfileDropdown onLogout={handleLogout} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <BreadcrumbTrail customItems={customBreadcrumbs} />
          
          <div className="space-y-6">
            {/* Beneficiary Profile */}
            <BeneficiaryProfile beneficiary={beneficiary} />
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Documents and Charts */}
              <div className="xl:col-span-2 space-y-6">
                <DocumentViewer documents={mockDocuments} />
                <PaymentBehaviorChart paymentData={mockPaymentData} />
              </div>
              
              {/* Right Column - Actions */}
              <div className="space-y-6">
                <ActionPanel 
                  beneficiary={beneficiary} 
                  onStatusUpdate={handleStatusUpdate} 
                />
              </div>
            </div>
            
            {/* Score and Risk Analysis */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ScoreBreakdown scoreData={mockScoreData} />
              <RiskAssessment riskData={mockRiskData} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-background border-t border-border px-6 py-4 mt-12">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Ministry of Finance</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <span>CreditLend Pro Admin Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>© {new Date()?.getFullYear()} Government of India</span>
              <div className="h-4 w-px bg-border"></div>
              <span>Secure Portal</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BeneficiaryDetailView;