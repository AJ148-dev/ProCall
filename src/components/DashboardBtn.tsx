"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboardIcon } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

function DashboardBtn() {
  const { isCandidate, isLoading } = useUserRole();

  if (isCandidate || isLoading) return null;

  return (
    <Link href={"/dashboard"}>
      <Button className="gap-2 font-semibold bg-blue-600 text-white " size={"sm"}>
        <LayoutDashboardIcon className="size-4" />
        Dashboard
      </Button>
    </Link>
  );
}
export default DashboardBtn;
