import {
  ChartArea,
  LayoutGrid,
  File,
  List,
  ListCheck,
  Network,
  Settings,
  Settings2,
  User,
  UserCircle,
} from "lucide-react";

// Admin Navigation Routes
export let adminNavigations = [
  {
    path: "/home",
    icon: <LayoutGrid />,
    title: "Dashboard",
  },
  {
    path: "/home/employees",
    icon: <UserCircle />,
    title: "Employees",
  },
  {
    path: "/home/dpt",
    icon: <Network />,
    title: "Department",
  },
  {
    path: "/home/docs",
    icon: <File />,
    title: "Document",
  },
  {
    path: "/home/tasks",
    icon: <List />,
    title: "Tasks",
  },

  {
    path: "/home/chat",
    icon: <ChartArea />,
    title: "Chat",
  },
  {
    path: "/home/setting",
    icon: <Settings />,
    title: "Setting",
  },
];

// Employee Navigation Routes
export let employeeNavigations = [
  {
    path: "/home",
    icon: <LayoutGrid />,
    title: "Dashboard",
  },
  {
    path: "/home/atn",
    icon: <User />,
    title: "Attendance",
  },
  {
    path: "/home/mytasks",
    icon: <ListCheck />,
    title: "My-Tasks",
  },
  {
    path: "/home/profile",
    icon: <User />,
    title: "Profile",
  },
  {
    path: "/home/chat",
    icon: <ChartArea />,
    title: "Chat",
  },
  {
    path: "/home/setting",
    icon: <Settings />,
    title: "Settings",
  },
];