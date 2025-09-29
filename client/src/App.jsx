import './App.css'
import { Routes, Route } from "react-router-dom";
import AdminRoutes from './routes/AdminRoutes';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminAddProduct from './pages/Admin/AdminAddProduct';


function App() {
  return (
    <div className='min-h-screen min-w-screen dark:bg-black dark:text-white'>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/register' element={<AdminRegister/>}/>

        <Route path='/admin' element={<AdminRoutes/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path='/admin/add-product' element={<AdminAddProduct/>}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App
