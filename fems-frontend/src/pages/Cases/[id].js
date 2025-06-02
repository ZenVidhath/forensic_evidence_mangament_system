import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import EvidenceList from '../../components/EvidenceList';

export default function CaseDetail() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const { data } = await API.get(`/cases/${id}`);
        setCaseData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [id]);

  if (loading) return <div>Loading case details...</div>;
  if (!caseData) return <div>Case not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{caseData.title}</h1>
            <p className="text-gray-600 mt-2">{caseData.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium 
            ${caseData.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
          >
            {caseData.status}
          </span>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h2 className="text-lg font-medium mb-4">Evidence</h2>
          <EvidenceList caseId={id} />
        </div>
      </div>

      <Link 
        to="/cases" 
        className="text-blue-600 hover:underline"
      >
        ← Back to Cases
      </Link>
    </div>
  );
}