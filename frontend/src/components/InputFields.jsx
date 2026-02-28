import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function InputFields() {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  function dragStart(e) {
    const element = e.target.querySelector("h3").innerText;
    e.dataTransfer.setData("inputField", element);
  }

  function logout() {
    localStorage.clear();
    navigate("/");

    toast.success("Logout successfully", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
  }

  return (
    <>
      {/* TOP NAV */}
      <div className="w-full bg-white border-b shadow-sm">

        {/* MOBILE */}
        <div className="md:hidden px-4 py-4">

          {/* Title */}
          <h2 className="text-center text-lg font-bold text-gray-800 mb-3">
            Dynamic Form Builder
          </h2>

          {/* Buttons Row */}
          <div className="flex justify-center gap-5">
            {name ? (
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-700">
                  Welcome, <span className="text-indigo-600">{name}</span>
                </p>
                
                <div className="flex gap-12">
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white pl-4 pr-4 rounded-lg transition rounded"
                  >
                    Logout
                  </button>

                  <button
                    onClick={() => navigate("/showForms")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm p-0.5 pl-4 pr-4 rounded-lg transition rounded"
                  >
                    My Forms
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition rounded"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/showForms")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition rounded"
                >
                  My Forms
                </button>
              </>
            )}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex max-w-6xl mx-auto px-4 py-3 items-center justify-between">

          {/* LEFT */}
          <div>
            {name ? (
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-gray-700">
                  Welcome, <span className="text-indigo-600">{name}</span>
                </p>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md transition rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm transition rounded"
              >
                Login
              </button>
            )}
          </div>

          {/* CENTER */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Dynamic Form Builder
            </h2>
          </div>

          {/* RIGHT */}
          <button
            onClick={() => navigate("/showForms")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm transition rounded"
          >
            My Forms
          </button>

        </div>
      </div>

      {/* DRAG SECTION */}
      <div className="bg-white py-5">
        <div className="max-w-6xl mx-auto px-4">

          {/* MOBILE → horizontal scroll */}
          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible pb-2">

            {/* INPUT */}
            <div
              draggable
              onDragStart={dragStart}
              className="min-w-[220px] md:min-w-0 bg-white border rounded-xl shadow-sm p-4 cursor-grab hover:shadow-md transition"
            >
              <h3 className="font-medium text-gray-700 mb-3 text-sm">
                Input
              </h3>
              <input
                disabled
                placeholder="Text input"
                className="border w-full rounded-md px-3 py-2 text-sm bg-gray-50"
              />
            </div>

            {/* DROPDOWN */}
            <div
              draggable
              onDragStart={dragStart}
              className="min-w-[220px] md:min-w-0 bg-white border rounded-xl shadow-sm p-4 cursor-grab hover:shadow-md transition"
            >
              <h3 className="font-medium text-gray-700 mb-3 text-sm">
                Dropdown
              </h3>
              <select
                disabled
                className="border w-full rounded-md px-3 py-2 text-sm bg-gray-50"
              >
                <option>Select</option>
              </select>
            </div>

            {/* RADIO */}
            <div
              draggable
              onDragStart={dragStart}
              className="min-w-[220px] md:min-w-0 bg-white border rounded-xl shadow-sm p-4 cursor-grab hover:shadow-md transition"
            >
              <h3 className="font-medium text-gray-700 mb-3 text-sm">
                Radio
              </h3>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="radio" disabled />
                Option 1
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* DROP AREA BELOW */}
      <Outlet />
    </>
  );
}

export default InputFields;
