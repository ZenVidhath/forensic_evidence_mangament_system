import { useEffect, useState } from 'react';
import API from '../services/api';

export default function CustodyChain({ evidenceId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await API.get(`/custody/${evidenceId}`);
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [evidenceId]);

  if (loading) return <div>Loading custody chain...</div>;

  return (
    <div className="space-y-4">
      {logs.length === 0 ? (
        <p>No custody transfers recorded</p>
      ) : (
        <ul className="space-y-3">
          {logs.map((log, index) => (
            <li key={log._id} className="border-l-2 border-blue-500 pl-4 py-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {log.transferredBy.name} → {log.transferredTo.name}
                  </p>
                  <p className="text-sm text-gray-600">{log.location}</p>
                  {log.note && <p className="text-sm mt-1">Note: {log.note}</p>}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}