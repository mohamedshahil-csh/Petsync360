import React, { useEffect, useMemo, useState } from "react";
import MultiSelectModal from "./MultiselectModail";
import { ChevronDown } from "lucide-react";
import Select from "react-select";
type Field = {
  name: string;
  label: string;
  type: string;
  fieldType: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  options?: { label: string; value: string }[];
  fields?: Field[];
  visible?: boolean | ((formData: any) => boolean);
  multiple?: boolean;
};

type FormSchema = {
  title: string;
  fields: Field[];
};

type DynamicFormProps = {
  schema: FormSchema;
  onSubmit: (data: Record<string, any>) => void;
  initialValues?: any;
  onSelect?: (data: any) => void;
  onSearchInput?: (fieldName: string, searchKey: string) => void;
};

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit, initialValues, onSelect, onSearchInput }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const booleanFields = schema.fields.filter((field) => field.fieldType === "boolean");
  const otherFields = schema.fields.filter((field) => field.fieldType !== "boolean");
  const [modalField, setModalField] = useState<Field | null>(null);
  const [searchKey, setSearchKey] = useState<Record<string, string>>({});


  const filteredOptionsMap = useMemo(() => {
    const map: Record<string, { label: string; value: string }[]> = {};
    for (const field of schema.fields) {
      if (field.fieldType === "dropdown") {
        const key = searchKey[field.name] || "";
        if (!key) {
          map[field.name] = field.options || [];
        } else {
          map[field.name] = (field.options || []).filter(opt =>
            opt.label.toLowerCase().includes(key.toLowerCase())
          );
        }
      }
    }
    return map;
  }, [schema.fields, searchKey]);
  const handleMultiSelectSave = (selectedValues: string[]) => {
    if (modalField) {
      setFormData((prev) => ({
        ...prev,
        [modalField.name]: selectedValues,
      }));
      setModalField(null);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, type } = target;

    const value =
      type === "checkbox" ? (target as HTMLInputElement).checked : target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (onSelect) {
      onSelect({ fieldName: name, value });
    }
  };



  const handleSingleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // just the single file
      }));
    }
  };

  useEffect(() => {
    if (initialValues) {
      const normalizedData = { ...initialValues };

      schema.fields.forEach((field) => {
        if (field.fieldType === "dropdown" && field.multiple) {
          if (!Array.isArray(normalizedData[field.name])) {
            normalizedData[field.name] = [];
          }
        }
        if (field.fieldType === "boolean") {
          normalizedData[field.name] = !!normalizedData[field.name];
        }
        if (field.fieldType === "objectArray") {
          if (!Array.isArray(normalizedData[field.name])) {
            normalizedData[field.name] = [];
          }
        }
      });

      setFormData(normalizedData);
    }
  }, [initialValues, schema.fields]);
  // New: Handle multiple images input change
  const handleMultiImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: Array.from(files), // array of files
      }));
    }
  };
  const handleAddObjectArrayItem = (field: Field) => {
    setFormData((prev) => {
      const currentArr = prev[field.name] ?? [];
      // Create empty object with keys from nested fields set to empty string or false
      const emptyItem: Record<string, any> = {};
      field.fields?.forEach(f => {
        if (f.fieldType === "boolean") emptyItem[f.name] = false;
        else emptyItem[f.name] = "";
      });

      return {
        ...prev,
        [field.name]: [...currentArr, emptyItem],
      };
    });
  };

  // Remove item by index
  const handleRemoveObjectArrayItem = (fieldName: string, index: number) => {
    setFormData((prev) => {
      const currentArr = prev[fieldName] ?? [];
      return {
        ...prev,
        [fieldName]: currentArr.filter((_: any, i: number) => i !== index),
      };
    });
  };

  // Handle input change inside one of the objectArray items
  const handleObjectArrayItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string,
    index: number
  ) => {
    const target = e.target;
    const { name, type } = target;
    const value = type === "checkbox" ? (target as HTMLInputElement).checked : target.value;

    setFormData((prev) => {
      const currentArr = prev[fieldName] ?? [];
      const updatedItem = { ...currentArr[index], [name]: value };
      const updatedArr = [...currentArr];
      updatedArr[index] = updatedItem;

      return {
        ...prev,
        [fieldName]: updatedArr,
      };
    });
  };
  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const field of schema.fields) {
      if (field.required) {
        const val = formData[field.name];
        if (
          (field.fieldType === "boolean" && val !== true && val !== false) ||
          (!val && val !== false)
        ) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: Field) => {
    const error = errors[field.name];
    const baseInputClasses =
      `w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400
       focus:outline-none focus:ring-4 focus:ring-white-400 focus:border-transparent
       shadow-md transition duration-300 ease-in-out
       ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300"}`;

    switch (field.fieldType) {
      case "dropdown":
        const isMultiple = !!field.multiple;

        const filteredOptions = filteredOptionsMap[field.name] || [];
        const selectedOptions = isMultiple
          ? filteredOptions.filter(opt => (formData[field.name] || []).includes(opt.value))
          : filteredOptions.find(opt => opt.value === formData[field.name]) || null;


        const handleChange = (selected: any) => {
          if (isMultiple) {
            const values = selected ? selected.map((opt: any) => opt.value) : [];
            setFormData((prev: any) => ({ ...prev, [field.name]: values }));
            if (onSelect) onSelect({ fieldName: field.name, value: values });
          } else {
            const value = selected ? selected.value : "";
            setFormData((prev: any) => ({ ...prev, [field.name]: value }));
            if (onSelect) onSelect({ fieldName: field.name, value });
          }
        };

        const customStyles = {
          control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: "0.375rem", // rounded (matching Tailwind's rounded)
            borderColor: error ? "#dc2626" : "#d1d5db", // red if error else gray-300
            boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none", // blue ring on focus
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            minHeight: "2.5rem",
            cursor: "pointer",
          }),
          placeholder: (provided: any) => ({
            ...provided,
            color: "#9ca3af", // gray-400
          }),
          multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: "#e0e7ff", // blue-100 for selected tags background
          }),
          multiValueLabel: (provided: any) => ({
            ...provided,
            color: "#3730a3", // blue-900 for text
          }),
          multiValueRemove: (provided: any) => ({
            ...provided,
            color: "#3730a3",
            ':hover': {
              backgroundColor: "#c7d2fe", // blue-200 on hover
              color: "#1e40af", // blue-800
            },
          }),
          singleValue: (provided: any) => ({
            ...provided,
            color: "#111827",
          }),
          menu: (provided: any) => ({
            ...provided,
            borderRadius: "0.375rem",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", // tailwind shadow-lg
            zIndex: 100,
          }),
          option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused
              ? "#e0e7ff" // blue-100 hover
              : "white",
            color: "#111827",
            cursor: "pointer",
          }),
        };
        return (
          <div>
            <label
              htmlFor={field.name}
              className="block mb-2 font-semibold text-gray-800"
            >
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>

            <Select
              inputId={field.name}
              name={field.name}
              options={field.options}
              isMulti={isMultiple}
              value={selectedOptions}
              onChange={handleChange}
              onInputChange={(inputValue) => {
                setSearchKey((prev) => ({ ...prev, [field.name]: inputValue }));
                if (onSearchInput) onSearchInput(field.name, inputValue);
              }}
              placeholder={field.placeholder || (isMultiple ? "Select options" : "Select an option")}
              styles={customStyles}
              classNamePrefix="react-select"
              isClearable
            />

            {error ? (
              <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ) : field.description ? (
              <p className="mt-1 text-sm text-gray-500 italic">{field.description}</p>
            ) : null}
          </div>
        );
      case "boolean":
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={!!formData[field.name]}
              onChange={handleInputChange}
              className={`h-6 w-6 text-blue-600 focus:ring-4 focus:ring-blue-400 border-gray-300 rounded-lg transition duration-300 ease-in-out ${error ? "border-red-500 focus:ring-red-400" : ""
                }`}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={`${field.name}-error`}
            />
            <label
              htmlFor={field.name}
              className="block text-gray-900 font-semibold select-none cursor-pointer"
            >
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>
            {error && (
              <p
                id={`${field.name}-error`}
                className="ml-6 text-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>
        );
      case "singleImage":
        return (
          <div>
            <label
              htmlFor={field.name}
              className="block mb-2 font-semibold text-gray-800"
            >
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>
            <input
              id={field.name}
              name={field.name}
              type="file"
              accept="image/*"
              onChange={handleSingleImageChange}
              className={baseInputClasses}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={`${field.name}-error`}
            />
            {formData[field.name] && (
              <img
                src={URL.createObjectURL(formData[field.name])}
                alt="Preview"
                className="mt-2 max-h-40 rounded"
              />
            )}
            {error ? (
              <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ) : field.description ? (
              <p className="mt-1 text-sm text-gray-500 italic">{field.description}</p>
            ) : null}
          </div>
        );

      case "multiImage":
        return (
          <div>
            <label
              htmlFor={field.name}
              className="block mb-2 font-semibold text-gray-800"
            >
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>
            <input
              id={field.name}
              name={field.name}
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultiImageChange}
              className={baseInputClasses}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={`${field.name}-error`}
            />
            {formData[field.name] && Array.isArray(formData[field.name]) && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData[field.name].map((file: File, index: number) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="max-h-24 rounded"
                  />
                ))}
              </div>
            )}
            {error ? (
              <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ) : field.description ? (
              <p className="mt-1 text-sm text-gray-500 italic">{field.description}</p>
            ) : null}
          </div>
        );

      case "multiline":
        return (
          <div>
            <label
              htmlFor={field.name}
              className="block mb-2 font-semibold text-gray-800"
            >
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] ?? ""}
              onChange={handleInputChange}
              rows={4}
              className={`${baseInputClasses} resize-none`}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={`${field.name}-error`}
            />
            {error ? (
              <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ) : field.description ? (
              <p className="mt-1 text-sm text-gray-500 italic">{field.description}</p>
            ) : null}
          </div>
        );
      case "objectArray":
        const items: any[] = formData[field.name] ?? [];

        return (
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>

            {items.map((item, index) => (
              <div key={index} className="mb-4 p-4 border rounded space-y-4 bg-white shadow-sm">
                {field.fields?.map((subField) => {
                  const errorKey = `${field.name}[${index}].${subField.name}`;
                  const error = errors[errorKey];

                  const baseInputClasses =
                    `w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400
               focus:outline-none focus:ring-4 focus:ring-white-400 focus:border-transparent
               shadow-md transition duration-300 ease-in-out
               ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300"}`;

                  switch (subField.fieldType) {
                    case "boolean":
                      return (
                        <div key={subField.name} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`${field.name}-${index}-${subField.name}`}
                            name={subField.name}
                            checked={!!item[subField.name]}
                            onChange={(e) => handleObjectArrayItemChange(e, field.name, index)}
                            className={baseInputClasses}
                            aria-invalid={error ? "true" : "false"}
                          />
                          <label
                            htmlFor={`${field.name}-${index}-${subField.name}`}
                            className="block text-gray-900 font-semibold select-none cursor-pointer"
                          >
                            {subField.label} {subField.required && <span className="text-red-600">*</span>}
                          </label>
                        </div>
                      );

                    case "dropdown":
                      return (
                        <div key={subField.name}>
                          <label
                            htmlFor={`${field.name}-${index}-${subField.name}`}
                            className="block mb-2 font-semibold text-gray-800"
                          >
                            {subField.label} {subField.required && <span className="text-red-600">*</span>}
                          </label>
                          <select
                            id={`${field.name}-${index}-${subField.name}`}
                            name={subField.name}
                            value={item[subField.name] ?? ""}
                            onChange={(e) => handleObjectArrayItemChange(e, field.name, index)}
                            className={baseInputClasses}
                            aria-invalid={error ? "true" : "false"}
                          >
                            <option value="">Select an option</option>
                            {subField.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      );

                    case "multiline":
                      return (
                        <div key={subField.name}>
                          <label
                            htmlFor={`${field.name}-${index}-${subField.name}`}
                            className="block mb-2 font-semibold text-gray-800"
                          >
                            {subField.label} {subField.required && <span className="text-red-600">*</span>}
                          </label>
                          <textarea
                            id={`${field.name}-${index}-${subField.name}`}
                            name={subField.name}
                            placeholder={subField.placeholder}
                            value={item[subField.name] ?? ""}
                            onChange={(e) => handleObjectArrayItemChange(e, field.name, index)}
                            rows={3}
                            className={`${baseInputClasses} resize-none`}
                            aria-invalid={error ? "true" : "false"}
                          />
                        </div>
                      );

                    default:
                      return (
                        <div key={subField.name}>
                          <label
                            htmlFor={`${field.name}-${index}-${subField.name}`}
                            className="block mb-2 font-semibold text-gray-800"
                          >
                            {subField.label} {subField.required && <span className="text-red-600">*</span>}
                          </label>
                          <input
                            id={`${field.name}-${index}-${subField.name}`}
                            name={subField.name}
                            type={subField.type}
                            placeholder={subField.placeholder}
                            value={item[subField.name] ?? ""}
                            onChange={(e) => handleObjectArrayItemChange(e, field.name, index)}
                            className={baseInputClasses}
                            aria-invalid={error ? "true" : "false"}
                            autoComplete="off"
                          />
                        </div>
                      );
                  }
                })}

                <button
                  type="button"
                  onClick={() => handleRemoveObjectArrayItem(field.name, index)}
                  className="mt-2 px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleAddObjectArrayItem(field)}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold"
            >
              Add {field.label}
            </button>
          </div>
        );

      default:
        return (
          <div>
            <label
              htmlFor={field.name}
              className="block mb-2 font-semibold text-gray-800"
            >
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] ?? ""}
              onChange={handleInputChange}
              className={baseInputClasses}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={`${field.name}-error`}
              required={field.required}
              autoComplete="off"
            />
            {error ? (
              <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ) : field.description ? (
              <p className="mt-1 text-sm text-gray-500 italic">{field.description}</p>
            ) : null}
          </div>
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" mx-auto p-4 "
      noValidate
    >
      {/* <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-lg">
        {schema.title}
      </h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-8">
        {otherFields.map((field) => (
          <div key={field.name}>
            {renderField(field)}
          </div>
        ))}
      </div>
      {booleanFields.length > 0 && (
        <div className="rounded-lg border p-6 shadow-md bg-gray-50 mb-10">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Options</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {booleanFields.map((field) => (
              <div key={field.name}>
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>
      )}
      {modalField && (
        <MultiSelectModal
          title={modalField.label}
          options={modalField.options || []}
          selectedValues={formData[modalField.name] || []}
          onClose={() => setModalField(null)}
          onSave={handleMultiSelectSave}
        />
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600
               hover:from-purple-600 hover:to-indigo-600 text-white
               font-bold rounded-xl shadow-md transform hover:scale-105
               transition duration-300 ease-in-out text-md"
        >
          Save
        </button>
      </div>

    </form>
  );
};

export default DynamicForm;
