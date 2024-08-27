

import Home from "@/components/icons/home";
import Workflows from "@/components/icons/workflows";
import Settings from "@/components/icons/settings";
import Logs from "@/components/icons/clipboard";

export const menuOptions = [
  { name: "Dashboard", Component: Home, href: "/dashboard" },
  { name: "Tasks", Component: Workflows, href: "/tasks" },
  { name: "Settings", Component: Settings, href: "/setting" },
  { name: "Feedback", Component: Logs, href: "/feedback" },
];
