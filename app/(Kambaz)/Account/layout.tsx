import { ReactNode } from "react";
import AccountNavigation from "./Navigation";
export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-account">
      <div className="d-flex">
        <div>
          <AccountNavigation />
        </div>
        <div className="p-3 flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
