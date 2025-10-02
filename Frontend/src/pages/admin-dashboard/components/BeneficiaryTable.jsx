import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BeneficiaryTable = ({ beneficiaries, onSort, sortConfig }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(beneficiaries?.map(b => b?.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows?.filter(rowId => rowId !== id));
    }
  };

  const getRiskBadgeColor = (riskBand) => {
    switch (riskBand?.toLowerCase()) {
      case 'low': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'high': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-text-secondary border-border';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-success';
    if (score >= 650) return 'text-warning';
    return 'text-error';
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Beneficiary Management</h3>
          {selectedRows?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedRows?.length} selected
              </span>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Export Selected
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Mail" size={16} className="mr-2" />
                Send Notification
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === beneficiaries?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-secondary hover:text-primary transition-smooth"
                >
                  <span>Beneficiary Name</span>
                  <Icon name={getSortIcon('name')} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => onSort('incomeBand')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-secondary hover:text-primary transition-smooth"
                >
                  <span>Income Band</span>
                  <Icon name={getSortIcon('incomeBand')} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => onSort('creditScore')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-secondary hover:text-primary transition-smooth"
                >
                  <span>Credit Score</span>
                  <Icon name={getSortIcon('creditScore')} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => onSort('riskBand')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-secondary hover:text-primary transition-smooth"
                >
                  <span>Risk Band</span>
                  <Icon name={getSortIcon('riskBand')} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-medium text-text-secondary">Application Date</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-medium text-text-secondary">Status</span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-sm font-medium text-text-secondary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {beneficiaries?.map((beneficiary) => (
              <tr key={beneficiary?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows?.includes(beneficiary?.id)}
                    onChange={(e) => handleSelectRow(beneficiary?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{beneficiary?.name}</p>
                      <p className="text-xs text-text-secondary">{beneficiary?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text-primary">
                    {formatCurrency(beneficiary?.incomeBand?.min)} - {formatCurrency(beneficiary?.incomeBand?.max)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-bold ${getScoreColor(beneficiary?.creditScore)}`}>
                    {beneficiary?.creditScore}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeColor(beneficiary?.riskBand)}`}>
                    {beneficiary?.riskBand}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">
                    {new Date(beneficiary.applicationDate)?.toLocaleDateString('en-IN')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    beneficiary?.status === 'approved' ? 'bg-success/10 text-success' :
                    beneficiary?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }`}>
                    {beneficiary?.status?.charAt(0)?.toUpperCase() + beneficiary?.status?.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link to={`/beneficiary-detail-view?id=${beneficiary?.id}`}>
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {beneficiaries?.map((beneficiary) => (
          <div key={beneficiary?.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedRows?.includes(beneficiary?.id)}
                  onChange={(e) => handleSelectRow(beneficiary?.id, e?.target?.checked)}
                  className="rounded border-border"
                />
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{beneficiary?.name}</p>
                  <p className="text-xs text-text-secondary">{beneficiary?.email}</p>
                </div>
              </div>
              <Link to={`/beneficiary-detail-view?id=${beneficiary?.id}`}>
                <Button variant="ghost" size="sm">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Income Band</span>
                <p className="font-medium text-text-primary">
                  {formatCurrency(beneficiary?.incomeBand?.min)} - {formatCurrency(beneficiary?.incomeBand?.max)}
                </p>
              </div>
              <div>
                <span className="text-text-secondary">Credit Score</span>
                <p className={`font-bold ${getScoreColor(beneficiary?.creditScore)}`}>
                  {beneficiary?.creditScore}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeColor(beneficiary?.riskBand)}`}>
                {beneficiary?.riskBand}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                beneficiary?.status === 'approved' ? 'bg-success/10 text-success' :
                beneficiary?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
              }`}>
                {beneficiary?.status?.charAt(0)?.toUpperCase() + beneficiary?.status?.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeneficiaryTable;