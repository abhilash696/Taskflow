import axios from "axios";
import React, { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getTasks } from "../store/features/task/taskSlice";
import { useDispatch } from "react-redux";
import { showAlert } from "../store/features/alert/alertSlice";

export default function EditTask() {
  const params = useParams();
  const id = params.id;
  const [task, settask] = useState({});
  const [err, setError] = useState();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlechange = (e) => {
    settask((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedtask = {};
      updatedtask.title = task.title;
      updatedtask.description = task.description;
      updatedtask.status = task.status;
      updatedtask.priority = task.priority;

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}api/tasks/${id}`,
        updatedtask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await dispatch(
        showAlert({
          message: "task edited!",
          type: "success",
        })
      );
      await dispatch(getTasks());
      navigate(-1);
    } catch (err) {
      let msg = err.response.data.error || "Something went wrong";
      dispatch(showAlert({ message: msg, type: "error" }));
    }
  };

  useEffect(() => {
    async function fetchtask() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/tasks/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const task = await response.data.task;
        settask(task);
      } catch (err) {
        setError(err.response.data.error || "Something went wrong");
      }
    }
    fetchtask();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              Edit Task
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto p-6  bg-white rounded-lg shadow-md space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={task?.title || ""}
                onChange={handlechange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={task?.description || ""}
                onChange={handlechange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handlechange}
              >
                <option value="todo">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="priority"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handlechange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
