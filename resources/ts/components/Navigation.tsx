import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { login, logout } from '../features/user/userActions';
import LoginModal from './LoginModal';
import { LoginPayload } from '../features/user/userTypes';

const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [activeTab, setActiveTab] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setActiveTab(path);
  }, [location.pathname]); 

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const tabs = [
    { name: 'Dashboard', key: '', link: '/' },
    { name: 'Projects', key: 'projects', link: '/projects' },
    { name: 'All Tasks', key: 'all-tasks', link: '/all-tasks' },
    { name: 'Users', key: 'users', link: '/users' },
    { name: 'My Tasks', key: 'my-tasks', link: '/my-tasks' }
  ];
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLogin = async (loginData: LoginPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(login(loginData));
      setIsLoading(false);
      closeLoginModal();
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-darkBlue text-white border-b-2 border-gray-500">
      <div className="flex items-center justify-between lg:max-w-[75%] p-4 lg:px-0 mx-auto w-full">
        <button className="lg:hidden" onClick={toggleMenu}>
          <span className="text-white">☰</span>
        </button>

        <div className="flex items-center justify-end lg:justify-between w-full">
          <div
            className="hidden lg:flex flex-row w-full mt-4 lg:mt-0"
          >
            {tabs.map(tab => (
              <Link
                key={tab.key}
                to={tab.link}
                className={`cursor-pointer text-lg font-medium block lg:w-auto text-center lg:text-left py-2 px-4 w-full ${
                  activeTab === tab.key ? 'border-b-2 border-blue-500' : ''
                }`}
              >
                { tab.name }
              </Link>
            ))}
          </div>
          <div className="relative group">
            <button
              className="flex bg-transparent text-white border border-white rounded-full py-2 px-4"
            >
              <span className="flex-shrink-0">{ currentUser ? currentUser.name : 'Guest' }</span>
              <span className="ml-4">&#9660;</span>
            </button>
            {currentUser && (
              <div className="absolute top-[30px] right-0 bg-white text-black rounded-lg shadow-lg mt-2 group-hover:block hidden">
                <ul>
                  <li className="py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-300">Profile</li>
                  <li className="py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-300" onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}

            {!currentUser && (
              <div className="absolute top-[30px] right-0 bg-white text-black rounded-lg shadow-lg mt-2 group-hover:block hidden">
                <ul>
                  <li className="py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-300" onClick={openLoginModal}>Login</li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>

      <div
        className={`flex lg:flex-row flex-col w-full mt-4 ${isMenuOpen ? 'flex' : 'hidden'}`}
      >
        {tabs.map(tab => (
          <Link
            key={tab.key}
            to={tab.link}
            className={`cursor-pointer py-2 px-4 text-lg font-medium block w-full lg:w-auto text-center lg:text-left ${
              activeTab === tab.key ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            { tab.name }
          </Link>
        ))}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        isLoading={isLoading}
        onClose={closeLoginModal}
        error={error}
        onSubmit={handleLogin}
      />
    </div>


  );
};

export default Navigation;