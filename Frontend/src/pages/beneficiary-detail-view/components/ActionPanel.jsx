import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ActionPanel = ({ beneficiary, onStatusUpdate }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [approvalAmount, setApprovalAmount] = useState(beneficiary?.loanAmount);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = async () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      onStatusUpdate && onStatusUpdate('approved', { amount: approvalAmount, notes });
      setIsLoading(false);
      setShowApprovalModal(false);
    }, 1500);
  };

  const handleReject = async () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      onStatusUpdate && onStatusUpdate('rejected', { reason: rejectionReason, notes });
      setIsLoading(false);
      setShowRejectionModal(false);
    }, 1500);
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting beneficiary data in ${format} format`);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'rejected':
        return 'text-error';
      case 'under review':
        return 'text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const rejectionReasons = [
    'Insufficient income verification',
    'High risk assessment',
    'Incomplete documentation',
    'Credit history concerns',
    'Policy violation',
    'Other (specify in notes)'
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Actions & Status
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={16} className="text-text-secondary" />
          <span className={`text-sm font-medium ${getStatusColor(beneficiary?.status)}`}>
            {beneficiary?.status}
          </span>
        </div>
      </div>
      {/* Current Status */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-primary">
            Application Status
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            beneficiary?.status === 'approved' ? 'bg-success text-success-foreground' :
            beneficiary?.status === 'pending' ? 'bg-warning text-warning-foreground' :
            beneficiary?.status === 'rejected' ? 'bg-error text-error-foreground' :
            'bg-secondary text-secondary-foreground'
          }`}>
            {beneficiary?.status}
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Requested Amount:</span>
            <span className="text-text-primary">₹{beneficiary?.loanAmount?.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Processing Time:</span>
            <span className="text-text-primary">{beneficiary?.processingDays} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Assigned Officer:</span>
            <span className="text-text-primary">{beneficiary?.assignedOfficer}</span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      {beneficiary?.status === 'pending' && (
        <div className="space-y-4 mb-6">
          <h4 className="text-md font-medium text-text-primary">Loan Decision</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="success" 
              onClick={() => setShowApprovalModal(true)}
              className="w-full"
            >
              <Icon name="Check" size={16} className="mr-2" />
              Approve Loan
            </Button>
            <Button 
              variant="danger" 
              onClick={() => setShowRejectionModal(true)}
              className="w-full"
            >
              <Icon name="X" size={16} className="mr-2" />
              Reject Application
            </Button>
          </div>
        </div>
      )}
      {/* Additional Actions */}
      <div className="space-y-4 mb-6">
        <h4 className="text-md font-medium text-text-primary">Additional Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowNotes(!showNotes)}
            className="w-full"
          >
            <Icon name="FileText" size={16} className="mr-2" />
            Add Notes
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('pdf')}
            className="w-full"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      {/* Notes Section */}
      {showNotes && (
        <div className="mb-6 p-4 border border-border rounded-lg">
          <Input
            label="Case Notes"
            type="text"
            placeholder="Add notes about this application..."
            value={notes}
            onChange={(e) => setNotes(e?.target?.value)}
            description="These notes will be visible to all team members"
          />
          <div className="flex justify-end space-x-2 mt-3">
            <Button variant="outline" size="sm" onClick={() => setShowNotes(false)}>
              Cancel
            </Button>
            <Button variant="default" size="sm">
              Save Notes
            </Button>
          </div>
        </div>
      )}
      {/* Export Options */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-text-primary">Export Options</h4>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleExport('csv')}
            className="justify-start"
          >
            <Icon name="FileSpreadsheet" size={16} className="mr-2" />
            CSV Export
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleExport('pdf')}
            className="justify-start"
          >
            <Icon name="FileText" size={16} className="mr-2" />
            PDF Report
          </Button>
        </div>
      </div>
      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-300 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Approve Loan Application
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowApprovalModal(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Approved Amount"
                type="number"
                value={approvalAmount}
                onChange={(e) => setApprovalAmount(Number(e?.target?.value))}
                description={`Requested: ₹${beneficiary?.loanAmount?.toLocaleString('en-IN')}`}
              />
              
              <Input
                label="Approval Notes"
                type="text"
                placeholder="Add any conditions or notes..."
                value={notes}
                onChange={(e) => setNotes(e?.target?.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowApprovalModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="success" 
                onClick={handleApprove}
                loading={isLoading}
              >
                Approve Loan
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 z-300 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Reject Loan Application
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowRejectionModal(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Rejection Reason
                </label>
                <div className="space-y-2">
                  {rejectionReasons?.map((reason, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="rejectionReason"
                        value={reason}
                        checked={rejectionReason === reason}
                        onChange={(e) => setRejectionReason(e?.target?.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-primary">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Input
                label="Additional Notes"
                type="text"
                placeholder="Provide additional details..."
                value={notes}
                onChange={(e) => setNotes(e?.target?.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowRejectionModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={handleReject}
                loading={isLoading}
                disabled={!rejectionReason}
              >
                Reject Application
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;