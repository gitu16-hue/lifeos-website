// app/admin/waitlist/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Only keep 'force-dynamic', remove 'revalidate'
export const dynamic = 'force-dynamic';

// ... rest of your component code

// Initialize Supabase client with error handling
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ... rest of your component code remains the same

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
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    professionals: 0,
    individuals: 0,
    enterprises: 0,
    students: 0
  });

  useEffect(() => {
    fetchWaitlist();
  }, []);

  async function fetchWaitlist() {
    setLoading(true);
    
    const { data: entries, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching waitlist:', error);
      setLoading(false);
      return;
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

    setLoading(false);
  }

  async function exportToCSV() {
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
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Waitlist Admin Dashboard</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Signups</h3>
          <p className="text-3xl font-bold">{stats.total.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Today</h3>
          <p className="text-3xl font-bold">{stats.today}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Professionals</h3>
          <p className="text-3xl font-bold">{stats.professionals}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Individuals</h3>
          <p className="text-3xl font-bold">{stats.individuals}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Enterprises</h3>
          <p className="text-3xl font-bold">{stats.enterprises}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Students</h3>
          <p className="text-3xl font-bold">{stats.students}</p>
        </div>
      </div>

      {/* Export Button */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export to CSV
        </button>
        <button
          onClick={fetchWaitlist}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
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
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.email}</td>
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
          <div className="text-center py-8 text-gray-500">
            No waitlist entries yet
          </div>
        )}
      </div>
    </div>
  );
}