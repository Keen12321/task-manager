import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../Error';
import { LoginPayload } from '@/features/auth/authTypes';
import { login, setLoginModalVisibility } from '@/features/auth/authActions';
import { setUserModalVisibility } from '@/features/user/userActions';
import { AppDispatch, RootState } from '@/store';

const LoginModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const isLoginModalVisible = useSelector((state: RootState) => state.auth.isLoginModalVisible);
  const loginError = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    if (!isLoginModalVisible) {
      setEmail('');
      setPassword('');
    }
  }, [isLoginModalVisible]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userData: LoginPayload = {
      email,
      password,
    };
    
    dispatch(login(userData));
  };

  const closeModal = () => dispatch(setLoginModalVisibility(false));

  const openRegisterModal = () => {
    dispatch(setLoginModalVisibility(false));
    dispatch(setUserModalVisibility(true));
  };

  if (!isLoginModalVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full sm:w-96 text-gray-600 text-sm block">
        <h2 className="text-xl font-semibold border-b-2 border-gray-400 px-6 py-4">Login</h2>
        <div className="px-6 py-4">
          { loginError && <Error errorMessage={loginError} /> }

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="font-medium">Email</label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="font-medium">Password</label>
              <input
                id="password"
                type="password"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="cursor-pointer hover:underline text-blue" onClick={openRegisterModal}>Register</span>
              <div className="flex justify-end py-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 mx-2 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
                  onClick={closeModal}
                >
              Close
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  { isLoading ? 'Logging In' : 'Login' }
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
