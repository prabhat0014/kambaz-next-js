"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroup";
import { FaPlus } from "react-icons/fa6";

import { useParams, useRouter } from "next/navigation";
import FacultyRoute from "../../../Account/FacultyRoute";

export default function AssignmentControls() {
    const { cid } = useParams();
    const router = useRouter();

    const handleAssignmentEditor = () => {
        router.push(`/Courses/${cid}/Assignments/New`);
    };
    return (
        <div id="wd-assignment-controls" className="text-nowrap">
            <Form className="me-2 float-start" id="wd-assignment-search">
                <InputGroup>
                    <InputGroupText className="bg-transparent border-end-0">
                        <FaMagnifyingGlass />
                    </InputGroupText>
                    <Form.Control placeholder="Search.." className="border-start-0" />
                </InputGroup>
            </Form>

            <FacultyRoute>
                <Button variant="danger" size="lg" className="me-1 float-end"
                    onClick={handleAssignmentEditor} id="wd-add-assignment-btn">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
                </Button>
                <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Group
                </Button>
            </FacultyRoute>
        </div>
    );
}