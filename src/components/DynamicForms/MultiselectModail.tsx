import React, { useState } from "react";

const MultiSelectModal: React.FC<any> = ({
  title,
  options,
  selectedValues,
  onClose,
  onSave,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedValues);

  const handleToggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>

        <div className="max-h-64 overflow-y-auto mb-6">
          {options.map((option: any) => (
            <label
              key={option.value}
              className="flex items-center p-3 rounded-md hover:bg-blue-50 cursor-pointer transition"
            >
              <input
                type="checkbox"
                className="accent-blue-600 w-5 h-5"
                checked={selected.includes(option.value)}
                onChange={() => handleToggle(option.value)}
              />
              <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectModal;
