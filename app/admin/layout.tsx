'use client';
import type React from "react";
import { redirect } from "next/navigation";
import { RootState } from "../store";
import { useSelector } from "react-redux";



export default  function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated ,role} = useSelector((state: RootState) => state.auth)
  console.log(isAuthenticated);
  console.log(role);
  
  
  if (!isAuthenticated || role !== "ROLE_ADMIN") {
    return <h1>Access Denied</h1>;
  }
  return <>{children}</>;
}
