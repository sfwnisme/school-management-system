// "use client";

import {
  Book,
  BookPlus,
  GraduationCap,
  Grid2X2,
  Grid2x2Check,
  House,
  LucideIcon,
  UserPlus,
  Users,
} from "lucide-react";

type NavlinksType = {
  title: string;
  href: string;
  icon?: LucideIcon | null;
};

export const navLinks: NavlinksType[] = [
  {
    title: "main page",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "add user",
    href: "/dashboard/users/add",
    icon: UserPlus,
  },
  {
    title: "instructors",
    href: "/dashboard/instructors",
    icon: Users,
  },
  {
    title: "add instructor",
    href: "/dashboard/instructors/add",
    icon: UserPlus,
  },
  {
    title: "students",
    href: "/dashboard/students",
    icon: GraduationCap,
  },
  {
    title: "add student",
    href: "/dashboard/students/add",
    icon: UserPlus,
  },
  {
    title: "departments",
    href: "/dashboard/departments",
    icon: Grid2X2,
  },
  {
    title: "add department",
    href: "/dashboard/departments/add",
    icon: Grid2x2Check,
  },
  {
    title: "subjects",
    href: "/dashboard/subjects",
    icon: Book,
  },
  {
    title: "add subject",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
];

export const userAvatarNavlinks = {
  protected: [
    {
      title: "profile",
      href: "/profile",
      roles: ["Admin", "User", "HR"],
    },
    {
      title: "dashboard",
      href: "/dashboard",
      roles: ["Admin"],
    },
  ],
  public: [
    {
      title: "login",
      href: "/login",
    },
    {
      title: "home",
      href: "/",
    },
  ],
};
