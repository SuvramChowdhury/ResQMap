import { useContext, useMemo } from "react";
import Reports from "./Reports";
import { ReportData } from "../App";
import { timeAgo } from "../utils/timeAgo";

const RecentReport = () => {
  const { reports = [], isLoading, isError } = useContext(ReportData);

  const sortedReports = useMemo(() => {
    return [...reports].sort(
      (a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)
    );
  }, [reports]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-3/4 bg-red-600 rounded-r-xl">
        <p className="text-white font-semibold">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center w-full h-3/4 bg-red-600 rounded-r-xl">
        <p className="text-white font-semibold">Failed to load reports.</p>
      </div>
    );

  if (sortedReports.length === 0)
    return (
      <div className="flex items-center justify-center w-full h-3/4 bg-red-600 rounded-r-xl">
        <p className="text-white font-semibold">No recent reports.</p>
      </div>
    );

  return (
    <div className="py-0.5 px-2 bg-red-600 w-full h-3/4
      flex flex-row gap-2 items-center justify-start overflow-auto font-semibold
      md:text-lg md:h-full md:overflow-auto flex-wrap lg:h-full lg:overflow-x-auto">
      {sortedReports.map((report) => (
        <Reports
          key={report.id}
          description={report.description}
          intensity={report.intensity}
          upvotes={report.upvotes}
          downvotes={report.downvotes}
          createdAt={timeAgo(report.createdAt)}
        />
      ))}
    </div>
  );
};

export default RecentReport;