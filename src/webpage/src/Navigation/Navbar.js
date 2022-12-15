import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import "./output.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Recommendations from "../Pages/Recommendations";
import LoginPage from "../Pages/LoginPage";
import CourseSearch from "../Pages/CourseSearch";
import HomePage from "../Pages/HomePage";
import UserProfile from "../Pages/UserProfile";
import LogoutPage from "../Pages/LogoutPage";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {

  const [actualID, setActualID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const responseValue = await fetch(process.env.REACT_APP_API_ENDPOINT + "/currentUser/", { credentials: 'include'})
      if(!responseValue.ok) {
            const message = "An error occured"
            console.log("Error:" + responseValue.statusText);
            window.userID = "";
            return;
      }
      const records2 = await responseValue.json();
      setActualID(records2.data.userId);
      window.userID = actualID;
    }
    fetchData().catch(console.error);
  })

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/en/9/90/Johns_Hopkins_Blue_Jays.svg"
                    alt="HopCourses"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/en/9/90/Johns_Hopkins_Blue_Jays.svg"
                    alt="HopCourses"
                  />
                  <text className="text-gray-300">
                    HopCourses
                  </text>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <CustomLink key={HomePage} href={"/"} className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )} to="/">HomePage</CustomLink>
                    <CustomLink key={CourseSearch} href={"/Courses"} className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )} to="/Courses">Courses</CustomLink>
                    <CustomLink key={Recommendations} href={"/Recommendations"} className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )} to="/Recommendations">Recommendations</CustomLink>
                  </div>
                </div>
              </div>
                {actualID != ""
                  ? <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
                      <CustomLink key={UserProfile} href={"/Profile"} className={classNames(
                          "bg-gray-800 flex text-sm rounded-full",
                          "block px-1 py-2 text-sm text-gray-700"
                        )} to="/Profile">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                          alt=""
                        />
                      </CustomLink>
                      <CustomLink key={LogoutPage} href={"/Logout"} className="bg-gray-800 p-1 rounded-full text-gray-300 hover:text-white" to="/Logout">Logout</CustomLink>
                    </div>
                  : <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
                      <CustomLink key={LoginPage} href={"/Login"} className="bg-gray-800 p-1 rounded-full text-gray-300 hover:text-white" to="/Login">Login</CustomLink>
                    </div>
                }
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex space-x-4">
                <CustomLink key={HomePage} href={"/"} className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-2 py-2 rounded-md text-sm font-medium"
                  )} to="/">HomePage</CustomLink>
                <CustomLink key={CourseSearch} href={"/Courses"} className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-2 py-2 rounded-md text-sm font-medium"
                  )} to="/Courses">Courses</CustomLink>
                <CustomLink key={Recommendations} href={"/Recommendations"} className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-2 py-2 rounded-md text-sm font-medium"
                  )} to="/Recommendations">Recommendations</CustomLink>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
  
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}
