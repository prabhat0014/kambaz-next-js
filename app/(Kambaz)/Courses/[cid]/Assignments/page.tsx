"use client";
import * as db from "../../../Database";
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
import { useParams } from "next/navigation";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(
    (assignment: any) => assignment.course === cid
  );
  return (
    <div>
      <AssignmentControls />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-homeworks">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-4" />
            <b>ASSIGNMENTS</b>
            <AssignmentControlButtons />
          </div>
          <ListGroup id="wd-assignment-group rounded-0 wd-lesson">
            {assignments.map((assignment) => (
              <ListGroupItem className="wd-assignment-group-item p-3 ps-1 d-flex">
                <BsGripVertical className="me-2 fs-1 pt-3" />
                <MdOutlineAssignment className="me-2 fs-1 text-success pt-3" />
                <Container>
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link text-dark fs-4"
                  >
                    <b>{assignment.title}</b>
                  </Link>
                  <br />
                  <FormLabel className="text-danger me-2">
                    Multiple Modules
                  </FormLabel>
                  <FormLabel>
                    <b>Not available until </b>
                    {assignment.startDate.split('T')[0]} | <b>Due</b> {assignment.dueDate.split('T')[0]} |{" "}
                    {assignment.points} pts
                  </FormLabel>
                </Container>
                <Container className="flex-fill pe-0">
                  <LessonControlButtons />
                </Container>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
