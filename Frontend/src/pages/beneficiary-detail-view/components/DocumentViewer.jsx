import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DocumentViewer = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDocumentIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'electricity_bill':
        return 'Zap';
      case 'mobile_recharge':
        return 'Smartphone';
      case 'water_bill':
        return 'Droplets';
      case 'gas_bill':
        return 'Flame';
      case 'aadhaar':
        return 'CreditCard';
      case 'bank_statement':
        return 'Building2';
      default:
        return 'FileText';
    }
  };

  const getDocumentTypeLabel = (type) => {
    const labels = {
      'electricity_bill': 'Electricity Bill',
      'mobile_recharge': 'Mobile Recharge',
      'water_bill': 'Water Bill',
      'gas_bill': 'Gas Bill',
      'aadhaar': 'Aadhaar Card',
      'bank_statement': 'Bank Statement'
    };
    return labels?.[type] || type?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
  };

  const getVerificationStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'rejected':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const openModal = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDocument(null);
    setIsModalOpen(false);
  };

  const updateDocumentStatus = (documentId, newStatus) => {
    // Mock function - in real app would update via API
    console.log(`Updating document ${documentId} status to ${newStatus}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Uploaded Documents
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="FileText" size={16} />
          <span>{documents?.length} documents</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents?.map((document) => (
          <div key={document?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getDocumentIcon(document?.type)} size={20} className="text-text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">
                    {getDocumentTypeLabel(document?.type)}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {document?.uploadDate}
                  </p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(document?.verificationStatus)}`}>
                {document?.verificationStatus}
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full h-32 bg-muted rounded-lg overflow-hidden cursor-pointer" onClick={() => openModal(document)}>
                {document?.thumbnail ? (
                  <Image 
                    src={document?.thumbnail} 
                    alt={`${getDocumentTypeLabel(document?.type)} preview`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Eye" size={24} className="text-text-secondary" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">File Size:</span>
                <span className="text-text-primary">{document?.fileSize}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Format:</span>
                <span className="text-text-primary">{document?.format}</span>
              </div>
              {document?.extractedData && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-text-secondary mb-1">Extracted Data:</p>
                  <p className="text-xs text-text-primary">{document?.extractedData}</p>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mt-4">
              <Button 
                variant="outline" 
                size="xs" 
                onClick={() => openModal(document)}
                className="flex-1"
              >
                <Icon name="Eye" size={14} className="mr-1" />
                View
              </Button>
              {document?.verificationStatus === 'pending' && (
                <>
                  <Button 
                    variant="success" 
                    size="xs" 
                    onClick={() => updateDocumentStatus(document?.id, 'verified')}
                  >
                    <Icon name="Check" size={14} />
                  </Button>
                  <Button 
                    variant="danger" 
                    size="xs" 
                    onClick={() => updateDocumentStatus(document?.id, 'rejected')}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Document Modal */}
      {isModalOpen && selectedDocument && (
        <div className="fixed inset-0 z-300 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {getDocumentTypeLabel(selectedDocument?.type)}
                </h3>
                <p className="text-sm text-text-secondary">
                  Uploaded on {selectedDocument?.uploadDate}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={closeModal}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="p-6 overflow-auto max-h-[70vh]">
              <div className="flex justify-center">
                <Image 
                  src={selectedDocument?.fullImage || selectedDocument?.thumbnail} 
                  alt={`${getDocumentTypeLabel(selectedDocument?.type)} full view`}
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
              
              {selectedDocument?.extractedData && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium text-text-primary mb-2">
                    Extracted Information:
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {selectedDocument?.extractedData}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between p-6 border-t border-border">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getVerificationStatusColor(selectedDocument?.verificationStatus)}`}>
                {selectedDocument?.verificationStatus}
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={closeModal}>
                  Close
                </Button>
                {selectedDocument?.verificationStatus === 'pending' && (
                  <>
                    <Button 
                      variant="danger" 
                      onClick={() => {
                        updateDocumentStatus(selectedDocument?.id, 'rejected');
                        closeModal();
                      }}
                    >
                      Reject
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={() => {
                        updateDocumentStatus(selectedDocument?.id, 'verified');
                        closeModal();
                      }}
                    >
                      Verify
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;