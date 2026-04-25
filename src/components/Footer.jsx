import { useState } from "react"
import ReportForm from "./ReportForm"
import Reports from "./Reports"

const Footer = ()=>{
    const [reportModal, setReportModal] = useState(false)

    return(
        <div className="fixed bottom-0 flex justify-start items-start bg-gray-100 w-full overflow-auto p-2 rounded-2xl ml-2 mr-2 ">
            <button onClick={()=>setReportModal(true)} className="w-fit shrink-0 px-4 py-2 text-xl bg-red-700 text-white rounded-2xl active:scale-95">+Report Hazard</button>
            <div className="ml-2 mr-2 py-0.5 px-2 bg-gray-300 w-fit h-full border-l-2 border-gray-500 flex flex-wrap gap-2 items-center  overflow-auto">
                <Reports/>
                <Reports/>
                <Reports/>
                <Reports/>
                <Reports/>
                <Reports/>
            </div>
            {reportModal && <ReportForm props={()=> setReportModal(false)}/>}
        </div>
    )
}
export default Footer