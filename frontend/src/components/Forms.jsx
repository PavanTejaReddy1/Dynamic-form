import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Forms() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  async function getForms() {
    try {
      const res = await axios.get(
        `https://dynamic-form-production-e056.up.railway.app/auth/getForms/${id}`
      );
      setForms(res.data.forms);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  }

  useEffect(() => {
    getForms();
  }, []);

  async function removeForm(index) {
    try {
      const res = await axios.delete(
        `https://dynamic-form-production-e056.up.railway.app/auth/deleteForm/${id}/${index}`
      );

      toast.success(res.data.message, {
        position: "top-left",
        autoClose: 2000,
        theme: "light",
      });

      setForms((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      toast.error(err.response?.data?.message, {
        position: "top-left",
        autoClose: 2000,
        theme: "light",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-white rounded border border-gray-200 hover:bg-gray-100 px-5 py-2 rounded-lg text-sm text-gray-700 shadow-sm transition"
          >
            Back to Home
          </button>
        </div>

        {id ? (
          forms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {forms.map((f, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition duration-300"
                >
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    #{`Form ${i + 1}`}
                  </p>

                  <div className="space-y-3 max-h-[200px] overflow-hidden">
                    {f.map((field, index) => (
                      <div key={index}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          {field.label}
                        </label>

                        {field.type === "input" && (
                          <input
                            type={field.dataType}
                            placeholder={field.placeholder}
                            className="border border-gray-200 rounded-md px-2 py-1 w-full text-xs bg-gray-50"
                            disabled
                          />
                        )}

                        {field.type === "dropdown" && (
                          <select
                            disabled
                            className="border border-gray-200 rounded-md px-2 py-1 w-full text-xs bg-gray-50"
                          >
                            {field.options.map((opt, j) => (
                              <option key={j}>{opt}</option>
                            ))}
                          </select>
                        )}

                        {field.type === "radio" &&
                          field.options.map((opt, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-2 text-xs text-gray-600"
                            >
                              <input type="radio" disabled />
                              {opt}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => navigate(`/form/${id}/${i + 1}`)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm transition"
                    >
                      Open
                    </button>

                    <button
                      onClick={() => removeForm(i)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-16">
              <p className="text-2xl font-semibold text-gray-700">
                No Forms Found
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                Create at least one form
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center gap-5 mt-16">
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 rounded hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
            >
              Login
            </button>
            <p className="text-gray-500 text-sm">
              Log in to view your forms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forms;
