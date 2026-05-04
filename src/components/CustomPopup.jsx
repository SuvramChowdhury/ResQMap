import React from "react";
import { CircleArrowUp, CircleArrowDown } from "lucide-react";
import warningLogo from '../assets/warning.png'
const CustomPopup = ()=>{
  return(
    <div className="max-w-60 flex flex-col items-start justify-around gap-2 ">
            {/*Heading */}
            <div className="flex gap-4">
              <img src={warningLogo}  alt="" className="h-6 "/>
              <h1 className="font-bold text-lg text-gray-200">Severity: Critical</h1>
            </div>

            {/*Hazard Image */}
            <div className="flex justify-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7yz0R2b4Duc5X8fdGL0F-I_rs6C7jjtft8Q&s"alt="hazardImage" className="h-30 w-60" />
            </div>
            {/*Report Description*/}
            <div className="text-gray-50">Lorem ipsum dolor sit amet consectetur, ducimus.</div>
          
            {/*Vote section */}
            <div className="flex gap-4">
              <div className="flex items-center">
                <CircleArrowUp color="lightgreen" /><span className="text-green-200">12</span>
              </div>
              <div className="flex items-center">
                <CircleArrowDown color="red" /><span className="text-red-500">10</span>
              </div>
            </div>

            <div className="text-gray-300">Posted 1hr ago</div>
          </div> 
  )
}
export default CustomPopup;
