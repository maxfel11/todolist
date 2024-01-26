import { useDispatch } from "react-redux";
import { useState } from "react";
import { setFilterTask } from "../../../store/slices/filterSlice";
import { toggleRefetchTaskData } from "../../../store/slices/taskSlice/fetchTaskSlice";

const TaskSearchBar = ({ FaSearch }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setFilterTask(e.target.value));
    dispatch(toggleRefetchTaskData());
  };

  return (
    <div className=" relative flex items-center w-full py-3 ">
      <FaSearch className="absolute left-[.5rem] " />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search"
        className="outline-0 w-full ring ring-1 ring-neutral-300 p-1.5 pl-8 px-2 text-lg rounded-full shadow-inner bg-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700/70"
      />
    </div>
  );
};

export default TaskSearchBar;
