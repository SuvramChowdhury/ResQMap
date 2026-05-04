import React from "react"
import { CircleArrowDown , CircleArrowUp} from "lucide-react"
import warningLogo from '../assets/warning.png'
const Reports = ()=>{
    return(
        <div className=" rounded-2xl px-2 bg-gray-800 border-4 border-gray-600 text-gray-200 w-full select-none h-full
        flex flex-col items-center 
        md:w-max md:h-full
         xl:items-start xl:gap-0">
            {/*Heading */}
            
                <div className="flex gap-1 xl:gap-4">
                    <img src={warningLogo}  alt="" className="h-6"/>
                    <h1 className="font-extrabold text-lg text-red-600"> Critical</h1>
                </div>
                {/*Report Description*/}
                <div className="text-sm text-gray-50 shrink-0">Lorem ipsum ducimus.</div>
            
            
            {/*Vote section */}
            <div className="flex gap-4">
              <div className="flex items-center">
                <CircleArrowUp size={15} color="lightgreen"/><span className="text-sm text-green-400">12</span>
              </div>
              <div className="flex items-center">
                <CircleArrowDown size={15} color="red"/><span className="text-sm text-red-500">10</span>
              </div>
            </div>
            <div className="text-sm shrink-0">1hr ago</div>
            
        </div>
    )
}
export default Reports