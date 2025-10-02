import React from 'react';
import DocumentUploadCard from './DocumentUploadCard';

const DocumentCategorySection = ({ 
  title, 
  description, 
  documents, 
  onFileUpload, 
  uploadedFiles, 
  errors 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">{title}</h2>
        <p className="text-text-secondary">{description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents?.map((doc) => (
          <DocumentUploadCard
            key={doc?.id}
            title={doc?.title}
            description={doc?.description}
            acceptedFormats={doc?.acceptedFormats}
            maxSize={doc?.maxSize}
            isRequired={doc?.isRequired}
            onFileUpload={(file) => onFileUpload(doc?.id, file)}
            uploadedFile={uploadedFiles?.[doc?.id]}
            error={errors?.[doc?.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentCategorySection;