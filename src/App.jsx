
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Employeeform from './pages/Employeeform'
import Auth from './pages/Auth'



function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister={true}/>}/>
      <Route path='/employeeform' element={<Employeeform/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

    </Routes>
 
    </>
  )
}

export default App
