import React from "react"
import { CircleArrowDown , CircleArrowUp} from "lucide-react"
import warningLogo from '../assets/warning.png'
import { useContext } from "react"

const severityStyle = {
  Critical: { color: "#ff4d4f" },
  High: { color: "#ff4d4f" },
  Medium: { color: "#fbbf24" },
  Low: { color: "#4ade80" },
};
const Reports = ({id,description,intensity,upvote,downvote,createdAt})=>{
  console.log(intensity)
  const sev = severityStyle[intensity] || severityStyle.Medium;

    return(
        <div className=" rounded-2xl px-2 bg-gray-800 border-4 border-gray-600 text-gray-200 w-full select-none h-full
        flex flex-row items-center justify-center gap-6
        md:w-max md:h-full md:gap-2
        xl:gap-4">
            {/*Heading */}
            
                <div className="flex gap-1 xl:gap-4">
                    <img src={warningLogo}  alt="" className="h-6"/>
                    <h1 className="font-extrabold text-xl" style={{color:sev.color}}>{intensity}</h1>
                </div>
                {/*Report Description*/}
                <div className="text-lg text-gray-50 shrink-0">{description}</div>
            
            
            {/*Vote section */}
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <CircleArrowUp size={15} color="lightgreen"/><span className="text-lg text-green-400">{upvote?? 0}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CircleArrowDown size={15} color="red"/><span className="text-lg text-red-500">{downvote?? 0}</span>
              </div>
            </div>
            <div className="text-sm shrink-0">{createdAt}</div>
            
        </div>
    )
}
export default Reports