import Link from "next/link";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link id="wd-account-signin-link" href="Signin" className="list-group-item active border-0"> Signin </Link>
      <Link id="wd-account-signup-link" href="Signup" className="list-group-item text-danger border-0"> Signup </Link>
      <Link id="wd-account-profile-link" href="Profile" className="list-group-item text-danger border-0"> Profile </Link>
    </div>
  );
}
