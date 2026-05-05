import {
  Grid2X2,
  FolderKanban,
  Users,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

export const menuItems = [
  { path: "/dashboard", label: "Головна", icon: Grid2X2 },
  { path: "/projects", label: "Проєкти", icon: FolderKanban },
  { path: "/participants", label: "Учасники", icon: Users },
  { path: "/notifications", label: "Сповіщення", icon: Bell },
  { path: "/messages", label: "Повідомлення", icon: MessageSquare },
];

export const footerItems = [
  { path: "/settings", label: "Налаштування", icon: Settings, type: "button" },
  { path: "/login", label: "Вихід", icon: LogOut, className: "logout" },
];
