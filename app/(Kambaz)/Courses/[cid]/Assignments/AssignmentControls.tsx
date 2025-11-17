// import { Button, FormControl } from "react-bootstrap";
// import { FaPlus } from "react-icons/fa6";
// import { GoSearch } from "react-icons/go";

// export default function AssignmentControls() {
//   return (
//     <div id="wd-assignment-controls" className="d-flex text-nowrap">
//       <div className="me-auto">
//         <div className="position-relative">
//             <GoSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 fs-5" />
//             <FormControl type="text" size="lg" placeholder="Search..." className="ps-5" />
//         </div>
//       </div>
//       <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-assignemnt-group-btn">
//         <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
//         Group
//       </Button>
//       <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
//         <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
//         Assignment
//       </Button>
//     </div>
//   );
// }


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
            <Form className="me-1 float-start" id="wd-assignment-search">
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