"use client";

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
import { handleLogout } from "./actions";

// import SchoolIcon from "@mui/icons-material/School";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import DoorBackIcon from "@mui/icons-material/DoorBack";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
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
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },

  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },

  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "test overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  {
    title: "last overflow only",
    href: "/dashboard/subjects/add",
    icon: BookPlus,
  },
  
];

export const userAvatarNavlinks = [
  {
    title: "profile",
    href: "/profile",
    protected: true,
    divider: false,
    action: "",
    type: "link",
  },
  {
    title: "dashboard",
    href: "/dashboard",
    protected: true,
    divider: false,
    action: "",
    type: "link",
  },
  {
    title: "options",
    href: "/options",
    protected: true,
    divider: false,
    action: "",
    type: "link",
  },
  {
    title: "logout",
    href: "/logout",
    protected: true,
    divider: true,
    // action: handleLogout,
    type: "button",
  },
  {
    title: "login",
    href: "/login",
    protected: false,
    divider: false,
    action: "",
    type: "link",
  },
  {
    title: "register",
    href: "/register",
    protected: false,
    divider: false,
    action: "",
    type: "link",
  },
];
