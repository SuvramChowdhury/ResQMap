import React from 'react'
import Reports from './Reports';
const NearbyReports = ()=>{
    return(
        <div className=" py-0.5 px-2 bg-amber-200 w-full h-2/3
       flex flex-row gap-2 items-center justify-start rounded-r-xl overflow-scroll font-semibold
        md:text-lg md:h-full
        lg:flex-wrap lg:h-full lg:overflow-x-auto">
          <Reports />
          <Reports />
          <Reports />
          <Reports />
          <Reports />
          <Reports />
          <Reports />
          <Reports />
          <Reports />
        </div>
    )
}

export default NearbyReports;