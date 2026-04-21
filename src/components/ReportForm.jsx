import {X} from 'lucide-react';
import { useRef } from 'react';

const ReportForm = ({props})=>{
    console.log(props)
    const modalRef = useRef();

    const Close= (e)=>{
        if(e.target==modalRef.current){
            props();
        }
    }

    return(
        <div ref={modalRef} onClick={Close} className="fixed inset-0 bg-gray-300/30 backdrop-blur-sm flex flex-col justify-center items-center">
            <div className='flex flex-col w-1/3 h-1/2'>

            <button className='place-self-end mb-0.5' onClick={props}><X size={30}/></button>
            <div className='bg-gray-800 rounded-xl h-full overflow-auto '>
                <form className='flex flex-col h-full'>
                    <textarea className='bg-cyan-400 rounded-xl h-2/3 m-1'></textarea>
                    <h3 className=' mb-1 text-2xl text-gray-400 text-center'>Emergency Rating:</h3>

                    <div className='m-2 flex justify-evenly text-white'>
                        <button className='bg-red-700 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>Critical</button>
                        <button className='bg-orange-700 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>High</button>
                        <button className='bg-amber-500 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>Moderate</button>
                        <button className='bg-cyan-800 active:scale-75 p-2 rounded-2xl font-medium font-mono text-lg'>Low</button>
                    </div>
                    
                </form>
            </div>
            </div>
        </div>
    )
}
export default ReportForm;