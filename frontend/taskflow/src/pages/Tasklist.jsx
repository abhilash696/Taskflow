import React, { useEffect, useState } from "react";
import TaskCard from "../components/Taskcard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../store/features/task/taskSlice";

export default function TaskDashboard() {
  const tasks = useSelector((state) => state.task.tasks);
  const err = useSelector((state) => state.task.error);
  const isloading = useSelector((state) => state.task.isloading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {});

  const statusConfig = {
    todo: {
      title: "To Do",
      color: "bg-blue-100 border-blue-300 text-blue-800",
    },
    "in-progress": {
      title: "In Progress",
      color: "bg-blue-200 border-blue-400 text-blue-900",
    },
    done: {
      title: "Done",
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
  };

  if (isloading) {
    return <p>loading...</p>;
  }

  if (err) {
    return <div>{err && <p style={{ color: "red" }}>{err}</p>}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Task Flow</h1>
        <p className="text-blue-600">Manage your work efficiently</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(statusConfig).map(([statusKey, config]) => (
          <div
            key={statusKey}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
          >
            <div className={`p-4 border-b ${config.color}`}>
              <h2 className="font-semibold">{config.title}</h2>
            </div>
            <div className="p-4 space-y-4 min-h-[200px]">
              {groupedTasks[statusKey]?.length ? (
                groupedTasks[statusKey].map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No tasks here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
