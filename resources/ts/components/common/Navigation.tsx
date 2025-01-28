import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setLoginModalVisibility, logout } from '@/features/auth/authActions';
import { AppDispatch, RootState } from '@/store';

const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const tabs = useMemo(() => [
    { name: 'Dashboard', key: '', link: '/' },
    { name: 'Projects', key: 'projects', link: '/projects' },
    { name: 'All Tasks', key: 'all-tasks', link: '/all-tasks' },
    { name: 'Users', key: 'users', link: '/users' },
    { name: 'My Tasks', key: 'my-tasks', link: '/my-tasks' },
  ], []);

  const activeTab = location.pathname.split('/')[1];

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const openLoginModal = () => dispatch(setLoginModalVisibility(true));

  const handleLogout = () => dispatch(logout());

  return (
    <div className="bg-darkBlue text-white border-b-2 border-gray-500">
      <div className="flex items-center justify-between lg:max-w-[75%] p-4 lg:px-0 mx-auto w-full">
        <button className="lg:hidden" onClick={toggleMenu}>
          <span className="text-white">☰</span>
        </button>

        <div className="flex items-center justify-end lg:justify-between w-full">
          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-row w-full mt-4 lg:mt-0">
            {tabs.map(tab => (
              <Link
                key={tab.key}
                to={tab.link}
                className={`cursor-pointer text-lg font-medium block lg:w-auto text-center lg:text-left py-2 px-4 w-full ${
                  activeTab === tab.key ? 'border-b-2 border-blue' : ''
                }`}
              >
                { tab.name }
              </Link>
            ))}
          </div>

          {/* User Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center bg-transparent text-white border border-white rounded-full py-2 px-4 max-w-full"
            >
              <span className="flex-shrink-0 truncate">{ user && 'name' in user ? user.name : 'Guest' }</span>
              <span className="ml-4">&#9660;</span>
            </button>
            {user && (
              <div className="absolute top-[30px] right-0 bg-white text-black rounded-lg shadow-lg mt-2 group-hover:block hidden">
                <ul>
                  {/* <li className="py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-300">Profile</li> */}
                  <li className="py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-300" onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}

            {!user && (
              <div className="absolute top-[30px] right-0 bg-white text-black rounded-lg shadow-lg mt-2 group-hover:block hidden">
                <ul>
                  <li className="py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-300" onClick={openLoginModal}>Login</li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu Links */}
      <div className={`flex lg:hidden lg:flex-row flex-col w-full mt-4 ${isMenuOpen ? 'flex' : 'hidden'}`}>
        {tabs.map(tab => (
          <Link
            key={tab.key}
            to={tab.link}
            className={`cursor-pointer py-2 px-4 text-lg font-medium block w-full lg:w-auto text-center lg:text-left ${
              activeTab === tab.key ? 'border-b-2 border-blue' : ''
            }`}
          >
            { tab.name }
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;