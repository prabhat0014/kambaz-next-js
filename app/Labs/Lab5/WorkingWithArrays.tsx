"use client";
import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const API = `${HTTP_SERVER}/lab5/todos`;
    return (
        <div id="wd-working-with-arrays">
            <h2>Working with Arrays</h2>
            <h3>Retrieving Arrays</h3>
            <a href={API} id="wd-retrieve-todos" className="btn btn-primary">Get Todos</a>
            <hr />
            <h3>Retrieving an Item from an Array by ID</h3>
            <a href={`${API}/${todo.id}`} id="wd-retrieve-todo-by-id" className="btn btn-primary float-end">Get Todo by ID</a>
            <FormControl id="wd-todo-id" defaultValue={todo.id} className="w-50" onChange={(e) => setTodo({...todo, id: e.target.value})} />
            <hr />
            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`} id="wd-retrieve-complete-todos" className="btn btn-primary">Get Completed Todos</a>
            <hr />
            <h3>Creating new Items in an Array</h3>
            <a href={`${API}/create`} id="wd-add-new-todos" className="btn btn-primary">Create Todo</a>
            <hr />
            <h3>Removing from an Array</h3>
            <a href={`${API}/${todo.id}/delete`} id="wd-remove-todo" className="btn btn-primary float-end">Remove Todo with ID = {todo.id}</a>
            <FormControl defaultValue={todo.id} className="w-50" onChange={(e) => setTodo({...todo, id: e.target.value})} />
            <hr />
            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`} id="wd-update-todo-title" className="btn btn-primary float-end">Update Todo Title</a>
            <FormControl defaultValue={todo.id} className="w-25 float-start me-2" onChange={(e) => setTodo({...todo, id: e.target.value})} />
            <FormControl defaultValue={todo.title} className="w-50 float-start" onChange={(e) => setTodo({...todo, title: e.target.value})} />
            <br /><br />
            <a href={`${API}/${todo.id}/completed/${todo.completed}`} id="wd-update-todo-status" className="btn btn-primary float-end">Update Todo Status</a>
            <Form.Check label={todo.completed?`Completed` : `Not Completed`} checked={todo.completed} className="w-25 float-start" onChange={(e) => setTodo({...todo, completed: e.target.checked})} />
            <br /><br />
            <a href={`${API}/${todo.id}/completed/${todo.completed}`} id="wd-update-todo-status" className="btn btn-primary float-end">Update Todo Description</a>
            <FormControl defaultValue={todo.description} className="w-75 float-start" onChange={(e) => setTodo({...todo, description: e.target.value})} />
            <br /><br />
            <hr />
        </div>
    );
}