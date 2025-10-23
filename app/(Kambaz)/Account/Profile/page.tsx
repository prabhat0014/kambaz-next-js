import Link from "next/link";
import { Form, FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen" className="w-25">
      <h3>Profile</h3>
      <FormControl id="wd-username" placeholder="username" className="mb-2" />
      <FormControl id="wd-password" placeholder="password" type="password" className="mb-2" />
      <FormControl id="wd-firstname" placeholder="first name" className="mb-2" />
      <FormControl id="wd-lastname" placeholder="last name" className="mb-2" />
      <FormControl id="wd-dob" type="date" placeholder="mm/dd/yyyy" className="mb-2"/>
      <FormControl id="wd-email" type="email" defaultValue="alice@wonderland.com" className="mb-2" />
      <FormSelect id="wd-role" className="mb-2">
          <option value="FACULTY" defaultChecked>
            Faculty
          </option>
          <option value="USER">User</option>
          <option value="STUDENT">Student</option>
        </FormSelect>
      <Link id="wd-signout-btn" href="/Account/Signin" className="btn btn-danger w-100 mb-2">Sign Out</Link>
    </div>
  );
}
