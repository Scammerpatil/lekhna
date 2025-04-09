import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconUser,
  IconFileText,
  IconSearch,
  IconChecklist,
  IconChartBar,
  IconSettings,
  IconHelpCircle,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/user/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "My Profile",
    path: "/user/profile",
    icon: <IconUser width="24" height="24" />,
  },
  {
    title: "Create Resume",
    path: "/user/create-resume",
    icon: <IconFileText width="24" height="24" />,
  },
  {
    title: "Recommended Jobs",
    path: "/user/recommended-jobs",
    icon: <IconChecklist width="24" height="24" />,
  },
  {
    title: "Job Description Match",
    path: "/user/jd-match",
    icon: <IconSearch width="24" height="24" />,
  },
];
