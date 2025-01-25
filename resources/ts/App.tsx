import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/Navigation'
import RoutesConfig from './RoutesConfig';
import store from './store';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="w-screen h-screen">
          <ToastContainer position="bottom-right" newestOnTop />
          <Navigation />
          <RoutesConfig />
        </div>
      </Router>
    </Provider>
  )
}

export default App
