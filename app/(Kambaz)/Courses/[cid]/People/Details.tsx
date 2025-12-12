"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";
import { FaCheck, FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        onClose();
    };

    const [user, setUser] = useState<any>({});
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);

    const [name, setName] = useState("");
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState("");
    const [editingEmail, setEditingEmail] = useState(false);
    const [role, setRole] = useState("");
    const [editingRole, setEditingRole] = useState(false);

    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = { ...user, firstName, lastName };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        onClose();
    };

    const saveRole = async () => {
        const updatedUser = { ...user, role };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingRole(false);
        onClose();
    };

    const saveEmail = async () => {
        const updatedUser = { ...user, email };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingEmail(false);
        onClose();
    };


    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" /> </button>
            <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
            <div className="text-danger fs-4 wd-name">
                {!editing && (
                <FaPencil onClick={() => setEditing(true)}
                    className="float-end fs-5 mt-2 wd-edit" /> )}
                {editing && (
                <FaCheck onClick={() => saveUser()}
                    className="float-end fs-5 mt-2 me-2 wd-save" /> )}
                {!editing && (
                <div className="wd-name"
                    onClick={() => setEditing(true)}>
                    {user.firstName} {user.lastName}</div>)}
                {user && editing && (
                <FormControl className="w-50 wd-edit-name"
                    defaultValue={`${user.firstName} ${user.lastName}`}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") { saveUser(); }}}/>)}
            </div>
            <br />
            <div className="mb-2">
                <b>Roles:</b>
                {!editingRole && (
                <FaPencil
                    onClick={() => setEditingRole(true)}
                    className="float-end fs-5 wd-edit-role"
                />
                )}
                {editingRole && (
                <FaCheck
                    onClick={() => saveRole()}
                    className="float-end fs-5 me-2 wd-save-role text-success"
                    style={{ cursor: "pointer" }}
                />
                )}
                {!editingRole && (
                <span className="wd-roles" onClick={() => setEditingRole(true)}>
                    {" "}
                    {user.role}{" "}
                </span>
                )}
                {editingRole && (
                <select
                    value={role || user.role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-select wd-edit-role-select"
                    
                >
                    <option value="STUDENT">STUDENT</option>
                    <option value="TA">TA</option>
                    <option value="FACULTY">FACULTY</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                )}
            </div>
            <br />
            <div className="mb-2">
                <b>Email:</b>{" "}
                {!editingEmail && (
                <FaPencil
                    onClick={() => setEditingEmail(true)}
                    className="float-end fs-5 wd-edit-email"
                />
                )}
                {editingEmail && (
                <FaCheck
                    onClick={() => saveEmail()}
                    className="float-end fs-5 me-2 wd-save-email"
                />
                )}
                {!editingEmail && (
                <span className="wd-email" onClick={() => setEditingEmail(true)}>
                    {user.email}
                </span>
                )}
                {editingEmail && (
                <FormControl
                    type="email"
                    className="wd-edit-email-input"
                    defaultValue={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        saveEmail();
                    }
                    }}
                />
                )}
            </div>
            <br />
            <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
            <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
            <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
            <hr />
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
            <button onClick={onClose} className="btn btn-secondary float-end me-2 wd-cancel" > Cancel </button>
        </div>
    );
}
