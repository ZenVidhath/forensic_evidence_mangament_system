import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import CustodyChain from '../../components/CustodyChain';

export default function EvidenceDetail() {
  const { id } = useParams();
  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const { data } = await API.get(`/evidence/${id}`);
        setEvidence(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, [id]);

  if (loading) return <div>Loading evidence details...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">{evidence.type}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Details</h2>
            <p className="mb-2"><span className="font-medium">Status:</span> {evidence.status}</p>
            <p className="mb-2"><span className="font-medium">Description:</span> {evidence.description}</p>
            {evidence.assignedTo && (
              <p><span className="font-medium">Assigned To:</span> {evidence.assignedTo.name}</p>
            )}
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Custody Chain</h2>
            <CustodyChain evidenceId={id} />
          </div>
        </div>
      </div>
      <Link to={`/cases/${evidence.caseId}`} className="text-blue-600 hover:underline">
        ← Back to Case
      </Link>
    </div>
  );
}