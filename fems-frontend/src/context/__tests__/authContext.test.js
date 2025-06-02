
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import API from '../../services/api';

jest.mock('../../services/api');

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      <span>{user ? user.email : 'No user'}</span>
      <button onClick={() => login('test@email.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  it('should handle login and logout', async () => {
    API.post.mockResolvedValueOnce({
      data: { token: 'fake-token', user: { email: 'test@email.com' } }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('No user')).toBeInTheDocument();

    await act(async () => {
      screen.getByText('Login').click();
    });

    expect(API.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@email.com',
      password: 'password'
    });
    expect(screen.getByText('test@email.com')).toBeInTheDocument();

    await act(async () => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByText('No user')).toBeInTheDocument();
  });
});