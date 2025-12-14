"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setCourses, setUserEnrollments } from "../Courses/reducer";
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
        dispatch(setUserEnrollments(userEnrollments));
      } else {
        dispatch(setUserEnrollments([]));
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
    name: "New Course", number: "RS4550", startDate: "2023-09-10", endDate: "2023-12-15",
    image: "../images/reactjs.jpg", description: "New Description", department: "D123", credits: 4, modules: []
  });
  const [showEnrolled, setShowEnrolled] = useState(true);
  const isEnrolled = (courseId: string) => {
    if (!userEnrollments || userEnrollments.length === 0) {
      return false;
    }
    return userEnrollments.some((course: any) => course._id === courseId);
  };

  const onAddNewCourse = async (course: any) => {
    await client.createCourse(course);
    fetchCourses();
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    fetchCourses();
  };

  const onEnrollCourse = async (course: any) => {
    await client.enrollCourse(course);
    fetchCourses();
  }

  const onDeEnrollCourse = async (course: any) => {
    await client.deEnrollCourse(course);
    fetchCourses();
  }

  const onUpdateCourse = async (course: any) => {
    client.updateCourse(course);
    fetchCourses();
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1><hr />
      <FacultyRoute>
        <h5>
          New Course
          <button className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => {onAddNewCourse(course)}} >
            Add
          </button>
          <button className="btn btn-warning float-end me-2"
            onClick={() => onUpdateCourse(course)} id="wd-update-course-click">
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
                              onDeEnrollCourse(course);
                            } else {
                              onEnrollCourse(course);
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