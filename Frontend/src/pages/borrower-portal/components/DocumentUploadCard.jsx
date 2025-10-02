import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUploadCard = ({ 
  title, 
  description, 
  acceptedFormats, 
  maxSize, 
  onFileUpload, 
  uploadedFile, 
  isRequired = false,
  error = null 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileSelection(files?.[0]);
    }
  };

  const handleFileSelection = async (file) => {
    if (!file) return;

    // Validate file type
    const fileExtension = file?.name?.split('.')?.pop()?.toLowerCase();
    if (!acceptedFormats?.includes(fileExtension)) {
      return;
    }

    // Validate file size (maxSize in MB)
    if (file?.size > maxSize * 1024 * 1024) {
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      onFileUpload(file);
      setIsUploading(false);
    }, 1500);
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleRemoveFile = () => {
    onFileUpload(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            {isRequired && (
              <span className="text-error text-sm font-medium">*</span>
            )}
          </div>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
        
        {uploadedFile && (
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-sm font-medium text-success">Uploaded</span>
          </div>
        )}
      </div>
      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer ${
            isDragOver
              ? 'border-primary bg-primary/5'
              : error
              ? 'border-error bg-error/5' :'border-border hover:border-primary hover:bg-muted/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef?.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats?.map(format => `.${format}`)?.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={32} className="text-primary" />
              </div>
              <p className="text-sm font-medium text-primary">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full">
                <Icon name="Upload" size={24} className="text-text-secondary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-primary">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="text-xs text-text-secondary">
                  Supported formats: {acceptedFormats?.join(', ')?.toUpperCase()} • Max size: {maxSize}MB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                <Icon name="FileText" size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{uploadedFile?.name}</p>
                <p className="text-xs text-text-secondary">
                  {formatFileSize(uploadedFile?.size)} • Uploaded successfully
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              iconName="X"
              iconSize={16}
              className="text-text-secondary hover:text-error"
            >
              Remove
            </Button>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-3 flex items-center space-x-2 text-error">
          <Icon name="AlertCircle" size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadCard;