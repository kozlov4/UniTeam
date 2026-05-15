export const notifications = [
  {
    id: 1,
    text: "Олександр Петренко надіслав заявку на приєднання до вашого проєкту 'AquaCore'.",
    time: "5 хв тому",
    type: "application",
    isNew: true,
  },
  {
    id: 2,
    text: "Вашу заявку на участь у проєкті 'Програмна система для контролю якості повітря' було схвалено!",
    time: "2 години тому",
    type: "status",
    isNew: true,
  },
  {
    id: 3,
    text: "Ірина Шевченко додала вас до команди проєкту 'Smart Campus'.",
    time: "5 годин тому",
    type: "team",
    isNew: false,
  },
  {
    id: 4,
    text: "Нове повідомлення у чаті проєкту 'Розробка CRM для університету'.",
    time: "Вчора, 18:42",
    type: "message",
    isNew: false,
  },
  {
    id: 5,
    text: "Вітаємо у UniTeam! Не забудьте заповнити свої навички у профілі, щоб отримувати кращі рекомендації.",
    time: "2 дні тому",
    type: "system",
    isNew: false,
  },
  {
    id: 6,
    text: "Максим Бондар відхилив вашу заявку на проєкт 'IoT Tracker'. Спробуйте податися в інші команди.",
    time: "3 дні тому",
    type: "status",
    isNew: false,
  },
  {
    id: 7,
    text: "Проєкт 'Drone Delivery System', за яким ви стежили, набрав повну команду.",
    time: "4 дні тому",
    type: "info",
    isNew: false,
  },
  {
    id: 8,
    text: "Ваш проєкт 'Mobile Bank Interface' отримав 3 нових перегляди за останню добу.",
    time: "Тиждень тому",
    type: "stats",
    isNew: false,
  },
];

export const navItems = [
  { label: "Головна", icon: "Grid2X2" },
  { label: "Проєкти", icon: "FolderKanban" },
  { label: "Учасники", icon: "Users" },
  { label: "Сповіщення", icon: "Bell", active: true },
  { label: "Повідомлення", icon: "MessageSquare" },
];
