"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";

import { BsGripVertical } from "react-icons/bs";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Modal,
  Button,
} from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";

import { RootState } from "../../../store";

import GreenEdit from "./GreenEdit";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentControls from "./AssignmentControls";

import LessonControlButtons from "../Modules/LessonControlButtons";
import FacultyRoute from "@/app/(Kambaz)/Account/FacultyRoute";
import { FaTrash } from "react-icons/fa";

export default function Assignments() {
  const { cid } = useParams();
  const [isExpanded, setIsExpanded] = useState(true);
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  // Helper to open/close modal
  const confirmDelete = (assignmentId: string) =>
    setAssignmentToDelete(assignmentId);
  const handleClose = () => setAssignmentToDelete(null);
  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup id="wd-assignment-list" className="rounded-0">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <IoIosArrowDown />
            ASSIGNMENTS
            <FacultyRoute>
              <AssignmentControlButtons />
            </FacultyRoute>
          </div>

          {currentUser && 
          isExpanded &&
            assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroup
                  className="wd-lessons rounded-0"
                  key={assignment._id}
                >
                  <ListGroup.Item className="wd-lesson p-3 ps-1">
                    <Row>
                      <Col xs="auto">
                        <BsGripVertical className="me-2 fs-3" />
                      </Col>
                      <Col xs="auto">
                        <GreenEdit />
                      </Col>
                      <Col>
                      {((currentUser as any)?.role === "FACULTY") &&
                        <Link
                          href={`/Courses/${assignment.course}/Assignments/${assignment._id}`}
                          className="wd-assignment-link text-decoration-none text-dark fw-bold"
                        >
                          {assignment.title}
                        </Link>
                      }
                      {((currentUser as any)?.role !== "FACULTY") &&
                        <span>
                          {assignment.title}
                        </span>
                      }
                        <br />
                        <span style={{ color: "red" }}>Multiple Modules</span> |
                        {assignment.availableFromDate > new Date().toISOString() ? (
                          <span>
                            <b>Not available until</b>
                            {formatDate(assignment.dueDate)} at 12:00am |
                          </span>
                        ) : (
                          ""
                        )}
                        <br />
                        <b>Due</b> {formatDate(assignment.dueDate)} at 11:59pm |
                        -/{assignment.points} pts
                      </Col>

                      <FacultyRoute>
                        <Col xs="auto">
                          <FaTrash
                            className="text-danger me-2 mb-1"
                            onClick={() => confirmDelete(assignment._id)}
                          />
                          <LessonControlButtons />
                        </Col>
                      </FacultyRoute>
                    </Row>

                    <Modal
                      show={assignmentToDelete === assignment._id}
                      onHide={handleClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Assignment</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to remove the assignment
                        <b> {assignment.title}</b>?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            dispatch(deleteAssignment(assignment._id));
                            handleClose();
                          }}
                        >
                          Confirm, Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </ListGroup.Item>
                </ListGroup>
              ))}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
