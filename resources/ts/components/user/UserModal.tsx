import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  ErrorComponent from '../common/Error';
import { UserPayload } from '@/features/user/userTypes';
import { createUser, setUserModalVisibility } from '@/features/user/userActions';
import { AppDispatch, RootState } from '@/store';

const CreateUserModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isUserModalVisible = useSelector((state: RootState) => state.user.isUserModalVisible);

  useEffect(() => {
    if (error) {
      setName(name);
      setEmail(email);
      setPassword(password);
      setConfirmPassword(confirmPassword);
    }
  }, [error]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData: UserPayload = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };
    
    try {
      setIsLoading(true);
      setError(null)

      await dispatch(createUser(userData));

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  const closeModal = () => dispatch(setUserModalVisibility(false));

  if (!isUserModalVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full sm:w-96 text-gray-600 text-sm block">
        <h2 className="text-xl font-semibold border-b-2 border-gray-400 px-6 py-4">Create New User</h2>
        <div className="px-6 py-4">
          { <ErrorComponent errorMessage={error} /> }

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
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
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
