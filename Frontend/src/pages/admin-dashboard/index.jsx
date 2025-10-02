import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import MetricsCard from './components/MetricsCard';
import FilterControls from './components/FilterControls';
import BeneficiaryTable from './components/BeneficiaryTable';
import AnalyticsCharts from './components/AnalyticsCharts';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Mock beneficiary data
  const mockBeneficiaries = [
    {
      id: 1,
      name: "Rajesh Kumar Singh",
      email: "rajesh.singh@email.com",
      incomeBand: { min: 25000, max: 35000 },
      creditScore: 720,
      riskBand: "Low",
      applicationDate: "2024-09-15",
      status: "approved"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      incomeBand: { min: 15000, max: 25000 },
      creditScore: 680,
      riskBand: "Medium",
      applicationDate: "2024-09-20",
      status: "pending"
    },
    {
      id: 3,
      name: "Mohammed Ali Khan",
      email: "ali.khan@email.com",
      incomeBand: { min: 35000, max: 50000 },
      creditScore: 780,
      riskBand: "Low",
      applicationDate: "2024-09-18",
      status: "approved"
    },
    {
      id: 4,
      name: "Sunita Devi",
      email: "sunita.devi@email.com",
      incomeBand: { min: 10000, max: 15000 },
      creditScore: 620,
      riskBand: "High",
      applicationDate: "2024-09-22",
      status: "rejected"
    },
    {
      id: 5,
      name: "Amit Patel",
      email: "amit.patel@email.com",
      incomeBand: { min: 20000, max: 30000 },
      creditScore: 710,
      riskBand: "Low",
      applicationDate: "2024-09-25",
      status: "approved"
    },
    {
      id: 6,
      name: "Kavita Reddy",
      email: "kavita.reddy@email.com",
      incomeBand: { min: 18000, max: 28000 },
      creditScore: 650,
      riskBand: "Medium",
      applicationDate: "2024-09-28",
      status: "pending"
    },
    {
      id: 7,
      name: "Ravi Gupta",
      email: "ravi.gupta@email.com",
      incomeBand: { min: 12000, max: 18000 },
      creditScore: 590,
      riskBand: "High",
      applicationDate: "2024-09-26",
      status: "pending"
    },
    {
      id: 8,
      name: "Meera Joshi",
      email: "meera.joshi@email.com",
      incomeBand: { min: 30000, max: 45000 },
      creditScore: 750,
      riskBand: "Low",
      applicationDate: "2024-09-24",
      status: "approved"
    }
  ];

  // Filter and sort beneficiaries
  const filteredAndSortedBeneficiaries = useMemo(() => {
    let filtered = mockBeneficiaries?.filter(beneficiary => {
      const matchesSearch = beneficiary?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           beneficiary?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = statusFilter === 'all' || beneficiary?.status === statusFilter;
      const matchesRisk = riskFilter === 'all' || beneficiary?.riskBand?.toLowerCase() === riskFilter;
      
      return matchesSearch && matchesStatus && matchesRisk;
    });

    // Sort the filtered results
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'incomeBand') {
        aValue = a?.incomeBand?.min;
        bValue = b?.incomeBand?.min;
      }

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, riskFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
    // Mock CSV export functionality
    alert('CSV export functionality would be implemented here');
  };

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
    // Mock PDF export functionality
    alert('PDF export functionality would be implemented here');
  };

  const handleAddBeneficiary = () => {
    console.log('Adding new beneficiary...');
    // Mock add beneficiary functionality
    alert('Add beneficiary functionality would be implemented here');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Mock logout functionality
    alert('Logout functionality would be implemented here');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Calculate metrics
  const totalBeneficiaries = mockBeneficiaries?.length;
  const approvedCount = mockBeneficiaries?.filter(b => b?.status === 'approved')?.length;
  const approvalRate = Math.round((approvedCount / totalBeneficiaries) * 100);
  const avgCreditScore = Math.round(
    mockBeneficiaries?.reduce((sum, b) => sum + b?.creditScore, 0) / totalBeneficiaries
  );
  const lowRiskCount = mockBeneficiaries?.filter(b => b?.riskBand === 'Low')?.length;
  const lowRiskPercentage = Math.round((lowRiskCount / totalBeneficiaries) * 100);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - CreditLend Pro</title>
        <meta name="description" content="Comprehensive dashboard for managing beneficiaries, assessing risk, and monitoring lending operations with data visualization tools." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={toggleSidebar}
        />
        
        <div className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'
        }`}>
          {/* Header */}
          <header className="sticky top-0 z-50 bg-background border-b border-border">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted transition-smooth"
                  aria-label="Toggle sidebar"
                >
                  <Icon name="Menu" size={20} />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>
                  <p className="text-sm text-text-secondary">
                    Welcome back, manage your lending operations
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                  <Icon name="Calendar" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {new Date()?.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <UserProfileDropdown onLogout={handleLogout} />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            <BreadcrumbTrail />

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard
                title="Total Beneficiaries"
                value={totalBeneficiaries?.toLocaleString('en-IN')}
                change="+12%"
                changeType="positive"
                icon="Users"
                description="Active loan applications"
              />
              <MetricsCard
                title="Approval Rate"
                value={`${approvalRate}%`}
                change="+5%"
                changeType="positive"
                icon="CheckCircle"
                description="This month's approvals"
              />
              <MetricsCard
                title="Average Credit Score"
                value={avgCreditScore}
                change="+15 pts"
                changeType="positive"
                icon="TrendingUp"
                description="Portfolio average"
              />
              <MetricsCard
                title="Low Risk Portfolio"
                value={`${lowRiskPercentage}%`}
                change="+8%"
                changeType="positive"
                icon="Shield"
                description="Low risk beneficiaries"
              />
            </div>

            {/* Filter Controls */}
            <FilterControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              riskFilter={riskFilter}
              onRiskFilterChange={setRiskFilter}
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
              onAddBeneficiary={handleAddBeneficiary}
              totalCount={filteredAndSortedBeneficiaries?.length}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Beneficiary Table */}
              <div className="xl:col-span-2">
                <BeneficiaryTable
                  beneficiaries={filteredAndSortedBeneficiaries}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              </div>

              {/* Quick Actions Panel */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-muted transition-smooth">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                        <Icon name="FileText" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">Generate Report</p>
                        <p className="text-xs text-text-secondary">Create monthly summary</p>
                      </div>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-muted transition-smooth">
                      <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                        <Icon name="Mail" size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">Send Notifications</p>
                        <p className="text-xs text-text-secondary">Bulk email to beneficiaries</p>
                      </div>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-muted transition-smooth">
                      <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
                        <Icon name="AlertTriangle" size={20} className="text-warning" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">Review Pending</p>
                        <p className="text-xs text-text-secondary">3 applications need review</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary">Loan approved for Rajesh Kumar</p>
                        <p className="text-xs text-text-secondary">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <Icon name="Upload" size={16} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary">New documents uploaded by Priya Sharma</p>
                        <p className="text-xs text-text-secondary">4 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-full">
                        <Icon name="Clock" size={16} className="text-warning" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary">Application pending review</p>
                        <p className="text-xs text-text-secondary">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Charts */}
            <AnalyticsCharts />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;