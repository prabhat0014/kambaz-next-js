"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const {cid} = useParams();
  const pathName = usePathname();
  const links = [
    { label: "Home", path: "Home" },
    { label: "Modules", path: "Modules" },
    { label: "Piazza", path: "Piazza" },
    { label: "Zoom", path: "Zoom" },
    { label: "Assignments", path: "Assignments" },
    { label: "Quizzes", path: "Quizzes" },
    { label: "Grades", path: "Grades" },
    { label: "People", path: "People" },
  ];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.label}
          id={`wd-course-${link.label.toLowerCase()}-link`}
          href={`/Courses/${cid}/${link.path}`}
          className={`list-group-item border-0 ${
            pathName.includes(link.label) ? "active" : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
