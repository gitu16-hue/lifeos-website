// app/admin/waitlist/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

interface WaitlistEntry {
  id: number;
  email: string;
  name: string | null;
  user_type: string;
  source: string;
  created_at: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  metadata: {
    ip?: string;
    user_agent?: string;
    timestamp?: string;
    request_id?: string;
  } | null;
}

export default function WaitlistAdmin() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    professionals: 0,
    individuals: 0,
    enterprises: 0,
    students: 0
  });

  // Initialize Supabase client inside the component
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchWaitlist();
  }, []);

  async function fetchWaitlist() {
    setLoading(true);
    setError(null);
    
    try {
      const { data: entries, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      if (entries) {
        setEntries(entries);
        
        const today = new Date().toDateString();
        setStats({
          total: entries.length,
          today: entries.filter(e => new Date(e.created_at).toDateString() === today).length,
          professionals: entries.filter(e => e.user_type === 'professional').length,
          individuals: entries.filter(e => e.user_type === 'individual').length,
          enterprises: entries.filter(e => e.user_type === 'enterprise').length,
          students: entries.filter(e => e.user_type === 'student').length
        });
      }
    } catch (err: any) {
      console.error('Error fetching waitlist:', err);
      setError(err.message || 'Failed to load waitlist data');
    } finally {
      setLoading(false);
    }
  }

  async function exportToCSV() {
    try {
      const headers = ['ID', 'Email', 'Name', 'Type', 'Source', 'Date', 'IP', 'UTM Source', 'UTM Medium', 'UTM Campaign'];
      
      const csvData = entries.map(e => [
        e.id,
        e.email,
        e.name || '',
        e.user_type,
        e.source,
        new Date(e.created_at).toLocaleString(),
        e.metadata?.ip || '',
        e.utm_source || '',
        e.utm_medium || '',
        e.utm_campaign || ''
      ]);

      const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `waitlist-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Error exporting CSV:', err);
      setError('Failed to export data');
    }
  }

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      window.location.href = '/auth';
    } catch (err: any) {
      console.error('Error signing out:', err);
      setError('Failed to sign out');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchWaitlist}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Waitlist Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your waitlist signups</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-sm text-gray-500 font-medium">Total Signups</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-sm text-gray-500 font-medium">Today</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.today}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-sm text-gray-500 font-medium">Professionals</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.professionals}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-sm text-gray-500 font-medium">Individuals</h3>
            <p className="text-3xl font-bold text-green-600">{stats.individuals}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-sm text-gray-500 font-medium">Enterprises</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.enterprises}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-sm text-gray-500 font-medium">Students</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.students}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export to CSV
          </button>
          <button
            onClick={fetchWaitlist}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>

        {/* Waitlist Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTM Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{entry.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${entry.user_type === 'professional' ? 'bg-purple-100 text-purple-800' : ''}
                        ${entry.user_type === 'individual' ? 'bg-green-100 text-green-800' : ''}
                        ${entry.user_type === 'enterprise' ? 'bg-blue-100 text-blue-800' : ''}
                        ${entry.user_type === 'student' ? 'bg-yellow-100 text-yellow-800' : ''}
                      `}>
                        {entry.user_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.utm_source || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.metadata?.ip || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {entries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="mt-2 text-lg">No waitlist entries yet</p>
              <p className="text-sm">When people sign up, they'll appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}