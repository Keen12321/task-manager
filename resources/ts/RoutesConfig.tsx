import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import AllTasks from './pages/AllTasks';
import UserTasks from './pages/UserTasks';
import Users from './pages/Users';

// import TaskDetails from './pages/TaskDetails';
// import NotFound from './pages/NotFound';
// import ProtectedRoute from './components/ProtectedRoute';

const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/all-tasks" element={<AllTasks />} />
      <Route path="/my-tasks" element={<UserTasks />} />
      <Route path="/users" element={<Users />} />
      
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
