"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GiAnarchy } from "react-icons/gi";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 items-center h-14">
      <Link href="/">
        <GiAnarchy />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ href, label }) => {
          return (
            <Link
              className={`${
                href === currentPath ? "text-zinc-900" : "text-zinc-500"
              } text-zinc-500 hover:text-zinc-900 transition-colors`}
              key={href}
              href={href}
            >
              {label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
