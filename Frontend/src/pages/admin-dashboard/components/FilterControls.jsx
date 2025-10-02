import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterControls = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  riskFilter, 
  onRiskFilterChange,
  onExportCSV,
  onExportPDF,
  onAddBeneficiary,
  totalCount 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const riskOptions = [
    { value: 'all', label: 'All Risk Bands' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <Input
                type="text"
                placeholder="Search beneficiaries..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="min-w-0 sm:min-w-[160px]">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e?.target?.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              {statusOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Filter */}
          <div className="min-w-0 sm:min-w-[160px]">
            <select
              value={riskFilter}
              onChange={(e) => onRiskFilterChange(e?.target?.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              {riskOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button variant="outline" size="sm" onClick={onExportCSV}>
            <Icon name="Download" size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={onExportPDF}>
            <Icon name="FileText" size={16} className="mr-2" />
            Export PDF
          </Button>
          <Button variant="default" size="sm" onClick={onAddBeneficiary}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Beneficiary
          </Button>
        </div>
      </div>
      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-text-secondary">
          Showing <span className="font-medium text-text-primary">{totalCount}</span> beneficiaries
          {searchTerm && (
            <span> matching "<span className="font-medium text-text-primary">{searchTerm}</span>"</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default FilterControls;