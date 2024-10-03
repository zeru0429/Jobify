import { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
const AdminSidebar = () => {
  const [currentView, setCurrentView] = useState("");
  const handleToggleView = (view: string) => {
    setCurrentView(currentView === view ? "" : view);
  };
  return (
    <>
      <List className="dark:bg-zinc-950 dark:text-white  h-full">
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <Link to="/admin/" onClick={() => handleToggleView("dashbord")}>
                <a
                  className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white dark:bg-neutral-700 dark:text-white"
                  href="#"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <Link to="/admin/user" onClick={() => handleToggleView("user")}>
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  aria-expanded="true"
                  aria-controls="users-accordion"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Admin
                </button>
              </Link>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/category"
                onClick={() => handleToggleView("category")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  aria-expanded="true"
                  aria-controls="users-accordion"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"
                    ></path>
                  </svg>
                  Company
                </button>
              </Link>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/sub-category"
                onClick={() => handleToggleView("subcategory")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  aria-expanded="true"
                  aria-controls="users-accordion"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M9 9H5V5h4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-1 6h-4V5h4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6H5v-4h4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2"
                    ></path>
                  </svg>
                  Applications
                </button>
              </Link>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/template"
                onClick={() => handleToggleView("template")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  aria-expanded="true"
                  aria-controls="users-accordion"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M26 6v4H6V6zm0-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M10 16v10H6V16zm0-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2m16 2v10H16V16zm0-2H16a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2"
                    ></path>
                  </svg>
                  Jobs
                </button>
              </Link>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/report"
                onClick={() => handleToggleView("report")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  aria-expanded="true"
                  aria-controls="users-accordion"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 32 32"
                  >
                    <g fill="currentColor">
                      <path d="M25 5h-.17v2H25a1 1 0 0 1 1 1v20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h.17V5H7a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3"></path>
                      <path d="M23 3h-3V0h-8v3H9v6h14zm-2 4H11V5h3V2h4v3h3z"></path>
                      <path
                        d="M10 13h12v2H10zm0 5h12v2H10zm0 5h12v2H10z"
                        className="ouiIcon__fillSecondary"
                      ></path>
                    </g>
                  </svg>
                  Report
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </List>
    </>
  );
};

export default AdminSidebar;
