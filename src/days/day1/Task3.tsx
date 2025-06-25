import { useEffect, useState } from "react";
import type { TableData, Data, ItemPerPage } from "@src/types/task3";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import SimpleButton from "@src/components/SimpleButton";
import { HiOutlineRefresh } from "react-icons/hi";

function Task3() {
  const [tableData, setTableData] = useState<TableData>("pending");
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [itemPerPage, setItemPerPage] = useState<ItemPerPage>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  async function fetchData() {
    setTableData("pending");
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setTableData(data);
      setFilteredData(data);
    } catch (error) {
      setTableData("error");
      console.log(error);
    }
  }

  function filterData() {
    if (tableData && typeof tableData !== "string") {
      const value = searchText.trim().toLowerCase();
      setCurrentPage(1);
      const newSearchedData = tableData.filter((item) => {
        const userId = String(item.userId);
        const id = String(item.id);

        if (
          userId.includes(value) ||
          id.includes(value) ||
          item.body.includes(value) ||
          item.title.includes(value)
        ) {
          return true;
        } else {
          return false;
        }
      });

      setFilteredData([...newSearchedData]);
    }
  }

  useEffect(() => {
    filterData();
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, []);

  if (tableData === "pending") {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Loading Data</h2>
            <p className="text-muted-foreground">
              Fetching posts from JSONPlaceholder...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tableData === "error") {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 text-red-500">
            <IoAlertCircleOutline className="h-8 w-8 mx-auto mb-4 " />
            <h2 className="text-xl font-semibold mb-2">Unable to load data</h2>
            <p className="text-muted-foreground">Please try again</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 flex flex-col gap-10 pb-10">
      {/* Heading and desc.. */}
      <div className="flex flex-col items-center pt-16 pb-10 gap-3">
        <h1 className="flex items-center gap-3 text-4xl">
          <FaDatabase /> Data Table
        </h1>
        <p className="opacity-70">
          Sortable, paginated table with search functionality
        </p>
      </div>
      {/* Total posts, filtered result, etc... */}
      <div className="flex gap-5">
        <div className="bg-[#343a40] grid w-full grid-cols-[1fr_auto] gap-x-3 gap-y-2 border border-white/30 rounded-md px-4 py-2">
          <p>Total Posts</p>
          <div className="flex items-center justify-center row-span-2 text-2xl">
            <FaDatabase />
          </div>
          <h3 className="text-3xl font-semibold ">{tableData.length}</h3>
        </div>
        <div className="bg-[#343a40] grid w-full grid-cols-[1fr_auto] gap-x-3 gap-y-2 border border-white/30 rounded-md px-4 py-2">
          <p>Filtered Results</p>
          <div className="flex items-center justify-center row-span-2 text-2xl">
            <IoSearch />
          </div>
          <h3 className="text-3xl font-semibold ">{filteredData.length}</h3>
        </div>
        <div className="bg-[#343a40] grid w-full grid-cols-[1fr_auto] gap-x-3 gap-y-2 border border-white/30 rounded-md px-4 py-2">
          <p>Current Page</p>
          <div className="flex items-center justify-center row-span-2 text-2xl">
            <FaBookOpen />
          </div>
          <h3 className="text-3xl font-semibold ">{currentPage}</h3>
        </div>
        <div className="bg-[#343a40] grid w-full grid-cols-[1fr_auto] gap-x-3 gap-y-2 border border-white/30 rounded-md px-4 py-2">
          <p>Total Pages</p>
          <div className="flex items-center justify-center row-span-2 text-2xl">
            <FaBook />
          </div>
          <h3 className="text-3xl font-semibold ">
            {Math.ceil(filteredData.length / itemPerPage)}
          </h3>
        </div>
      </div>
      {/* Table Controls */}
      <div className="bg-[#343a40] p-4 rounded flex flex-col gap-5">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <h2 className="text-2xl font-semibold">Table Controls</h2>
          <SimpleButton handleClick={fetchData}>
            <HiOutlineRefresh /> Refresh
          </SimpleButton>
        </div>
        <div
          className={`grid items-center ${
            searchText.trim().length > 0
              ? "grid-cols-[1fr_auto] gap-5"
              : "grid-cols-1"
          }`}
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full focus:outline-none border border-white/50 rounded h-9 px-2 "
          />
          {searchText.trim().length > 0 && (
            <SimpleButton handleClick={() => setSearchText("")}>
              Clear Search
            </SimpleButton>
          )}
        </div>
      </div>
      {/* Table */}
      <ShowTableData
        filteredData={filteredData}
        itemPerPage={itemPerPage}
        currentPage={currentPage}
      />

      {/* Pagination */}
      <div className="bg-[#343a40] p-4 rounded flex gap-5 justify-between">
        <div className="flex items-center gap-5">
          <p className="opacity-80">
            Showing {currentPage} to{" "}
            {Math.ceil(filteredData.length / itemPerPage)} of{" "}
            {filteredData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <p className="opacity-80">Show</p>
            <select
              name="itemPerPage"
              id="itemPerPage"
              className="border border-white/50 rounded px-2 py-1 cursor-pointer bg-[#343a40]"
              value={itemPerPage}
              onChange={(e) => {
                setItemPerPage(Number(e.target.value) as ItemPerPage);
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <div>
          <TablePagination
            setCurrentPage={setCurrentPage}
            itemPerPage={itemPerPage}
            pages={Math.ceil(filteredData.length / itemPerPage)}
            currentPage={currentPage}
            filteredData={filteredData}
          />
        </div>
      </div>
    </div>
  );
}

export default Task3;

function ShowTableData({
  filteredData,
  currentPage,
  itemPerPage,
}: {
  filteredData: Data[];
  currentPage: number;
  itemPerPage: ItemPerPage;
}) {
  const finalData = filteredData.filter((_item, index) => {
    const startFrom = (currentPage - 1) * itemPerPage;
    const endTo = startFrom + itemPerPage - 1;
    return index >= startFrom && index <= endTo;
  });

  return (
    <table className="border-white/30 rounded-md bg-[#343a40] border overflow-hidden">
      <thead>
        <th className=" px-5 py-4 ">ID</th>
        <th className=" px-5 py-4  ">Title</th>
        <th className=" px-5 py-4 ">Content</th>
      </thead>

      <tbody>
        {finalData.length > 0 ? (
          <>
            {finalData.map((item, index) => {
              return (
                <tr
                  className="border-y border-white/30 mx-10 hover:bg-[#212529]/50 cursor-default"
                  key={index}
                >
                  <td className="px-5 py-2">{item.id}</td>
                  <td className="px-5 py-2">{item.title}</td>
                  <td className="px-5 py-2 opacity-70">{item.body}</td>
                </tr>
              );
            })}
          </>
        ) : (
          <tr>
            <td colSpan={3} className="text-center py-10 opacity-70">
              No matching results found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function TablePagination({
  setCurrentPage,
  filteredData,
  itemPerPage,
  pages,
  currentPage,
}: {
  setCurrentPage: (arg0: number) => void;
  filteredData: Data[];
  itemPerPage: ItemPerPage;
  pages: number;
  currentPage: number;
}) {
  const [page, setPage] = useState<(number | "...")[]>([]);
  useEffect(() => {
    let pageArr: (number | "...")[] = [];
    if (pages < 6) {
      Array(pages)
        .fill(null)
        .map((_item, index) => {
          pageArr.push(index + 1);
        });
    } else {
      pageArr.push(1);
      if (currentPage === 1 || currentPage === 2) {
        pageArr.push(2);
        pageArr.push(3);
        pageArr.push("...");
      } else if (currentPage === pages || currentPage === pages - 1) {
        pageArr.push("...");
        pageArr.push(pages - 2);
        pageArr.push(pages - 1);
      } else {
        pageArr.push("...");
        pageArr.push(currentPage - 1);
        pageArr.push(currentPage);
        pageArr.push(currentPage + 1);
        pageArr.push("...");
      }
      pageArr.push(pages);
    }
    console.log(pageArr);
    setPage(() => [...pageArr]);
  }, [currentPage, itemPerPage, filteredData]);

  console.log(page);
  return (
    <>
      {page.length > 0 && (
        <div className="flex gap-3">
          <SimpleButton
            className={`${
              1 === currentPage && "opacity-30"
            } hover:!bg-[#212529]/50`}
            disabled={currentPage === 1}
            handleClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </SimpleButton>
          {page.map((item, index) => {
            if (item === "...") {
              return (
                <SimpleButton
                  className="opacity-30 hover:!bg-[#212529]/50"
                  key={index}
                  disabled={true}
                >
                  {item}
                </SimpleButton>
              );
            } else {
              return (
                <SimpleButton
                  key={index}
                  className={`${
                    currentPage === item && "bg-blue-500 hover:!bg-blue-500"
                  }`}
                  handleClick={() => setCurrentPage(item)}
                >
                  {item}
                </SimpleButton>
              );
            }
          })}
          <SimpleButton
            className={`${
              pages === currentPage && "opacity-30"
            } hover:!bg-[#212529]/50`}
            disabled={pages === currentPage}
            handleClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </SimpleButton>
        </div>
      )}
    </>
  );
}
