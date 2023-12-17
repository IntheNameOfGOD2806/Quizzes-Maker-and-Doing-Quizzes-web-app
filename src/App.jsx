import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { ToastContainer } from 'react-toastify';
/**
 * The App component renders the main content of the application.
 *
 * @return {JSX.Element} The rendered component.
 */
const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <>
            <Outlet />
          </>
        </div>

<ToastContainer/>
      </div>




    </div>
  );
}
export default App;
