import {X,Camera,Check} from 'lucide-react';
import { useRef, useState } from 'react';
import { createPortal } from "react-dom";
import CameraModal from './CameraModal';
const ReportForm = ({props})=>{
    const [camera, showCamera]= useState(false)
    const [showCheck, setShowCheck]= useState(false);
    const modalRef = useRef();

    const Close= (e)=>{
        if(e.target==modalRef.current){
            props();
        }
    }

    return createPortal(
        <div ref={modalRef} onClick={Close} className="fixed top-0 left-0 right-0 bottom-0 z-2147483647 bg-gray-300/30 backdrop-blur-sm flex flex-col justify-center items-center">
            <div className='flex flex-col w-1/3 h-1/2'>

            <button className='place-self-end mb-0.5' onClick={props}><X size={30}/></button>
            <div className='bg-gray-800 rounded-xl h-full '>
                <form className='flex flex-col overflow-auto scrollbar-hide'>
                    <textarea className='bg-gray-50 rounded-xl h-40 m-1 text-xl p-1 px-2' placeholder='Write the Emergency'></textarea>
                    <h3 className=' mb-1 text-2xl text-gray-400 text-center'>Emergency Rating:</h3>

                    <div className='m-2 flex justify-evenly text-white'>
                        <button type='button' className='bg-red-700 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>Critical</button>
                        <button type='button' className='bg-orange-700 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>High</button>
                        <button type='button' className='bg-amber-500 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>Moderate</button>
                        <button type='button' className='bg-cyan-800 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>Low</button>
                    </div>

                    <button onClick={()=>showCamera(true)} type='button' className='flex gap-2 place-self-center p-2 bg-gray-50 rounded-2xl text-md items-center'><Camera /> Upload Photo {showCheck && <Check size={20} />}</button>

                    <button className='bg-red-500 m-2 p-2 text-xl text-white rounded-xl w-fit place-self-center' type="submit">Submit Report</button>

                    {camera && <CameraModal />}
                </form>
            </div>
            </div>
        </div>,
        document.body
    )
}
export default ReportForm;