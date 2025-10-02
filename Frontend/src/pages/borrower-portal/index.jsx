import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import PublicHeader from '../../components/ui/PublicHeader';
import ProgressStepper from './components/ProgressStepper';
import DocumentCategorySection from './components/DocumentCategorySection';
import VerificationStatusPanel from './components/VerificationStatusPanel';
import StepNavigation from './components/StepNavigation';

const BorrowerPortal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    aadhaarNumber: '',
    panNumber: '',
    address: ''
  });
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [estimatedIncome, setEstimatedIncome] = useState(null);
  const [compositeScore, setCompositeScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Basic details and contact information'
    },
    {
      id: 2,
      title: 'Identity Documents',
      description: 'Aadhaar and PAN verification'
    },
    {
      id: 3,
      title: 'Utility Bills',
      description: 'Electricity, water, and gas bills'
    },
    {
      id: 4,
      title: 'Financial Records',
      description: 'Bank statements and recharge history'
    },
    {
      id: 5,
      title: 'Review & Submit',
      description: 'Verify information and submit'
    }
  ];

  const documentCategories = {
    2: {
      title: 'Identity Documents',
      description: 'Upload your government-issued identity documents for verification',
      documents: [
        {
          id: 'aadhaar',
          title: 'Aadhaar Card',
          description: 'Clear photo of both front and back sides',
          acceptedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
          maxSize: 5,
          isRequired: true
        },
        {
          id: 'pan',
          title: 'PAN Card',
          description: 'Clear photo of PAN card',
          acceptedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
          maxSize: 5,
          isRequired: true
        }
      ]
    },
    3: {
      title: 'Utility Bills',
      description: 'Upload recent utility bills to verify your address and payment history',
      documents: [
        {
          id: 'electricity',
          title: 'Electricity Bill',
          description: 'Latest electricity bill (within 3 months)',
          acceptedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
          maxSize: 5,
          isRequired: true
        },
        {
          id: 'water',
          title: 'Water Bill',
          description: 'Recent water bill (optional)',
          acceptedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
          maxSize: 5,
          isRequired: false
        },
        {
          id: 'gas',
          title: 'Gas Bill',
          description: 'Recent gas connection bill (optional)',
          acceptedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
          maxSize: 5,
          isRequired: false
        }
      ]
    },
    4: {
      title: 'Financial Records',
      description: 'Upload financial documents to assess your creditworthiness',
      documents: [
        {
          id: 'bank-statement',
          title: 'Bank Statement',
          description: 'Last 3 months bank statement',
          acceptedFormats: ['pdf'],
          maxSize: 10,
          isRequired: true
        },
        {
          id: 'mobile-recharge',
          title: 'Mobile Recharge History',
          description: 'Screenshots of recent mobile recharges',
          acceptedFormats: ['jpg', 'jpeg', 'png'],
          maxSize: 5,
          isRequired: true
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate verification process when files are uploaded
    const uploadedCount = Object.keys(uploadedFiles)?.length;
    if (uploadedCount > 0 && currentStep >= 5) {
      setVerificationStatus('in-progress');
      
      // Simulate AI processing
      setTimeout(() => {
        setVerificationStatus('completed');
        setEstimatedIncome('25,000 - 35,000');
        setCompositeScore(78);
      }, 3000);
    }
  }, [uploadedFiles, currentStep]);

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleFileUpload = (documentId, file) => {
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [documentId]: file
      }));
    } else {
      setUploadedFiles(prev => {
        const updated = { ...prev };
        delete updated?.[documentId];
        return updated;
      });
    }
    
    // Clear error when file is uploaded
    if (errors?.[documentId]) {
      setErrors(prev => ({
        ...prev,
        [documentId]: null
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!personalInfo?.fullName?.trim()) newErrors.fullName = 'Full name is required';
      if (!personalInfo?.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!personalInfo?.email?.trim()) newErrors.email = 'Email is required';
      if (!personalInfo?.aadhaarNumber?.trim()) newErrors.aadhaarNumber = 'Aadhaar number is required';
      if (!personalInfo?.address?.trim()) newErrors.address = 'Address is required';
    } else if (documentCategories?.[step]) {
      const requiredDocs = documentCategories?.[step]?.documents?.filter(doc => doc?.isRequired);
      requiredDocs?.forEach(doc => {
        if (!uploadedFiles?.[doc?.id]) {
          newErrors[doc.id] = `${doc?.title} is required`;
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationStatus('in-progress');
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-text-primary mb-2">Personal Information</h2>
              <p className="text-text-secondary">Please provide your basic details to get started</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={personalInfo?.fullName}
                onChange={(e) => handlePersonalInfoChange('fullName', e?.target?.value)}
                error={errors?.fullName}
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                value={personalInfo?.phoneNumber}
                onChange={(e) => handlePersonalInfoChange('phoneNumber', e?.target?.value)}
                error={errors?.phoneNumber}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={personalInfo?.email}
                onChange={(e) => handlePersonalInfoChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />
              
              <Input
                label="Aadhaar Number"
                type="text"
                placeholder="Enter your Aadhaar number"
                value={personalInfo?.aadhaarNumber}
                onChange={(e) => handlePersonalInfoChange('aadhaarNumber', e?.target?.value)}
                error={errors?.aadhaarNumber}
                required
              />
              
              <Input
                label="PAN Number"
                type="text"
                placeholder="Enter your PAN number (optional)"
                value={personalInfo?.panNumber}
                onChange={(e) => handlePersonalInfoChange('panNumber', e?.target?.value)}
                className="md:col-span-2"
              />
            </div>
            <Input
              label="Address"
              type="text"
              placeholder="Enter your complete address"
              value={personalInfo?.address}
              onChange={(e) => handlePersonalInfoChange('address', e?.target?.value)}
              error={errors?.address}
              required
            />
          </motion.div>
        );
        
      case 2:
      case 3:
      case 4:
        const category = documentCategories?.[currentStep];
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DocumentCategorySection
              title={category?.title}
              description={category?.description}
              documents={category?.documents}
              onFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
              errors={errors}
            />
          </motion.div>
        );
        
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-text-primary mb-2">Review & Submit</h2>
              <p className="text-text-secondary">Please review your information before submitting</p>
            </div>
            {/* Personal Information Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Full Name:</span>
                  <span className="ml-2 text-text-primary font-medium">{personalInfo?.fullName}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Phone:</span>
                  <span className="ml-2 text-text-primary font-medium">{personalInfo?.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Email:</span>
                  <span className="ml-2 text-text-primary font-medium">{personalInfo?.email}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Aadhaar:</span>
                  <span className="ml-2 text-text-primary font-medium">{personalInfo?.aadhaarNumber}</span>
                </div>
              </div>
            </div>
            {/* Uploaded Documents Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Uploaded Documents</h3>
              <div className="space-y-3">
                {Object.entries(uploadedFiles)?.map(([docId, file]) => (
                  <div key={docId} className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm text-text-primary font-medium">{file?.name}</span>
                    <span className="text-xs text-text-secondary">
                      ({(file?.size / 1024 / 1024)?.toFixed(2)} MB)
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Verification Status */}
            <VerificationStatusPanel
              status={verificationStatus}
              estimatedIncome={estimatedIncome}
              compositeScore={compositeScore}
            />
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="FileText" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Loan Application Portal</h1>
                <p className="text-text-secondary">Apply for credit with AI-powered verification</p>
              </div>
            </div>
          </div>

          {/* Progress Stepper */}
          <ProgressStepper currentStep={currentStep} steps={steps} />

          {/* Main Content */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-8">
            {renderStepContent()}
            
            {/* Navigation */}
            <StepNavigation
              currentStep={currentStep}
              totalSteps={steps?.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              isNextDisabled={false}
              isSubmitting={isSubmitting}
              className="mt-8"
            />
          </div>

          {/* Help Section */}
          <div className="bg-muted rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Icon name="HelpCircle" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Need Help?</h3>
            </div>
            <p className="text-text-secondary mb-4">
              Our support team is available to assist you with your application
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" iconName="Phone" iconPosition="left">
                Call Support: 1800-123-4567
              </Button>
              <Button variant="ghost" iconName="Mail" iconPosition="left">
                Email: support@creditlend.gov
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-text-secondary">
              <Link to="/landing-page" className="hover:text-primary transition-smooth">
                Back to Home
              </Link>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-smooth">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-smooth">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-smooth">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BorrowerPortal;