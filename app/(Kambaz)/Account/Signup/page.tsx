"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };
  return (
    <div id="wd-signup-screen" className="w-25">
      <h3>Sign up</h3>
      <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
             className="mb-2" id="wd-username" placeholder="username" />
      <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
             className="mb-2" id="wd-password" placeholder="password" type="password"/>
      <Button onClick={signup} id="wd-signup-btn" className="btn btn-primary mb-2 w-100"> Sign up </Button>
      <Link href="/Account/Signin" className="wd-signin-link">Sign In</Link>
    </div>
);}
