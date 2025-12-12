"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["Profile", "Users"] : ["Signin", "Signup"];
  const pathName = usePathname();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link id={`wd-account-${link.toLowerCase()}-link`} key={link} href={link} className={`list-group-item border-0 ${pathName.includes(link)? "active": "text-danger"}`}>{link}</Link>
      ))}
    </div>
  );
}
