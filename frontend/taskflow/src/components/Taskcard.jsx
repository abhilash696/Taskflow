import React from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
export default function TaskCard({ task }) {
  const [viewtask, setViewTask] = useState(false);

  const handleView = () => {
    return setViewTask(!viewtask);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow">
      <h3 className="font-medium text-blue-900">{task.title}</h3>
      <p className="mt-2 text-sm text-blue-600">{task.description}</p>
      <p className="mt-2 text-md text-blue-900">
        Priority :<b>{task.priority}</b>
      </p>

      <Link
        to={`edit-task/${task._id}`}
        className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit Task
      </Link>
      <div className="mt-3 flex justify-between items-center text-xs">
        <span className="text-gray-500">
          Updated {new Date().toLocaleDateString()}
        </span>
        <button
          onClick={handleView}
          className="text-blue-500 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
        <Modal isopen={viewtask} handleClose={handleView}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Task Details
                  </h1>
                  <button
                    onClick={handleView}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-500 mb-1">
                      Title
                    </h2>
                    <p className="text-xl text-gray-800 font-medium px-2 py-1 rounded bg-gray-50">
                      {task.title}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-500 mb-1">
                      Description
                    </h2>
                    <div className="px-2 py-1 rounded bg-gray-50">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-500 mb-1">
                      Status
                    </h2>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-500 mb-1">
                      Priority
                    </h2>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleView}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
