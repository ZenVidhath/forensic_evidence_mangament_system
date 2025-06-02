import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function EvidenceList({ caseId }) {
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const { data } = await API.get(`/evidence?caseId=${caseId}`);
        setEvidence(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, [caseId]);

  const handleAssign = async (evidenceId, technicianId) => {
    try {
      await API.patch(`/evidence/${evidenceId}`, { 
        assignedTo: technicianId,
        status: 'assigned' 
      });
      setEvidence(evidence.map(item => 
        item._id === evidenceId ? { ...item, assignedTo: technicianId } : item
      ));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading evidence...</div>;

  return (
    <div className="space-y-4">
      {evidence.map((item) => (
        <div key={item._id} className="border rounded-lg p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{item.type}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full 
              ${item.status === 'collected' ? 'bg-blue-100 text-blue-800' :
                item.status === 'analyzed' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'}`}
            >
              {item.status}
            </span>
          </div>

          {user?.role === 'officer' && (
            <div className="mt-3">
              <select
                value={item.assignedTo || ''}
                onChange={(e) => handleAssign(item._id, e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="">Assign to technician</option>
                {user.technicians?.map(tech => (
                  <option key={tech._id} value={tech._id}>
                    {tech.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}