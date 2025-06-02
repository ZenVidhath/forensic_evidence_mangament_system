import { useEffect, useState } from 'react';
import API from '../services/api';
import { BarChart, PieChart } from '../components/Charts';

export default function Dashboard() {
  const [stats, setStats] = useState({
    caseCount: 0,
    openCases: 0,
    evidenceCount: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Total Cases</h3>
          <p className="text-3xl font-bold">{stats.caseCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Open Cases</h3>
          <p className="text-3xl font-bold">{stats.openCases}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Evidence Items</h3>
          <p className="text-3xl font-bold">{stats.evidenceCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-4">Case Status</h3>
          <PieChart data={stats.caseStatusData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-4">Evidence Analysis</h3>
          <BarChart data={stats.evidenceStatusData} />
        </div>
      </div>
    </div>
  );
}