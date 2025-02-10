import React, { useState } from 'react';
import {
  TrendingUp,
  PackageOpen,
  RefreshCcw,
  AlertTriangle,
  Truck,
  Users,
  IndianRupee,
  Leaf,
  Download,
  Filter,
  Calendar,
  BarChart2,
  Droplets,
  Recycle,
  UserCheck,
  Shield,
  Building2,
  GanttChartSquare,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
  FileDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function AdminDashboard() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [esgCategory, setEsgCategory] = useState('all');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const stats = [
    { label: 'Total Returns', value: '1,234', change: '+12.5%', icon: PackageOpen, trend: 'up' },
    { label: 'Processing', value: '123', change: '-5.2%', icon: RefreshCcw, trend: 'down' },
    { label: 'Flagged', value: '23', change: '+2.3%', icon: AlertTriangle, trend: 'up' },
    { label: 'Completed', value: '891', change: '+18.2%', icon: Truck, trend: 'up' },
  ];

  const kpis = [
    { label: 'Customer Satisfaction', value: '94%', icon: Users },
    { label: 'Cost Savings', value: '₹12.5L', icon: IndianRupee },
    { label: 'Sustainability Score', value: '87%', icon: Leaf },
    { label: 'Processing Efficiency', value: '95%', icon: TrendingUp },
  ];

  // ESG Metrics Data
  const environmentalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Carbon Emissions (tons)',
        data: [120, 115, 108, 102, 95, 88],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
      },
      {
        label: 'Energy Usage (MWh)',
        data: [250, 245, 240, 235, 230, 225],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const socialData = {
    labels: ['Gender', 'Age', 'Ethnicity', 'Disability'],
    datasets: [{
      data: [85, 78, 82, 70],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
      ],
    }],
  };

  const governanceData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Compliance Score',
      data: [92, 95, 94, 97],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleExport = async (format: 'pdf' | 'csv' | 'excel') => {
    setIsExporting(true);
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExporting(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of return operations and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div
                        className={cn(
                          "ml-2 flex items-baseline text-sm font-semibold",
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        )}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ESG Dashboard */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">ESG Performance Dashboard</h2>
            <div className="flex items-center space-x-4">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <select
                value={esgCategory}
                onChange={(e) => setEsgCategory(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="environmental">Environmental</option>
                <option value="social">Social</option>
                <option value="governance">Governance</option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport('pdf')}
                  disabled={isExporting}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  disabled={isExporting}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  CSV
                </button>
                <button
                  onClick={() => handleExport('excel')}
                  disabled={isExporting}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ESG Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Environmental */}
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Leaf className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-900">Environmental</h3>
              </div>
              <span className="text-sm font-medium text-green-600">Score: 92/100</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Carbon Emissions</span>
                <span className="text-sm font-medium text-green-600">-12% YoY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Energy Usage</span>
                <span className="text-sm font-medium text-green-600">-8% YoY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Waste Recycled</span>
                <span className="text-sm font-medium text-green-600">85%</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900">Social</h3>
              </div>
              <span className="text-sm font-medium text-blue-600">Score: 88/100</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gender Diversity</span>
                <span className="text-sm font-medium text-blue-600">45% Women</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Employee Satisfaction</span>
                <span className="text-sm font-medium text-blue-600">4.5/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Safety Incidents</span>
                <span className="text-sm font-medium text-blue-600">-25% YoY</span>
              </div>
            </div>
          </div>

          {/* Governance */}
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-purple-900">Governance</h3>
              </div>
              <span className="text-sm font-medium text-purple-600">Score: 95/100</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Board Independence</span>
                <span className="text-sm font-medium text-purple-600">80%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ethics Compliance</span>
                <span className="text-sm font-medium text-purple-600">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Risk Assessment</span>
                <span className="text-sm font-medium text-purple-600">Quarterly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed ESG Sections */}
        <div className="p-6 space-y-6">
          {/* Environmental Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('environmental')}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Environmental Metrics</h3>
              </div>
              {expandedSection === 'environmental' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedSection === 'environmental' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Emissions & Energy Trends</h4>
                    <div className="h-80">
                      <Line data={environmentalData} options={chartOptions} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-4">Resource Management</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Water Usage</span>
                            <span className="text-sm font-medium text-green-600">-15%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Waste Recycling</span>
                            <span className="text-sm font-medium text-green-600">+8%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Renewable Energy</span>
                            <span className="text-sm font-medium text-green-600">+25%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Social Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('social')}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Social Impact</h3>
              </div>
              {expandedSection === 'social' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedSection === 'social' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Workforce Diversity</h4>
                    <div className="h-80">
                      <Doughnut data={socialData} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-4">Community Impact</h4>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Local Employment</span>
                            <span className="text-sm font-medium text-blue-600">75%</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Of workforce from local communities
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Training Hours</span>
                            <span className="text-sm font-medium text-blue-600">40hrs/employee</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Average annual training per employee
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Community Programs</span>
                            <span className="text-sm font-medium text-blue-600">12 Active</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Ongoing community development initiatives
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Governance Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('governance')}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Governance & Compliance</h3>
              </div>
              {expandedSection === 'governance' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedSection === 'governance' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Compliance Scores</h4>
                    <div className="h-80">
                      <Bar data={governanceData} options={chartOptions} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-4">Risk Management</h4>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Audit Findings</span>
                            <span className="text-sm font-medium text-green-600">Zero Critical</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Latest external audit results
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Policy Compliance</span>
                            <span className="text-sm font-medium text-green-600">100%</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Employee policy acknowledgment rate
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Board Meetings</span>
                            <span className="text-sm font-medium text-purple-600">12/year</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Regular governance reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-50 rounded-md p-3">
                    <kpi.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{kpi.label}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{kpi.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}