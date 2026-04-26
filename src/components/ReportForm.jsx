import {X,Camera,Check} from 'lucide-react';
import { useRef, useState } from 'react';
import {createPortal} from 'react-dom';
import CameraModal from './CameraModal';
const ReportForm = ({props})=>{
    const modalRef = useRef();

    const Close= (e)=>{
        if(e.target==modalRef.current){
            props();
        }
    }

    return createPortal(
        <div ref={modalRef} onClick={Close} className="fixed top-0 left-0 right-0 bottom-0 z-2147483647 bg-gray-300/30 backdrop-blur-sm flex flex-col justify-center items-center">
            <div className='flex flex-col w-1/2 h-1/2 xl:w-1/3'>

            <button className='place-self-end mb-0.5' onClick={props}><X size={30}/></button>
            <div className='bg-gray-800 rounded-xl '>
                <form className='flex flex-col'>
                    <textarea className='bg-gray-50 rounded-xl h-40 m-1 text-xl p-1 px-2' placeholder='Write the Emergency'></textarea>
                    <h3 className=' mb-1 text-2xl text-gray-400 text-center'>Emergency Rating:</h3>

                    <div className='m-2 flex flex-wrap text-white lg:justify-center gap-5 xl:justify-evenly'>
                        <label className='bg-red-600 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg gap-6'>
                            <input type='radio' name='intensity' value='Critical' className='accent-black size-4'/>Critical
                        </label>
                            
                        <label className='bg-orange-500 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>
                            <input type='radio' name='intensity' value='High' className='accent-black size-4'/>High
                        </label>  
                        
                        <label className='bg-amber-500 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>
                            <input type='radio' value='Moderate' name='intensity' className='accent-black size-4'/>Moderate
                        </label>
                        
                        <label className='bg-cyan-800 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>
                            <input type='radio' name='intensity' value='Low' className='accent-black size-4'/>Low
                        </label>
                        
                    </div>

                    <label className='flex gap-2 place-self-center p-2 bg-gray-50 rounded-2xl text-md items-center w-fit'><Camera />Upload Photo
                        <input type='file' capture='environment' accept='image/*' className='w-0' />
                    </label>
                    
                    

                    <button className='bg-red-500 m-2 p-2 text-xl text-white rounded-xl w-fit place-self-center' type="submit">Submit Report</button>

                    
                </form>
            </div>
            </div>
        </div>,
        document.body
    )
}
export default ReportForm;