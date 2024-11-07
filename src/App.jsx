import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (!user) {
    return <Navigate to='/login' replace={true} />;
  }
  return <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace={true} />} />

      <Route path='/login' element={<Login />} />

      {/* <Route element={<ProtectedRoute />}> */}
      <Route path='/home' element={<Home />} />
      {/* </Route> */}

      <Route path='*' element={<Navigate to='/home' replace={true} />} />
    </Routes>
  );
}

export default App;
