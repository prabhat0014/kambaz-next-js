// "use client";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import FormLabel from "react-bootstrap/FormLabel";
// import FormControl from "react-bootstrap/FormControl";
// import FormSelect from "react-bootstrap/FormSelect";
// import FormCheck from "react-bootstrap/FormCheck";
// import Button from "react-bootstrap/Button";
// import { useParams } from "next/navigation";
// import * as db from "../../../../Database";

// export default function AssignmentEditor() {
//   const {aid} = useParams();
//   const thisAssignment = db.assignments.filter((assignment) => assignment._id === aid)[0];
//   return (
//     <div id="wd-assignments-editor">
//       <Form>
//         <FormLabel htmlFor="wd-name"> Assignment Name </FormLabel>
//         <Row className="mb-3">
//           <Col>
//             <FormControl id="wd-name" defaultValue={thisAssignment.title} />
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col>
//             <FormControl
//               id="wd-description"
//               as="textarea"
//               rows={10}
//               defaultValue={thisAssignment.description}
//             />
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <FormLabel htmlFor="wd-points" column sm={{ span: 1, offset: 1 }}>
//             Points
//           </FormLabel>
//           <Col sm={10}>
//             <FormControl id="wd-points" type="number" defaultValue={thisAssignment.points} />
//           </Col>
//         </Row>
//         <Row className="mb-0">
//           <FormLabel htmlFor="wd-group" column sm={{ span: 1, offset: 1 }}>
//             Assignment Group
//           </FormLabel>
//           <Col sm={10}>
//             <FormSelect id="wd-group">
//               <option value="AS" defaultChecked>
//                 ASSIGNMENTS
//               </option>
//               <option value="QS">QUIZZES</option>
//               <option value="ES">EXAMS</option>
//               <option value="PRIJ">PROJECT</option>
//             </FormSelect>
//           </Col>
//         </Row>
//         <Row className="mb-2">
//           <FormLabel
//             htmlFor="wd-display-grade-as"
//             column
//             sm={{ span: 1, offset: 1 }}
//           >
//             Display Grade as
//           </FormLabel>
//           <Col sm={10}>
//             <FormSelect id="wd-display-grade-as">
//               <option value="PERCENTAGE" defaultChecked>
//                 Percentage
//               </option>
//               <option value="POINT">Point</option>
//               <option value="Letter">Letter</option>
//             </FormSelect>
//           </Col>
//         </Row>
//         <fieldset className="mb-3">
//           <Row>
//             <FormLabel
//               htmlFor="wd-submission-type"
//               column
//               sm={{ span: 1, offset: 1 }}
//             >
//               Submission Type
//             </FormLabel>
//             <Col sm={10} className="wd-assignment-percentage p-3 rounded-2">
//               <FormSelect id="wd-submission-type" className="mb-3 ms-1">
//                 <option value="ONLINE" defaultChecked>
//                   Online
//                 </option>
//                 <option value="ONPAPER">On Paper</option>
//               </FormSelect>
//               <FormLabel>
//                 <b>Online Entry Options</b>
//               </FormLabel>
//               <FormCheck
//                 label="Test Entry"
//                 name="check-entry-option"
//                 id="wd-text-entry"
//                 className="mb-3"
//               />
//               <FormCheck
//                 label="Website URL"
//                 name="check-entry-option"
//                 id="wd-website-url"
//                 defaultChecked
//                 className="mb-3"
//               />
//               <FormCheck
//                 label="Media Recordings"
//                 name="check-entry-option"
//                 id="wd-media-recordings"
//                 className="mb-3"
//               />
//               <FormCheck
//                 label="Student Annotation"
//                 name="check-entry-option"
//                 id="wd-student-annotation"
//                 className="mb-3"
//               />
//               <FormCheck
//                 label="File Uploads"
//                 name="check-entry-option"
//                 id="wd-file-upload"
//                 className="mb-3"
//               />
//             </Col>
//           </Row>
//         </fieldset>
//         <fieldset className="mb-5">
//           <Row>
//             <FormLabel column sm={{ span: 1, offset: 1 }}>
//               Assign
//             </FormLabel>
//             <Col sm={10} className="wd-assignment-percentage p-3 rounded-2">
//               <FormLabel htmlFor="wd-assign-to" className="mb-1">
//                 <b>Assign to</b>
//               </FormLabel>
//               <FormControl
//                 id="wd-assign-to"
//                 defaultValue="Everyone"
//                 className="mb-2"
//               />
//               <FormLabel htmlFor="wd-due-date">
//                 <b>Due</b>
//               </FormLabel>
//               <FormControl
//                 id="wd-due-date"
//                 type="datetime-local"
//                 defaultValue={thisAssignment.dueDate}
//                 className="mb-2"
//               />
//               <Row>
//                 <Col xs={6}>
//                   <FormLabel htmlFor="wd-available-from">
//                     <b>Available from</b>
//                   </FormLabel>
//                   <FormControl
//                     id="wd-available-from"
//                     type="datetime-local"
//                     defaultValue={thisAssignment.startDate}
//                   />
//                 </Col>
//                 <Col xs={6}>
//                   <FormLabel htmlFor="wd-available-until">
//                     <b>Until</b>
//                   </FormLabel>
//                   <FormControl
//                     id="wd-available-until"
//                     type="datetime-local"
//                   />
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </fieldset>
//         <Row>
//           <hr />
//         </Row>
//         <Button
//           variant="danger"
//           size="sm"
//           className="me-1 float-end"
//           id="wd-save-btn"
//           as="a"
//           href={`/Courses/${thisAssignment.course}/Assignments`}
//         >
//           Save
//         </Button>
//         <Button
//           variant="secondary"
//           size="sm"
//           className="me-1 float-end"
//           id="wd-cancel-btn"
//           as="a"
//           href={`/Courses/${thisAssignment.course}/Assignments`}
//         >
//           Cancel
//         </Button>
//       </Form>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import * as db from "../../../../Database";

