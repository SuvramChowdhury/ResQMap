import Navbar from './components/Navbar.jsx'
import Map from './components/Map.jsx'
import Footer from './components/Footer.jsx'
import { useState } from 'react'
import ReportForm from './components/ReportForm.jsx'
const App=()=>{
  const [showModal, setShowModal]= useState(false)

  return(
    <div className='h-screen'>
      <Navbar/>
      <Map/>
      <Footer/>
      {showModal && <ReportForm />}
    </div>
  )
}
export default App