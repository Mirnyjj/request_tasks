import type { Request, Priority, Status, Stage } from "./types";

export const mockRequests: Request[] = [
  {
    id: "КС-0002",
    pharmacyNumber: "065",
    pharmacyAddress: "Геленджик Островского 7",
    createdAt: 1753001745000,
    priority: "high",
    topic: "Поломка кассы",
    category: "Кассы",
    technician: null,
    reactionTime: 1753001913000,
    resolutionTime: null,
    status: "new",
  },
  {
    id: "ХЛ-0002",
    pharmacyNumber: "150",
    pharmacyAddress: "Кореновск Красная 108",
    createdAt: 1753001745000,
    priority: "medium",
    topic: "Холодильник сильно гудит",
    category: "Холодильники",
    technician: "Федоровский Н.",
    reactionTime: 1753002046000,
    resolutionTime: 1753007489000,
    status: "in-progress",
  },
  {
    id: "КН-0002",
    pharmacyNumber: "045",
    pharmacyAddress: "Тимашевск Интернац 3Б",
    createdAt: 1753001745000,
    priority: "low",
    topic: "Конденсат на внутреннем блоке",
    category: "Кондиционеры",
    technician: "Максимов П.",
    reactionTime: 1753002046000,
    resolutionTime: 1753010762000,
    status: "ready",
  },
  {
    id: "ИЗ-0002",
    pharmacyNumber: "164",
    pharmacyAddress: "РнД Сельмаш 92",
    createdAt: 1753001745000,
    priority: "critical",
    topic: "Нужно поверить гигрометр",
    category: "Изм. оборуд.",
    technician: "Алексеев М.",
    reactionTime: 1753002046000,
    resolutionTime: 1753010762000,
    status: "ready",
  },
  {
    id: "ПО-0002",
    pharmacyNumber: "190",
    pharmacyAddress: "Геленджик Душистая 24",
    createdAt: 1753001745000,
    priority: "high",
    topic: "Заметили крыс у входа",
    category: "Помещения",
    technician: "Сидоров Е.",
    reactionTime: 1753002046000,
    resolutionTime: 1753010762000,
    status: "closed",
  },
  {
    id: "ИТ-0002",
    pharmacyNumber: "267",
    pharmacyAddress: "Анапа Парковая 67к2",
    createdAt: 1753001745000,
    priority: "high",
    topic: "Нужен новый компьютер",
    category: "ИТ",
    technician: "Китов Я.",
    reactionTime: 1753002046000,
    resolutionTime: 1753010762000,
    status: "closed",
  },
  {
    id: "СА-0002",
    pharmacyNumber: "150",
    pharmacyAddress: "Кореновск Красная 108",
    createdAt: 1753001745000,
    priority: "medium",
    topic: "Унитаз перестал смывать",
    category: "Сантехника",
    technician: "Малахов Н.",
    reactionTime: 1753002046000,
    resolutionTime: 1753010762000,
    status: "ready",
  },
];

export const pharmacies = [
  { id: "065", name: "Геленджик Островского 7" },
  { id: "150", name: "Кореновск Красная 108" },
  { id: "045", name: "Тимашевск Интернац 3Б" },
  { id: "164", name: "РнД Сельмаш 92" },
  { id: "190", name: "Геленджик Душистая 24" },
  { id: "267", name: "Анапа Парковая 67к2" },
];

export const categories = [
  "Кассы",
  "Холодильники",
  "Кондиционеры",
  "Изм. оборуд.",
  "Помещения",
  "ИТ",
  "Сантехника",
];

export const priorities: { value: Priority; label: string }[] = [
  { value: "critical", label: "Критичный" },
  { value: "high", label: "Высокий" },
  { value: "medium", label: "Средний" },
  { value: "low", label: "Низкий" },
];

export const statusTabs: { value: Status | "all"; label: string }[] = [
  { value: "new", label: "Новые" },
  { value: "rejected", label: "Отклонены" },
  { value: "pending", label: "На рассмотрении" },
  { value: "in-progress", label: "В работе" },
  { value: "waiting-parts", label: "Ожидают запчасти" },
  { value: "ready", label: "Готовы" },
  { value: "closed", label: "Закрыты" },
  { value: "all", label: "Все статусы" },
];

export const SLA_LIMITS: Record<Priority, Record<Stage, number>> = {
  critical: {
    reaction: 5 * 60 * 1000,
    resolution: 2 * 60 * 60 * 1000,
  },
  high: {
    reaction: 10 * 60 * 1000,
    resolution: 4 * 60 * 60 * 1000,
  },
  medium: {
    reaction: 5 * 60 * 1000,
    resolution: 3 * 60 * 60 * 1000,
  },
  low: {
    reaction: 30 * 60 * 1000,
    resolution: 24 * 60 * 60 * 1000,
  },
};
