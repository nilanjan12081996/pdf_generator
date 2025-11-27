import {  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../reducers/GenaretePdfSlice";
import TanstackReactTable from "../../data-table/TanstackReactTable"
import CustomPagination from "../../data-table/CustomPagination";





const History=()=>{
    const{allHist}=useSelector((state)=>state?.generatePdf)
   const dispatch = useDispatch();
    const columnHelper = createColumnHelper();
      const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10
  });
  useEffect(()=>{
    dispatch(getHistory({
        page:currentPage,
        limit:pageSize
    })).unwrap().then((res)=>{
        console.log("respagination",res);
        
        if(res?.status_code===200){
            const p = res.data?.pagination;
            setPaginationData({
            total: p.totalCount,
          pages: p.totalPages,
          page: p.currentPage,
          limit: p.pageSize,
            });
        }
    })
  },[dispatch,currentPage, pageSize])

    const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  };

  const formatDate = (isoString) => {
  // Simple format: YYYY-MM-DD HH:mm (24h)
  const d = new Date(isoString);
  return isNaN(d)
    ? ""
    : `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, "0")}-${String(d.getDate()).padStart(2,"0")} `
      + `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
};

  const columns = useMemo(() => [
 

    columnHelper.accessor("created_at", {
      cell: (info) => <span>{formatDate(info.getValue())}</span>,
      header: "Date",
    }),

 

   columnHelper.accessor("download_url", {
  header: "Download Report",
  cell: (info) => (
    // <span className="px-2 py-1 rounded text-white cursor-pointer bg-green-600">
    //   Download
    // </span>
    <a
      href={info.getValue()}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="px-2 py-1 rounded text-white cursor-pointer bg-green-600"
      style={{ textDecoration: "none" }}
    >
      Download
    </a>
  ),
})

  ]);
    return(
        <>
         <div className="lg:pt-0">
         
                <div className="lg:w-8/12 mx-auto border rounded-lg shadow p-4 mb-20">
                     <TanstackReactTable data={allHist} columns={columns} manualPagination={true}/>
           <CustomPagination
          currentPage={paginationData.page}
          totalPages={paginationData.pages}
          onPageChange={handlePageChange}
          pageSize={paginationData.limit}
          onPageSizeChange={handlePageSizeChange}
          totalItems={paginationData.total}
        />
                </div>
              </div>
        </>
    )
}
export default History