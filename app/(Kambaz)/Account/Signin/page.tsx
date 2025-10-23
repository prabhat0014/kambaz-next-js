import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signin() {
  return (
    <div id="wd-signin-screen" className="w-25">
      <h3>Sign in</h3>
      <FormControl id="wd-username" placeholder="username" className="mb-2" />
      <FormControl id="wd-password" placeholder="password" type="password" className="mb-2" />
      <Link id="wd-signin-btn" href="/Dashboard" className="btn btn-primary w-100 mb-2">Sign In</Link>
      <Link id="wd-signup-link" href="/Account/Signup">Sign Up</Link>
    </div>
  );
}
