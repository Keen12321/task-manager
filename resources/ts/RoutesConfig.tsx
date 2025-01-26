import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import AllTasks from './pages/AllTasks';
import Users from './pages/Users';
import UserTasks from './pages/UserTasks';

// import TaskDetails from './pages/TaskDetails';
// import NotFound from './pages/NotFound';
// import ProtectedRoute from './components/ProtectedRoute';

const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/all-tasks" element={<AllTasks />} />
      <Route path="/users" element={<Users />} />
      <Route path="/my-tasks" element={<UserTasks />} />
      
      {/* Protected routes (only accessible if authenticated) */}
      {/* <Route 
        path="/task/:id" 
        element={
          // <ProtectedRoute>
          //   <TaskDetails />
          // </ProtectedRoute>
      //   }
      /> */}

      {/* Catch-all route for 404 page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default RoutesConfig;
