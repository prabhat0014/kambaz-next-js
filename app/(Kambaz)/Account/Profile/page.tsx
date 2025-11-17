"use client";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state: RootState) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) {
      return redirect("/Account/Signin");
    }
    setProfile(currentUser);
  };
  const signOut = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div id="wd-profile-screen" className="w-25">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl id="wd-username" defaultValue={profile.username} onChange={(e) => setProfile({...profile, username: e.target.value})} className="mb-2" />
          <FormControl id="wd-password" defaultValue={profile.password} onChange={(e) => setProfile({...profile, password: e.target.value})} type="password" className="mb-2" />
          <FormControl id="wd-firstname" defaultValue={profile.firstname} onChange={(e) => setProfile({...profile, firstname: e.target.value})} className="mb-2" />
          <FormControl id="wd-lastname" defaultValue={profile.lastname} onChange={(e) => setProfile({...profile, lastname: e.target.value})} className="mb-2" />
          <FormControl id="wd-dob" type="date" defaultValue={profile.dob} onChange={(e) => setProfile({...profile, dob: e.target.value})} className="mb-2"/>
          <FormControl id="wd-email" type="email" defaultValue={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="mb-2" />
          <FormSelect id="wd-role" value={profile.role}  className="mb-2" onChange={(e) => setProfile({...profile, role: e.target.value})}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
          <Button onClick={signOut} id="wd-signout-btn" className="btn btn-danger w-100 mb-2">Sign Out</Button>
        </div>
      )}
    </div>
  );
}
