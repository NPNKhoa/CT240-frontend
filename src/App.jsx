
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

import { isEmpty } from 'lodash'
// import ConfirmOrder from './pages/ConfirmOrder/ConfirmOrder'

function App() {
  const ProtectedRoute = () => {
    const item = JSON.parse(localStorage.getItem('cartItems'))
    if (isEmpty(item)) {
      return (
        <Navigate to="/" replace={true} />
      )
    }
    return (
      <Outlet />
    )
  }
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}

      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />

    </Routes>
  )
}

export default App
