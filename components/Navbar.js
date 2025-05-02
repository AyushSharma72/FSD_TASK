"use client";
import Link from "next/link";
import React,{useEffect,useState} from "react";
import { usePathname } from "next/navigation";
import { TbBrandNextjs } from "react-icons/tb";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "antd";
import {useRouter} from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); 
    router.push("/login");
  };

 const router = useRouter();
  return (
    <div className="flex w-[90%] sm:w-3/4 lg:w-1/2   justify-center sm:justify-between m-auto p-3 navbar  rounded">
      <TbBrandNextjs className="text-3xl hidden sm:block" />

      {
        <div className="flex items-center  gap-5 sm:gap-10">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-black font-bold text-sm sm:text-base"
                : "font-bold hover:text-black text-sm sm:text-base"
            }
          >
            Home
          </Link>

          <Link href="/create">
            {" "}
            <div
              className={`flex items-center gap-2 rounded-md p-2 transition-colors duration-300 ${
                pathname === "/create"
                  ? "bg-black text-white hover:bg-white hover:text-black  text-sm sm:text-base"
                  : "bg-white text-black hover:bg-black hover:text-white  text-sm sm:text-base"
              }`}
            >
              Create task
              <FaPlusCircle />
            </div>
          </Link>
          {user ? (
            <Link
              href="/login"
              className={
                pathname === "/login"
                  ? "text-black font-bold  text-sm sm:text-base"
                  : "font-bold hover:text-black  text-sm sm:text-base"
              }
            >
              <Button onClick={handleLogout}>Logout</Button>
            </Link>
          ) : (
            <Link
              href="/login"
              className={
                pathname === "/login"
                  ? "text-black font-bold  text-sm sm:text-base"
                  : "font-bold hover:text-black  text-sm sm:text-base"
              }
            >
              <Button> login</Button>
            </Link>
          )}
        </div>
      }
    </div>
  );
};

export default Navbar;
