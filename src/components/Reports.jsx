import React from "react"
import { ThumbsDown , ThumbsUp} from "lucide-react"
import warningLogo from '../assets/warning.png'
import { useContext } from "react"

const severityStyle = {
  Critical: { color: "#ff4d4f" },
  High: { color: "#ff4d4f" },
  Medium: { color: "#fbbf24" },
  Low: { color: "#4ade80" },
};
const Reports = ({description,intensity,upvotes,downvotes,createdAt})=>{
  console.log(intensity)
  const sev = severityStyle[intensity] || severityStyle.Medium;
  console.log(upvotes)
    return(
        <div className=" rounded-2xl px-2 bg-gray-900 border-4 border-gray-300 text-gray-200 w-full select-none h-full
        flex flex-row items-center justify-center gap-6
        md:w-max md:h-full md:gap-2
        xl:gap-3">
            {/*Heading */}
            
                <div className="flex gap-1 xl:gap-4">
                    <img src={warningLogo}  alt="" className="h-6"/>
                    <h1 className="font-extrabold text-lg md:text-xl" style={{color:sev.color}}>{intensity}</h1>
                </div>
                {/*Report Description*/}
                <div className="text-sm md:text-lg text-gray-50 shrink-0">{description}</div>
            
            
            {/*Vote section */}
            <div className="flex gap-1 md:gap-2">
              <div className="flex items-center gap-1.5">
                <ThumbsUp size={15} color="lightgreen"/><span className="text-sm md:text-lg text-green-400">{upvotes?? 0}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ThumbsDown size={15} color="red"/><span className="text-sm md:text-lg text-red-500">{downvotes?? 0}</span>
                
              </div>
            </div>
            <div className="text-sm md:text-lg shrink-0">{createdAt}</div>
            
        </div>
    )
}
export default Reports