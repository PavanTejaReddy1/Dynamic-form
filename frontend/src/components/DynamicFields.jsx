import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function DynamicFields() {
  const [inputField, setInputField] = useState({
    label: "",
    dataType: "",
    placeholder: "",
    required: "",
  });

  const [dropdownField, setDropdownField] = useState({
    label: "",
    options: "",
    required: "",
  });

  const [radioField, setRadioField] = useState({
    label: "",
    options: "",
    required: "",
  });

  const [selectedInput, setSelectedInput] = useState(false);
  const [selectedDropDown, setSelectedDropDown] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(false);

  const [formFields, setFormFields] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  console.log(formFields)
  function drop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData("inputField");

    if (type === "Input") setSelectedInput(true);
    else if (type === "Dropdown") setSelectedDropDown(true);
    else setSelectedRadio(true);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function submitInput(e) {
    e.preventDefault();

    const newField = { type: "input", ...inputField };

    if (editIndex !== null) {
      setFormFields((prev) =>
        prev.map((f, i) => (i === editIndex ? newField : f))
      );
      setEditIndex(null);
    } else {
      setFormFields((prev) => [...prev, newField]);
    }

    setInputField({ label: "", dataType: "", placeholder: "", required: "" });
    setSelectedInput(false);
  }

  function submitDropdown(e) {
    e.preventDefault();

    const newField = {
      type: "dropdown",
      label: dropdownField.label,
      options: dropdownField.options.split(","),
      required: dropdownField.required,
    };

    if (editIndex !== null) {
      setFormFields((prev) =>
        prev.map((f, i) => (i === editIndex ? newField : f))
      );
      setEditIndex(null);
    } else {
      setFormFields((prev) => [...prev, newField]);
    }

    setDropdownField({ label: "", options: "", required: "" });
    setSelectedDropDown(false);
  }

  function submitRadio(e) {
    e.preventDefault();

    const newField = {
      type: "radio",
      label: radioField.label,
      options: radioField.options.split(","),
      required: radioField.required,
    };

    if (editIndex !== null) {
      setFormFields((prev) =>
        prev.map((f, i) => (i === editIndex ? newField : f))
      );
      setEditIndex(null);
    } else {
      setFormFields((prev) => [...prev, newField]);
    }

    setRadioField({ label: "", options: "", required: "" });
    setSelectedRadio(false);
  }

  function deleteField(index) {
    setFormFields((prev) => prev.filter((_, i) => i !== index));
  }

  function startEdit(index) {
    const field = formFields[index];
    setEditIndex(index);

    if (field.type === "input") {
      setInputField(field);
      setSelectedInput(true);
    }

    if (field.type === "dropdown") {
      setDropdownField({
        label: field.label,
        options: field.options.join(","),
        required: field.required,
      });
      setSelectedDropDown(true);
    }

    if (field.type === "radio") {
      setRadioField({
        label: field.label,
        options: field.options.join(","),
        required: field.required,
      });
      setSelectedRadio(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const id = localStorage.getItem("id");

    try {
      const res = await axios.post(`https://dynamic-form-production-e056.up.railway.app/auth/addForm/${id}`, formFields);

      setFormFields([]);

      toast.success(res.data.message, {
        position: "top-left",
        autoClose: 2000,
        theme: "light",
      });
    } catch (err) {
      toast.error("Login to start building your form", {
        position: "top-left",
        autoClose: 2000,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex h-[50vh] justify-center" 
         onDrop={drop}
        onDragOver={dragOver}>
      <div
        className="w-full max-w-3xl border-indigo-200 rounded-2xl p-6 bg-white"
      >
        <p className="text-center text-gray-500 mb-6">
          Drag fields here to build your form
        </p>

        {/* FIELD EDIT PANELS */}
        {(selectedInput || selectedDropDown || selectedRadio) && (
          <div className="bg-gray-50 p-4 rounded-xl shadow-inner mb-6">
            {selectedInput && (
              <>
              <div className="flex justify-between">
                  <p>Input field</p>
                  <IoMdClose
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => setSelectedInput(false)}
                  />
              </div>
              <form onSubmit={submitInput} className="grid gap-3 mb-2">
                <input
                  placeholder="Label"
                  value={inputField.label}
                  onChange={(e) =>
                    setInputField({ ...inputField, label: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                <select
                  value={inputField.dataType}
                  onChange={(e) =>
                    setInputField({ ...inputField, dataType: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Type</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                </select>

                <input
                  placeholder="Placeholder"
                  value={inputField.placeholder}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      placeholder: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                <select
                  value={inputField.required}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      required: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Required</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <button className="bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                  {editIndex !== null ? "Update Field" : "Add Field"}
                </button>
              </form>
              </>
            )}

            {selectedDropDown && (
              <>
                <div className="flex justify-between">
                  <p>Drop Down field</p>
                  <IoMdClose
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => setSelectedDropDown(false)}
                  />
                </div>
              <form onSubmit={submitDropdown} className="grid gap-3 mb-2">
                <input
                  placeholder="Label"
                  value={dropdownField.label}
                  onChange={(e) =>
                    setDropdownField({
                      ...dropdownField,
                      label: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                <input
                  placeholder="Options (a,b,c)"
                  value={dropdownField.options}
                  onChange={(e) =>
                    setDropdownField({
                      ...dropdownField,
                      options: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                <button className="bg-blue-600 rounded text-white py-2 text-sm hover:bg-blue-700 transition">
                  {editIndex !== null ? "Update Field" : "Add Field"}
                </button>
              </form>
              </>
            )}

            {selectedRadio && (
              <>
                <div className="flex justify-between">
                  <p>Radio field</p>
                  <IoMdClose
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => setSelectedRadio(false)}
                  />
                </div>
              <form onSubmit={submitRadio} className="grid gap-3">
                <input
                  placeholder="Label"
                  value={radioField.label}
                  onChange={(e) =>
                    setRadioField({
                      ...radioField,
                      label: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                <input
                  placeholder="Options (a,b,c)"
                  value={radioField.options}
                  onChange={(e) =>
                    setRadioField({
                      ...radioField,
                      options: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                <button className="bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                  {editIndex !== null ? "Update Field" : "Add Field"}
                </button>
              </form>
              </>
            )}
          </div>
        )}

        {/* FINAL FORM PREVIEW */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              {field.type === "input" && (
                <input
                  type={field.dataType}
                  placeholder={field.placeholder}
                  className="border rounded-lg px-3 py-2 w-full text-sm"
                />
              )}

              {field.type === "dropdown" && (
                <select className="border rounded-lg px-3 py-2 w-full text-sm">
                  {field.options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              )}

              {field.type === "radio" &&
                field.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <input type="radio" name={field.label} />
                    {opt}
                  </div>
                ))}

              <div className="flex gap-3 mt-2 text-gray-500 text-sm">
                <FaEdit
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => startEdit(index)}
                />
                <IoMdClose
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => deleteField(index)}
                />
              </div>
            </div>
          ))}

          {formFields.length > 0 && (
            <button className="w-full mt-6 bg-indigo-600 rounded hover:bg-indigo-700 text-white p-2 rounded-lg shadow-md transition">
              Create Form
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default DynamicFields;
