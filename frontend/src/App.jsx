import React from 'react'
import './App.css'
import InputFields from './components/InputFields'
import DynamicFields from './components/DynamicFields'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom';
import Forms from './components/Forms'
import FormDetails from './components/FormDetails'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<InputFields />}>
        <Route index element={<DynamicFields />} />
      </Route>

      <Route path="/showForms" element={<Forms />} />
      <Route path="/form/:id/:index" element={<FormDetails />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    
    <ToastContainer />
    </>
  )
}

export default App
