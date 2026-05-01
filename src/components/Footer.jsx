import { useState } from "react";
import ReportForm from "./ReportForm";
import Reports from "./Reports";
import { createPortal } from "react-dom";
import { Plus } from "lucide-react";

const Footer = ({ coords }) => {
  const [reportModal, setReportModal] = useState(false);
  const [presentTab,setPresentTab]= useState('Nearby');

  return createPortal(
    <div className="font-[Outfit] fixed bottom-0 z-2147483646 flex flex-col justify-start items-center gap-2 bg-amber-50 w-[98%] h-45 p-2 mx-4  rounded-2xl lg:flex-row lg:h-25 lg:items-center lg:gap-3 xl:items-center xl:gap-4 ">
      
      {/*Add Report button */}
      <button
        onClick={() => setReportModal(true)}
        className="w-fit shrink-0 px-4 py-2 text-xl bg-red-700 text-white rounded-2xl active:scale-95 flex items-center font-bold"
      >
        <Plus />
        Report Hazard
      </button>

      <div className="flex flex-col w-full h-full justify-start lg:w-fit lg:flex-row">

        <div className="flex flex-row justify-center w-full h-1/3 lg:h-full lg:w-30 lg:flex-col border-gray-500 md:border-l-2 ">
          <button onClick={()=> setPresentTab('Nearby')} className="bg-amber-200 text-lg h-full lg:h-1/2 py-1 w-full text-cyan-800">Nearby</button>
          <button onClick={()=> setPresentTab('Recent')} className="bg-amber-100 text-lg h-full lg:h-1/2 w-full py-1 text-cyan-800">Recent</button>
        </div>

        {/*reports display */}
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
      </div>

      {reportModal && (
        <ReportForm onClose={() => setReportModal(false)} coords={coords} />
      )}
    </div>,
    document.body,
  );
};

export default Footer;
