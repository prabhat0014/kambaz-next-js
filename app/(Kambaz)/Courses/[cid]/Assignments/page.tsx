import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import FormLabel from "react-bootstrap/FormLabel";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import Container from "react-bootstrap/Container";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  return (
    <div>
      <AssignmentControls />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-homeworks">
        <ListGroupItem className="wd-wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-4" /> <b>ASSIGNMENTS</b>
            <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-assignment-group rounded-0 wd-lesson">
            <ListGroupItem className="wd-assignment-group-item p-3 ps-1 d-flex">
              <BsGripVertical className="me-2 fs-1 pt-3" />
              <MdOutlineAssignment className="me-2 fs-1 text-success pt-3" />
              <Container>
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-dark fs-4"
                >
                  <b>A1 - ENV + HTML</b>
                </Link>
                <br />
                <FormLabel className="text-danger">Multiple Modules</FormLabel>
                <FormLabel className="ps-1">
                  | <b>Not availabe until</b> May 6 at 12:00am |
                </FormLabel>
                <br />
                <FormLabel>
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </FormLabel>
              </Container>
              <Container className="flex-fill pe-0">
                <LessonControlButtons />
              </Container>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-group-item p-3 ps-1 d-flex">
              <BsGripVertical className="me-2 fs-1 pt-3" />
              <MdOutlineAssignment className="me-2 fs-1 text-success pt-3" />
              <Container>
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-dark fs-4"
                >
                  <b>A2 - CSS + BOOTSTRAP</b>
                </Link>
                <br />
                <FormLabel className="text-danger">Multiple Modules</FormLabel>
                <FormLabel className="ps-1">
                  | <b>Not availabe until</b> May 13 at 12:00am |
                </FormLabel>
                <br />
                <FormLabel>
                  <b>Due</b> May 20 at 11:59pm | 100 pts
                </FormLabel>
              </Container>
              <Container className="flex-fill pe-0">
                <LessonControlButtons />
              </Container>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-group-item p-3 ps-1 d-flex">
              <BsGripVertical className="me-2 fs-1 pt-3" />
              <MdOutlineAssignment className="me-2 fs-1 text-success pt-3" />
              <Container>
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-dark fs-4"
                >
                  <b>A3 - JAVASCRIPT + REACT</b>
                </Link>
                <br />
                <FormLabel className="text-danger">Multiple Modules</FormLabel>
                <FormLabel className="ps-1">
                  | <b>Not availabe until</b> May 20 at 12:00am |
                </FormLabel>
                <br />
                <FormLabel>
                  <b>Due</b> May 27 at 11:59pm | 100 pts
                </FormLabel>
              </Container>
              <Container className="flex-fill pe-0">
                <LessonControlButtons />
              </Container>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-wd-quizzes p-0 mb-5 fs-5 border-gray">
          <div className="wd-quizzes-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-4" /> <b>QUIZZES</b>
            <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-quizze-group rounded-0 wd-lesson"></ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-exams p-0 mb-5 fs-5 border-gray">
          <div className="wd-exams-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-4" /> <b>EXAMS</b>
            <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-exam-group rounded-0 wd-lesson"></ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-project p-0 mb-5 fs-5 border-gray">
          <div className="wd-projects-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-4" /> <b>PROJECTS</b>
            <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-project-group rounded-0 wd-lesson"></ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
