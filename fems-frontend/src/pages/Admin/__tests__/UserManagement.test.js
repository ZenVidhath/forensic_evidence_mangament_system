import { render, screen, waitFor } from '@testing-library/react';
import UserManagement from '../UserManagement';
import API from '../../../services/api';

jest.mock('../../../services/api');
jest.mock('../../../context/authContext', () => ({
  useAuth: () => ({ user: { role: 'admin' } })
}));

describe('UserManagement', () => {
  it('should fetch and display users', async () => {
    API.get.mockResolvedValueOnce({
      data: [
        { _id: '1', name: 'John Doe', email: 'john@test.com', role: 'admin' }
      ]
    });

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@test.com')).toBeInTheDocument();
    });
  });
});