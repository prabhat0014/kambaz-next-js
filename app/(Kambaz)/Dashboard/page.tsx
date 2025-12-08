"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse, unenrollCourse, setCourses, setEnrollements } from "../Courses/reducer";
import FacultyRoute from "../Account/FacultyRoute";
import {
  Row,
  Col,
  Card,
  Button,
  FormControl,
} from "react-bootstrap";
import { RootState } from "../store";
import * as client from "../Courses/client";

export default function Dashboard() {
  const {courses, userEnrollments} = useSelector((state: RootState) => state.coursesReducer);
  const {currentUser} = useSelector((state: RootState) => state.accountReducer);
  const fetchCourses = async () => {
    try{
      const courses = await client.fetchAllCourses();
      dispatch(setCourses(courses));
      const userEnrollments = await client.findMyCourses();
      if (userEnrollments !== null) {
        dispatch(setEnrollements(userEnrollments));
      } else {
        dispatch(setEnrollements([]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number", startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const [showEnrolled, setShowEnrolled] = useState(true);
  const isEnrolled = (courseId: string) => {
    if (!userEnrollments || userEnrollments.length === 0) {
      return false;
    }
    return userEnrollments.some((course: any) => course._id === courseId);
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
      if (c._id === course._id) { 
        return course; 
      } else { 
        return c;
      }
    })));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1><hr />
      <FacultyRoute>
        <h5>
          New Course
          <button className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => {onAddNewCourse}} >
            Add
          </button>
          <button className="btn btn-warning float-end me-2"
            onClick={onUpdateCourse} id="wd-update-course-click">
            Update
          </button>
          <br /><br />
          <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl value={course.description} as="textarea" rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
        </h5>
        <hr />
      </FacultyRoute>
      <h2 id="wd-dashboard-published">
        Published Courses ({(userEnrollments !== null) && (showEnrolled ? userEnrollments : courses).length})
        <Button className="float-end me-2" variant="primary"
          onClick={() => setShowEnrolled(!showEnrolled)}>
          Enrollments
        </Button>
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {(userEnrollments !== null) && (showEnrolled ? userEnrollments : courses)
            .map((course: any) => (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link href={isEnrolled(course._id) ? (`/Courses/${course._id}/Home`) : ("")} className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <Card.Img src={course.image} variant="top" width="100%" height={160} />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.name}</Card.Title>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>{course.description}</Card.Text>
                      <Button variant="primary" className="float-start mb-3" hidden={isEnrolled(course._id) ? (false) : (true)}>Go</Button>

                      {showEnrolled ? (
                        <FacultyRoute>
                          <Button onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(course._id);
                          }} className="float-end"
                            variant="danger"
                            id="wd-delete-course-click">
                            Delete
                          </Button>
                          <Button id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            variant="warning"
                            className="me-2 float-end" >
                            Edit
                          </Button>
                        </FacultyRoute>
                      ) : (
                        <Button
                          className="float-end mb-3" variant={isEnrolled(course._id) ? "danger" : "success"}
                          onClick={(event) => {
                            event.preventDefault();
                            if (isEnrolled(course._id)) {
                              dispatch(unenrollCourse({ userId: (currentUser as any)?._id, courseId: course._id }));
                            } else {
                              dispatch(enrollCourse({ userId: (currentUser as any)?._id, courseId: course._id }));
                            }
                          }}>
                          {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  );
}
