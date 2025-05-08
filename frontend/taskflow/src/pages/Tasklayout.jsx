import React from "react";
import { Outlet } from "react-router-dom";
export default function Tasklayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
