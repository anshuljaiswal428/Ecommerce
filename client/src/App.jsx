import './App.css'
import { Routes, Route } from "react-router-dom";
import AdminRoutes from './routes/AdminRoutes';
import AdminLogin from './pages/Admin/AdminLogin';


function App() {
  return (
    <div className='min-h-screen min-w-screen dark:bg-black dark:text-white'>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin' element={<AdminRoutes/>}>
          <Route path=''/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
