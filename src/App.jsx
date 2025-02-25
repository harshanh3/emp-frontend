import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Employeeform from './pages/Employeeform'
import Auth from './pages/Auth'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './contexts/AuthContextAPI'
import Pnf from './pages/Pnf'
import EditEmployee from './pages/EditEmployee'



function App() {
 const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setIsAuthorised(true)
  }else{
    setIsAuthorised(false)
  }
},[isAuthorised])
console.log(isAuthorised);

  return (
    <>
    <Routes>
 {
  isAuthorised && 

    <>
      
      <Route path='/dashboard' element={ <Dashboard/>}/>
      <Route path='/employeeform' element={ <Employeeform/>}/>
      <Route path="/edit-employee/:id" element={<EditEmployee />} />

    </>
 }


      <Route path='/' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister={true}/>}/>
      <Route path='/*' element={Pnf}/>
    </Routes>
 
    </>
  )
}

export default App
