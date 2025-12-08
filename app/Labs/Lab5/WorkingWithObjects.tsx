"use client";
import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 1, name: "ExpressJS Module",
        description: "Learn to build web applications",
        course: "Web Development",
    });
    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
    return (
        <div id="wd-working-with-objects">
            <h3>Working with Objects</h3>
            <h4>Retrieving Objects</h4>
            <a href={ASSIGNMENT_API_URL} id="wd-retrieve-assignments" className="btn btn-primary">Get Assignment</a>
            <h4>Retrieving Properties</h4>
            <a href={`${ASSIGNMENT_API_URL}/title`} id="wd-retrieve-assignment-title" className="btn btn-primary">Get Title</a>
            <h4>Modifying Properties</h4>
            <a href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`} id="wd-update-assignment-title" className="btn btn-primary float-end">Update Title</a>
            <FormControl className="w-75" id="wd-assignment-title" defaultValue={assignment.title} onChange={(e) => setAssignment({...assignment, title: e.target.value})} />
            <h4>Modifying Score</h4>
            <a href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`} id="wd-update-assignment-score" className="btn btn-primary float-end">Update Score</a>
            <FormControl className="w-75" id="wd-assignment-score" defaultValue={assignment.score.toString()} onChange={(e) => setAssignment({...assignment, score: parseInt(e.target.value)})} />
            <h4>Modifying Status</h4>
            <a href={`${ASSIGNMENT_API_URL}/status/${assignment.completed}`} id="wd-update-assignment-status" className="btn btn-primary float-end">Update Status</a>
            <Form.Check label={assignment.completed ? `Completed` : `Not Completed`} id="wd-assignment-status" checked={assignment.completed} onChange={(e) => setAssignment({...assignment, completed: e.target.checked})} />
            <div className="me-2 w-50">
                {assignment.completed ? <p>Completed</p> : <p>Not Completed</p>}
            </div>
            <hr />
            <h4>Retrieving Module</h4>
            <a href={MODULE_API_URL} id="wd-retrieve-module" className="btn btn-primary">Get Module</a>
            <h4>Retrieving Module Name</h4>
            <a href={`${MODULE_API_URL}/name`} id="wd-retrieve-module-name" className="btn btn-primary">Get Name</a>
            <h4>Modifying Module Name</h4>
            <a href={`${MODULE_API_URL}/name/${module.name}`} id="wd-update-assignment-title" className="btn btn-primary float-end">Update Name</a>
            <FormControl className="w-75" id="wd-module-name" defaultValue={module.name} onChange={(e) => setModule({...module, name: e.target.value})} />
            <h4>Modifying Module Description</h4>
            <a href={`${MODULE_API_URL}/description/${module.description}`} id="wd-update-assignment-description" className="btn btn-primary float-end">Update Description</a>
            <FormControl className="w-75" id="wd-module-description" defaultValue={module.description} onChange={(e) => setModule({...module, description: e.target.value})} />
            
            <hr />
        </div>
    );
}