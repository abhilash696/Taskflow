import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Homelayout() {
  return (
    <div>
      <main>
        <div className="bg-blue-50 py-20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
                Welcome to Your Task Manager
              </h1>
              <p className="text-xl text-blue-600 mb-8">
                The simplest way to organize your work and life.
              </p>
              <Link
                to="/tasks/newtask"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Manage your first task
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Task management illustration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
