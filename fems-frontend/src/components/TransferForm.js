import { useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function TransferForm({ evidenceId, onSuccess }) {
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [transferredTo, setTransferredTo] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/users');
        setUsers(data.filter(u => u._id !== user.userId));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/custody', {
        evidenceId,
        transferredTo,
        location,
        note
      });
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-medium">Transfer Evidence</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Transfer To</label>
        <select
          value={transferredTo}
          onChange={(e) => setTransferredTo(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Record Transfer'}
      </button>
    </form>
  );
}