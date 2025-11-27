import {  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../reducers/GenaretePdfSlice";





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
        if(res?.status_code===200){
            setPaginationData(res.pagination);
        }
    })
  },[dispatch,currentPage, pageSize])

  const columns = useMemo(() => [
 

    columnHelper.accessor("created_at", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Date",
    }),

 

    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Phone",
    }),

   


   



  ]);
    return(
        <>
         <div className="lg:pt-0">
         
                <div className="lg:w-8/12 mx-auto border rounded-lg shadow p-4 mb-20">
                  {/* <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className="border p-3 text-left font-semibold"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
        
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b hover:bg-gray-50">
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="p-3 border">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                </div>
              </div>
        </>
    )
}
export default History