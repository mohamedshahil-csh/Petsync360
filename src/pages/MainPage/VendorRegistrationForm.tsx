import React from "react";

interface VendorFormProps {
  onClose: () => void;
}

export function VendorRegistrationForm({ onClose }: VendorFormProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          aria-label="Close registration form"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4">Vendor Registration</h2>
        <form>
          <label className="block mb-2 font-medium" htmlFor="vendorName">
            Vendor Name
          </label>
          <input
            id="vendorName"
            type="text"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <label className="block mb-2 font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          {/* Add other fields as needed */}
          <button
            type="submit"
            className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
