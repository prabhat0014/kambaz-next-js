
import { createSlice } from "@reduxjs/toolkit";
import { courses, enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    courses: courses,
    enrollments: enrollments,
    userEnrollments: [],
};
const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addNewCourse: (state, { payload: {userId, course} }) => {
            const newCourseId = uuidv4();
            const newCourse = { ...course, _id: newCourseId };
            state.courses = [...state.courses, newCourse] as any;
            const newEnrollment: any = {
                _id: uuidv4(),
                user: userId,
                course: newCourseId,
            };
            state.enrollments = [...enrollments, newEnrollment] as any;
        },
        deleteCourse: (state, { payload: courseId }) => {
            state.courses = state.courses.filter(
                (course: any) => course._id !== courseId
            );
            unenrollCourse(courseId);
        },
        updateCourse: (state, { payload: course }) => {
            state.courses = state.courses.map((c: any) =>
                c._id === course._id ? course : c
            ) as any;
        },
        setCourses: (state, { payload: courses }) => {
            state.courses = courses;
        },
        setEnrollements: (state, { payload: enrolledCourses }) => {
            state.userEnrollments = enrolledCourses;
        },
        enrollCourse: (state, { payload: { userId, courseId } }) => {
            const newEnrollment: any = {
                _id: uuidv4(),
                user: userId,
                course: courseId,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        unenrollCourse: (state, { payload: { userId, courseId } }) => {
            state.enrollments = state.enrollments.filter((e: any) =>
                e.user !== userId || e.course !== courseId
            );
        },
    },
});
export const { addNewCourse, deleteCourse, updateCourse, enrollCourse, unenrollCourse, setCourses, setEnrollements } =
    coursesSlice.actions;
export default coursesSlice.reducer;