import { Button, Col, Form, Row } from "react-bootstrap";
// import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {

    const router = useRouter();
    
    const dispatch = useDispatch();
    const { cid, aid } = useParams();

    const isNew = aid === "New";

    const newAssignment = {
        title: "New Assignment",
        description: "New description",
        course: cid,
        points: 100,
        dueDate: new Date(),
        availableDate: new Date(),
        untilDate: new Date(),
    }

    const [assignment, setAssignment] = useState<any>({});
    const { assignments } = useSelector((state: any) => state.assignmentReducer);

    useEffect(() => {
        setAssignment(
            
            isNew
                ? newAssignment
                : assignments.find((assignment: any) => assignment._id === aid)
        );
    }, [aid, isNew, assignments]); // Adding dependencies

    const handleSave = (assignment: any) => {
        if (isNew) { 
            dispatch(addAssignment({ ...assignment, course: cid }));
        } else {
            dispatch(updateAssignment(assignment));
        }
        
        router.push(`/Courses/${cid}/Assignments`);
    }

    return (
        <Form id="wd-assignments-editor">


            <div>
                <Form.Group className="mb-2">
                    <Form.Label htmlFor="wd-name" >Assignment Name</Form.Label>
                    <Form.Control id="wd-name"
                        value={assignment?.title}
                        onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, title: e.target.value }))}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Control as="textarea" id="wd-description" rows={5}
                        defaultValue={assignment?.description}
                        onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, description: e.target.value }))}
                    />
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm="4" htmlFor="wd-points" className="text-sm-end">
                        Points
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control id="wd-points"
                            value={assignment?.points}
                            onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, points: e.target.value }))}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm="4" htmlFor="wd-group" className="text-sm-end">
                        Assignment Group
                    </Form.Label>
                    <Col sm="8">
                        <Form.Select id="wd-group" name="wd-group"
                            defaultValue={assignment?.group}
                            onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, group: e.target.value }))}
                        >
                            <option value="assignments">ASSIGNMENTS</option>
                            <option value="quizzes">QUIZZES</option>
                            <option value="exams">EXAMS</option>
                            <option value="project">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm="4" htmlFor="wd-display-grade-as" className="text-sm-end">
                        Display Grade as
                    </Form.Label>
                    <Col sm="8">
                        <Form.Select id="wd-display-grade-as" name="wd-display-grade-as"
                            defaultValue={assignment?.displayGradeAs}
                            onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, displayGradeAs: e.target.value }))}
                        >
                            <option value="percentage">Percentage</option>
                            <option value="letter">Letter</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm="4" htmlFor="wd-submission-type" className="text-sm-end">
                        Submission Type
                    </Form.Label>
                    <Col sm="8">
                        <Form.Select id="wd-submission-type" name="wd-submission-type"
                            defaultValue={assignment?.submissionType}
                            onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, submissionType: e.target.value }))}
                        >
                            <option value="online">Online</option>
                            <option value="pen and paper">Pen and paper</option>
                        </Form.Select>
                        <Form.Label column sm="8">
                            Online Entry Options
                        </Form.Label>
                        <Col sm="8">
                            <Form.Check id="wd-text-entry" name="wd-online-entry-options" label="Text Entry" value="TEXT ENTRY" />
                            <Form.Check id="wd-website-url" name="wd-online-entry-options" label="Website URL" value="WEBSITE URL" />
                            <Form.Check id="wd-media-recordings" name="wd-online-entry-options" label="Media Recordings" value="MEDIA RECORDINGS" />
                            <Form.Check id="wd-student-annotation" name="wd-online-entry-options" label="Student Annotation" value="STUDENT ANNOTATION" />
                            <Form.Check id="wd-file-upload" name="wd-online-entry-options" label="File Upload" value="FILE UPLOAD" />
                        </Col>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm="4" className="text-sm-end">
                        Assign
                    </Form.Label>
                    <Col sm="8">
                        <Form.Label htmlFor="wd-assign-to" >Assign to</Form.Label>
                        <Form.Control id="wd-assign-to"
                            value={assignment?.assignedTo}
                            onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, assignedTo: e.target.value }))}
                        />

                        <Form.Label htmlFor="wd-due-date" >Due</Form.Label>
                        <Form.Control type="date" id="wd-assign-to"
                            value={assignment?.dueDate}
                            onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, dueDate: e.target.value }))}
                        />

                        <Row className="mb-2">
                            <Col>
                                <Form.Label htmlFor="wd-available-from" >Available from</Form.Label>
                                <Form.Control type="date" id="wd-available-from"
                                    value={assignment?.availableFromDate}
                                    onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, availableFromDate: e.target.value }))}
                                />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="wd-available-until" >Until</Form.Label>
                                <Form.Control type="date" id="wd-available-until"
                                    value={assignment?.availableUntilDate}
                                    onChange={(e) => setAssignment((prevState: any) => ({ ...prevState, availableUntilDate: e.target.value }))}
                                />
                            </Col>

                        </Row>
                    </Col>
                </Form.Group>

                <hr />

                <div className="float-end mb-2 me-1">
                    <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
                    <Button 
                    onClick={() => handleSave(assignment)} 
                    className="me-2" variant="danger">
                        Save
                        </Button>
                </div>
            </div>
        </Form>
    );
}