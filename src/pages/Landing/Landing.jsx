import {
  Avatar,
  Accordion,
  Select,
  FileInput,
  Radio,
  Label,
  TextInput,
Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow
} from "flowbite-react";
import React, { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import { BsArrowDown } from "../../assets/icons";

import { leftArrow, logoMain, rightArrow } from "../../assets/images/images";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";


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

const Landing = () => {

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
            className={`px-2 py-1 rounded text-white cursor-pointer ${
               "bg-green-600"
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
  return (
    <>
    
   
    <div className="lg:pt-0">
      {/* <div className="bg-[#f9f9f9] mb-6 border-t border-[#c7c7c7] border-b py-3">
        <div className="lg:flex justify-center items-center gap-2 text-center px-4 lg:px-0">
          <img
            src={logoMain}
            alt="logoMain"
            className="w-[32px] inline-block"
          />
          <p className="lg:text-[21px] font-semibold">
            <span className="font-bold">Automate</span> The Creation Of Your
            Print-On-Demand Products
          </p>
        </div>
      </div> */}
      {/* <div className="bg-[#f9f9f9] lg:w-8/12 mx-auto p-4 rounded-md border border-[#c7c7c7] mb-10">
        <div className="lg:flex items-center gap-3">
          <Select className="lg:w-8/12 mb-2 lg:mb-0">
            <option>Select Store</option>
          </Select>
      
        </div>
      </div> */}
      <div className="bg-[#f9f9f9] lg:w-8/12 mx-auto p-4 rounded-md border border-[#c7c7c7] mb-8 lg:mb-20">
        <h2 className="text-base font-semibold pb-4 text-left">
          Shopify Key
        </h2>
        <div className="flex gap-3">
          <div>
             <TextInput id="file-upload"
        placeholder="Shopify Key"
        className="width-full"
        />

          </div>
        <div>

       
         <button className="bg-[#1f2937] text-white text-[18px] font-medium px-4 py-2 rounded-lg hover:bg-[#374151]">
         Edit
        </button>
         </div>
        </div>
       
        
      </div>
      <div className="mb-10 flex justify-center items-center">
        <button className="bg-[#1f2937] text-white text-[18px] font-medium px-4 py-2 rounded-lg hover:bg-[#374151] w-full lg:w-4/12">
         Submit
        </button>
      </div>
          <div>
          <button className="mb-4 float-right bg-[#1f2937] text-white text-[18px] font-medium px-4 py-2 rounded-lg hover:bg-[#374151]">
            Create Report
          </button>
          </div>
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
  );
};

export default Landing;
