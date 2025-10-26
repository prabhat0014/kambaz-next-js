"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AccountNavigation() {
  const pathName = usePathname();
  const links = [
    { href: "Signin", label: "Signin"},
    { href: "Signup", label: "Signup"},
    { href: "Profile", label: "Profile"},
  ];
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link id={`wd-account-${link.label.toLowerCase()}-link`} href={link.href} className={`list-group-item border-0 ${pathName.includes(link.label)? "active": "text-danger"}`}>{link.label}</Link>
      ))}
    </div>
  );
}
