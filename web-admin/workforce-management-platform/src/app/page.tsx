"use client";
import React, { useState } from 'react';
  import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    Settings, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    FileText,
    Search,
    Bell
  } from 'lucide-react';

  // --- MOCK DATA ---
  const initialStats = {
    totalEmployees: 42,
    presentToday: 35,
    onLeave: 4,
    late: 3,
  };

  const initialRoster = [
    { id: 1, name: "Sarah Connor", role: "Software Engineer", status: "Present", timeIn: "08:50 AM", location: "HQ Office" },
    { id: 2, name: "John Smith", role: "Product Manager", status: "Late", timeIn: "09:15 AM", location: "HQ Office" },
    { id: 3, name: "Emily Chen", role: "UX Designer", status: "Present", timeIn: "08:45 AM", location: "HQ Office" },
    { id: 4, name: "Michael Chang", role: "Marketing Lead", status: "On Leave", timeIn: "-", location: "-" },
    { id: 5, name: "Jessica Alba", role: "QA Tester", status: "Absent", timeIn: "-", location: "-" },
  ];

  const initialLeaveRequests = [
    { id: 101, name: "David Kim", type: "Annual Leave", dates: "Oct 25 - Oct 27", reason: "Family Vacation", status: "Pending", hasMC: false },
    { id: 102, name: "Amanda Waller", type: "Sick Leave (MC)", dates: "Oct 24", reason: "Fever", status: "Pending", hasMC: true },
  ];

  export default function App() {
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
    const [roster, setRoster] = useState(initialRoster);

    const handleApprove = (id: number) => {
      setLeaveRequests(prev => prev.filter(req => req.id !== id));
      // In a real app, this would trigger an API call to update the database
    };

    const handleReject = (id: number) => {
      setLeaveRequests(prev => prev.filter(req => req.id !== id));
      // In a real app, this would trigger an API call to update the database
    };

    return (
      <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
        
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-indigo-600">
              <Clock className="h-6 w-6 font-bold" />
              <span className="text-xl font-bold tracking-tight">Syncio</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={currentTab === 'dashboard'} 
              onClick={() => setCurrentTab('dashboard')} 
            />
            <NavItem 
              icon={<Users size={20} />} 
              label="Live Roster" 
              active={currentTab === 'roster'} 
              onClick={() => setCurrentTab('roster')} 
            />
            <NavItem 
              icon={<Calendar size={20} />} 
              label="Leave Requests" 
              badge={leaveRequests.length}
              active={currentTab === 'leaves'} 
              onClick={() => setCurrentTab('leaves')} 
            />
          </nav>

          <div className="p-4 border-t border-gray-100">
            <NavItem icon={<Settings size={20} />} label="Settings" />
            <div className="mt-4 flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                AD
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-medium text-gray-900">Admin User</span>
                <span className="text-gray-500 text-xs">HR Manager</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* TOP HEADER */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
            <h1 className="text-xl font-semibold capitalize text-gray-800">
              {currentTab.replace('-', ' ')}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search employees..." 
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          {/* SCROLLABLE DASHBOARD CONTENT */}
          <div className="flex-1 overflow-auto p-8">
            
            {currentTab === 'dashboard' && (
              <div className="max-w-6xl mx-auto space-y-6">
                
                {/* STATS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard title="Total Employees" value={initialStats.totalEmployees} subtitle="Active headcount" color="blue" />
                  <StatCard title="Present Today" value={initialStats.presentToday} subtitle="Clocked in" color="green" />
                  <StatCard title="On Leave" value={initialStats.onLeave} subtitle="AL / SL / UPL" color="purple" />
                  <StatCard title="Late" value={initialStats.late} subtitle="Arrived after 09:00" color="orange" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* LIVE ROSTER PREVIEW */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Live Attendance Roster</h2>
                      <button 
                        onClick={() => setCurrentTab('roster')}
                        className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
                      >
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <th className="p-4 font-medium">Employee</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Time In</th>
                            <th className="p-4 font-medium">Location</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {roster.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4">
                                <div className="font-medium text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.role}</div>
                              </td>
                              <td className="p-4">
                                <StatusBadge status={user.status} />
                              </td>
                              <td className="p-4 text-gray-600">{user.timeIn}</td>
                              <td className="p-4 text-gray-600">{user.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* APPROVAL INBOX */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        Approval Inbox
                        {leaveRequests.length > 0 && (
                          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                            {leaveRequests.length}
                          </span>
                        )}
                      </h2>
                    </div>
                    <div className="p-0 flex-1 overflow-auto">
                      {leaveRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                          <CheckCircle2 size={32} className="mb-2 text-green-400" />
                          <p className="text-sm">All caught up!</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {leaveRequests.map(req => (
                            <div key={req.id} className="p-5 hover:bg-gray-50 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium text-sm text-gray-900">{req.name}</h3>
                                  <p className="text-xs text-gray-500">{req.type}</p>
                                </div>
                                {req.hasMC && (
                                  <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    <FileText size={10} /> MC Attached
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-700 mb-3 bg-gray-50 p-2 rounded border border-gray-100">
                                <p><span className="font-medium">Dates:</span> {req.dates}</p>
                                <p className="text-gray-500 text-xs mt-1">"{req.reason}"</p>
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleApprove(req.id)}
                                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors flex justify-center items-center gap-1"
                                >
                                  <CheckCircle2 size={16} /> Approve
                                </button>
                                <button 
                                  onClick={() => handleReject(req.id)}
                                  className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-1.5 px-3 rounded text-sm font-medium transition-colors flex justify-center items-center gap-1"
                                >
                                  <XCircle size={16} /> Reject
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'roster' && (
              <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h2 className="text-lg font-medium text-gray-900">Expanded Roster View</h2>
                <p className="mt-1">This page will include deep filtering, date-range selections, and export to CSV functionality.</p>
              </div>
            )}

            {currentTab === 'leaves' && (
              <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h2 className="text-lg font-medium text-gray-900">Leave Management</h2>
                <p className="mt-1">This page will show historical leave data, team calendars, and accrued balances.</p>
              </div>
            )}

          </div>
        </main>
      </div>
    );
  }

  // --- SUBCOMPONENTS ---

  interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    badge?: number;
  }

  function NavItem({ icon, label, active, onClick, badge }: NavItemProps) {
    return (
      <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
          active 
            ? 'bg-indigo-50 text-indigo-700' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          {label}
        </div>
        {badge !== undefined && badge > 0 && (
          <span className="bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded-full text-xs font-bold">
            {badge}
          </span>
        )}
      </button>
    );
  }

  interface StatCardProps {
    title: string;
    value: number | string;
    subtitle: string;
    color: 'blue' | 'green' | 'purple' | 'orange';
  }

  function StatCard({ title, value, subtitle, color }: StatCardProps) {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      green: 'bg-green-50 text-green-600 border-green-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-100',
      orange: 'bg-orange-50 text-orange-600 border-orange-100',
    };

    return (
      <div className={`p-5 rounded-xl border ${colors[color]} flex flex-col justify-between`}>
        <h3 className="text-sm font-medium text-gray-700 opacity-80">{title}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
        </div>
        <p className="text-xs mt-2 opacity-80 font-medium">{subtitle}</p>
      </div>
    );
  }

  function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
      "Present": "bg-green-100 text-green-700",
      "Late": "bg-orange-100 text-orange-700",
      "On Leave": "bg-purple-100 text-purple-700",
      "Absent": "bg-red-100 text-red-700",
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  }