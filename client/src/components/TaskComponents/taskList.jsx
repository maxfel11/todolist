import { useSelector } from "react-redux";
import TaskCard from "./taskCard";

const TaskList = () => {
  const { allTaskData } = useSelector((state) => state.fetch);

  return (
    <div className="pt-24 py-4 px-6 min-h-screen bg-neutral-300/50 dark:bg-neutral-900">
      {allTaskData && (
        <div>
          {allTaskData.some((task) => task.completed) && (
            <div>
              <h2 className="mb-4 px-1 uppercase font-semibold text-sm text-neutral-500">
                Completed tasks
              </h2>
              <div className="columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4  h-auto mb-8">
                {allTaskData
                  .filter((task) => task.completed)
                  .map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
              </div>
            </div>
          )}
          {allTaskData.some((task) => !task.completed) && (
            <div>
              <h2 className="mb-4 px-1 uppercase font-semibold text-sm text-neutral-500">
                Not completed tasks
              </h2>
              <div className="columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4  h-auto">
                {allTaskData
                  .filter((task) => !task.completed)
                  .map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
