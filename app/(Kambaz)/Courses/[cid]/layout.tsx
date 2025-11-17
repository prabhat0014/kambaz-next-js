"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
export default function CoursesLayout({children}: { children: ReactNode }) {
  const { cid } = useParams();
  const {courses} = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [open, setOpen] = useState(true);
  const toggleSideBar = () => {
    console.log("inside");
    setOpen(!open);
  }
  return (
    <div id="wd-courses">
      <div className="d-flex align-items-center">
        <h2 className="text-danger ms-2">
          <FaAlignJustify onClick={toggleSideBar} className="me-4 fs-4 mb-1 float-left" />
          <Breadcrumb course={course} />
        </h2>
      </div>
      <hr />
      <div className="d-flex">
        <div className={`${open ? '' : 'd-none'}`}>
          <CourseNavigation />
        </div>
        <div className="flex-fill ms-2">{children}</div>
      </div>
    </div>
  );
}
