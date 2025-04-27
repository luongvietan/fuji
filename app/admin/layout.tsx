import type React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BaseURL } from "../utils/baseUrl";
import axios from "axios";

export const metadata: Metadata = {
  title: "Admin Dashboard - Fuji Fruit",
  description: "Quản lý cửa hàng trái cây Fuji Fruit",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const res = await axios.get(`${BaseURL.auth}/verify`, {
      headers: { Cookie: `token=${token}` },
    });

    const data = res.data;

    if (res.status !== 200 || data.role !== "admin") {
      redirect("/unauthorized");
    }
  } catch (error) {
    console.error("Verification failed:", error);
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
