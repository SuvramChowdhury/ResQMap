import Navbar from './components/Navbar.jsx'
import Navbar2 from './components/Navbar2.jsx'
import Map from './components/Map.jsx'
import Footer from './components/Footer.jsx'
import { useState } from 'react'
import ReportForm from './components/ReportForm.jsx'
const App=()=>{
  

  return(
    <div className='h-screen'>
      <Navbar/>
      <Navbar2/>
      <Map/>
      <Footer/>

    </div>
  )
}
export default App