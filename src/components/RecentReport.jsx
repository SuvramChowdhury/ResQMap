import React, {useContext, useMemo} from 'react'
import Reports from './Reports';
import { ReportData } from '../App';

const timeAgo = (ts) => {
  if (!ts?.toMillis) return "Just now";
  const s = Math.floor((Date.now() - ts.toMillis()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
};


const RecentReport = ()=>{
    const { reports=[], isLoading, isError } = useContext(ReportData)
    const sortedReports = useMemo(() => {
        return [...reports].sort(
            (a, b) => b.createdAt - a.createdAt
        )
    }, [reports])
    return(
        <div className=" py-0.5 px-2 bg-red-600 w-full h-3/4
       flex flex-row gap-2 items-center justify-start rounded-r-xl overflow-auto font-semibold
        md:text-lg md:h-full md:overflow-auto
        flex-wrap lg:h-full lg:overflow-x-auto">
          {sortedReports.map((report)=>(
                <Reports 
                    key={report.id}
                    description ={report.description}
                    intensity= {report.intensity}
                    upvotes={report.upvotes}
                    downvotes= {report.downvotes}
                    createdAt={timeAgo(report.createdAt)} />
            ))}
        </div>
    )
}

export default RecentReport;