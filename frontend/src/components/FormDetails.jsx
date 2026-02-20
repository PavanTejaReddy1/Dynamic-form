import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormDetails() {
  const { id, index } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  async function getFormDetails() {
    try {
      const res = axios.get(
        `http://localhost:4000/auth/getFormDetails/${id}/${index - 1}`
      );

      setForm((await res).data.form);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  }

  useEffect(() => {
    getFormDetails();
  }, [id]);

  if (!form) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600 bg-gray-50">
        No Form Found
      </div>
    );
  }

  async function share() {
    const url = `${window.location.origin}/form/${id}/${index}`;

    if (navigator.share) {
      await navigator.share({
        title: "Shared Form",
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

        <form className="space-y-5">
          {form.map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>

              {field.type === "input" && (
                <input
                  type={field.dataType}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              )}

              {field.type === "dropdown" && (
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition">
                  {field.options.map((opt, j) => (
                    <option key={j}>{opt}</option>
                  ))}
                </select>
              )}

              {field.type === "radio" &&
                field.options.map((opt, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="radio" name={field.label} />
                    {opt}
                  </div>
                ))}
            </div>
          ))}

          <button
            type="button"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={share}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Share
        </button>

        <button
          onClick={() => navigate("/showForms")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default FormDetails;