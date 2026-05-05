export const notifications = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  text:
    i === 0
      ? "Lorem ipsum rhoncus vitae ac a dolor adipiscing mattis magna..."
      : "Lorem ipsum rhoncus vitae ac a dolor adipiscing mattis magna arcu elementum id tortor.",
  time: "30 хв тому",
}));

export const navItems = [
  { label: "Головна", icon: "Grid2X2" },
  { label: "Проекти", icon: "FolderKanban" },
  { label: "Учасники", icon: "Users" },
  { label: "Сповіщення", icon: "Bell", active: true },
  { label: "Повідомлення", icon: "MessageSquare" },
];