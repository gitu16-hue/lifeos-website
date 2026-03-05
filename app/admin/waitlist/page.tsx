// app/admin/waitlist/page.tsx
import dynamic from 'next/dynamic';

// Disable SSR for the entire dashboard
const DashboardClient = dynamic(
  () => import('./DashboardClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }
);

export default function AdminWaitlistPage() {
  return <DashboardClient />;
}