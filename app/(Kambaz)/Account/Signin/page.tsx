"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as db from "../../Database";
import { setCurrentUser } from "../reducer";
import { redirect } from "next/navigation";
export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };
  return (
    <div id="wd-signin-screen" className="w-25">
      <h3>Sign in</h3>
      <FormControl defaultValue={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} id="wd-username" placeholder="username" className="mb-2" />
      <FormControl defaultValue={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} id="wd-password" placeholder="password" type="password" className="mb-2" />
      <Button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100 mb-2">Sign In</Button>
      <Link id="wd-signup-link" href="/Account/Signup">Sign Up</Link>
    </div>
  );
}
