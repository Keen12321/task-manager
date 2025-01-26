import { useState, useEffect } from 'react';
import { CreateUserModalProps, UserPayload } from '../../features/user/userTypes';

const CreateUserModal = ({ isOpen, isLoading, error, onClose, onSubmit }: CreateUserModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (error) {
      setName(name);
      setEmail(email);
      setPassword(password);
      setConfirmPassword(confirmPassword);
    }
  }, [error]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData: UserPayload = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };
    
    onSubmit(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full sm:w-96 text-gray-600 text-sm block">
        <h2 className="text-xl font-semibold border-b-2 border-gray-400 px-6 py-4">Create New User</h2>
        <div className="px-6 py-4">

          {error && <div className="text-red-500 mb-4">{ error }</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="font-medium">Name</label>
              <input
                id="name"
                type="text"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="font-medium">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="font-medium">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between py-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              >
                { isLoading ? 'Creating...' : 'Create User' }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
