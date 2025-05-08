import React from "react";

export default function Modal({ isopen, handleClose, children }) {
  if (!isopen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && handleClose()} // Close on backdrop click
    >
      <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
