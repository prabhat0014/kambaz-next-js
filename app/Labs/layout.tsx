"use client";
import { ReactNode } from "react";
import TOC from "./toc";
import store from "./store";
import { Provider } from "react-redux";
export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div>
        <TOC />
        <div className="container-fluid">{children}</div>
      </div>
    </Provider>
  );
}
