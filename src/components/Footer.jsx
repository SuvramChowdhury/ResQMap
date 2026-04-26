import { useState } from "react"
import ReportForm from "./ReportForm"
import Reports from "./Reports"
import {createPortal} from 'react-dom';
import {Plus} from 'lucide-react';
const Footer = ()=>{
    const [reportModal, setReportModal] = useState(false)

    return createPortal(
        <div className="font-[Outfit] fixed bottom-0 z-2147483647 flex flex-col justify-start items-center bg-amber-50 w-full overflow-auto p-2 rounded-2xl mx-2 lg:flex-row lg:items-center xl:items-start ">

            <button onClick={()=>setReportModal(true)} className="w-fit shrink-0 px-4 py-2 text-xl bg-red-700 text-white rounded-2xl active:scale-95 flex items-center font-bold"><Plus/>Report Hazard</button>

            <div className=" mr-2 py-0.5 px-2 bg-amber-100 w-fit h-full border-gray-500 flex flex-wrap gap-2 items-center rounded-r-xl overflow-auto md:ml-2 md:border-l-2 font-semibold md:text-lg">
                <Reports/>
                <Reports/>
                <Reports/>
                <Reports/>
                <Reports/>
                <Reports/>
            </div>
            {reportModal && <ReportForm props={()=> setReportModal(false)}/>}
        </div>,
        document.body
    )
}
export default Footer