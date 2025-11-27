import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const defaultData = [
  {
    id: 1,
    report: "Product A",
    download_report: "Download",
    date: "2025-01-01",
  },
  {
    id: 2,
    report: "Product B",
    download_report: "Download",
    date: "2025-01-05",
  },
];

const History=()=>{
     const data = useMemo(() => defaultData, []);
      const columns = useMemo(
        () => [
          // columnHelper.accessor("id", {
          //   header: "ID",
          //   cell: (info) => info.getValue(),
          // }),
          columnHelper.accessor("report", {
            header: "Report",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("date", {
            header: "Date",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("download_report", {
            header: "Download Report",
            cell: (info) => (
              <span
                className={`px-2 py-1 rounded text-white cursor-pointer ${"bg-green-600"
                  }`}
              >
                {info.getValue()}
              </span>
            ),
          }),
    
        ],
        []
      );
    
      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
    
    return(
        <>
         <div className="lg:pt-0">
         
                <div className="lg:w-8/12 mx-auto border rounded-lg shadow p-4 mb-20">
                  <table className="w-full border-collapse">
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
                  </table>
                </div>
              </div>
        </>
    )
}
export default History