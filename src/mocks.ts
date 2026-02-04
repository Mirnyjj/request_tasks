import type { Priority, RequestData, RequestStatusKey } from "./types";

export const REQUEST_STATUS_TABS: Record<
  RequestStatusKey | "all" | "may_request",
  string
> = {
  new: "Новые",
  rejected: "Отклонены",
  pending: "На рассмотрении",
  in_progress: "В работе",
  waiting_parts: "Ожидают запчасти",
  ready: "Готовы",
  closed: "Закрыты",
  all: "Все статусы",
  may_request: "Показать только мои",
};

export const REQUEST_TABLE_HEADERS = {
  id: "№",
  pharmacy: "Аптека",
  createdAt: "Создана",
  priority: "Приоритет",
  subject: "Тема",
  category: "Категория",
  technician: "Техник",
  reaction: "Реакция",
  resolution: "Решение",
  status: "Статус",
};

export const PRIORITY_HEADERS: Record<Priority, string> = {
  high: "Высокий",
  medium: "Средний",
  low: "Низкий",
  critical: "Критич.",
};

const TIMESTAMP_20_07_2025_12_35_45 = 1753027345000;

export const REQUEST_MOCKS: RequestData[] = [
  {
    id: "КС-0002",
    pharmacy: { id: 65, city: "Геленджик", address: "Островского 7" },
    createdAt: TIMESTAMP_20_07_2025_12_35_45,
    priority: "high",
    subject: "Поломка кассы",
    category: "Кассы",
    technician: null,
    reaction: null,
    resolution: null,
    status: "new",
  },
  {
    id: "ХЛ-0002",
    pharmacy: { id: 150, city: "Кореновск", address: "Красная 108" },
    createdAt: TIMESTAMP_20_07_2025_12_35_45,
    priority: "medium",
    subject: "Холодильник сильно гудит",
    category: "Холодильники",
    technician: "Федоровский Н.",
    reaction: TIMESTAMP_20_07_2025_12_35_45 + (5 * 60 + 1) * 60 * 1000,
    resolution:
      TIMESTAMP_20_07_2025_12_35_45 + (5 * 60 + 1 + 1 * 60 + 35) * 60 * 1000,
    status: "in_progress",
  },
  {
    id: "КН-0002",
    pharmacy: { id: 45, city: "Тимашевск", address: "Интернац 3Б" },
    createdAt: TIMESTAMP_20_07_2025_12_35_45,
    priority: "low",
    subject: "Конденсат на внутреннем блоке",
    category: "Кондиционеры",
    technician: "Максимов П.",
    reaction: TIMESTAMP_20_07_2025_12_35_45 + 5 * 60 * 60 * 1000,
    resolution: TIMESTAMP_20_07_2025_12_35_45 + (5 * 60 + 30) * 60 * 1000,
    status: "ready",
  },
  {
    id: "ИЗ-0002",
    pharmacy: { id: 164, city: "РнД", address: "Сельмаш 92" },
    createdAt: TIMESTAMP_20_07_2025_12_35_45,
    priority: "critical",
    subject: "Нужно поверить гигрометр",
    category: "Изм. оборуд.",
    technician: "Алексеев М.",
    reaction: TIMESTAMP_20_07_2025_12_35_45 + 5 * 60 * 60 * 1000,
    resolution: TIMESTAMP_20_07_2025_12_35_45 + (5 * 60 + 30) * 60 * 1000,
    status: "ready",
  },
  {
    id: "ПО-0002",
    pharmacy: { id: 190, city: "Геленджик", address: "Душистая 24" },
    createdAt: TIMESTAMP_20_07_2025_12_35_45,
    priority: "high",
    subject: "Заметили крыс у входа",
    category: "Помещения",
    technician: "Сидоров Е.",
    reaction: TIMESTAMP_20_07_2025_12_35_45 + 5 * 60 * 60 * 1000,
    resolution: TIMESTAMP_20_07_2025_12_35_45 + (5 * 60 + 30) * 60 * 1000,
    status: "closed",
  },
  {
    id: "ИТ-0002",
    pharmacy: { id: 267, city: "Анапа", address: "Парковая 67к2" },
    createdAt: TIMESTAMP_20_07_2025_12_35_45,
    priority: "high",
    subject: "Нужен новый компьютер",
    category: "ИТ",
    technician: "Китов Я.",
    reaction: TIMESTAMP_20_07_2025_12_35_45 + 5 * 60 * 60 * 1000,
    resolution: TIMESTAMP_20_07_2025_12_35_45 + (5 * 60 + 30) * 60 * 1000,
    status: "closed",
  },
  {
    id: "СА-0002",
    pharmacy: { id: 150, city: "Кореновск", address: "Красная 108" },
    createdAt: TIMESTAMP_20_07_2025_12_35_45,
    priority: "medium",
    subject: "Унитаз перестал смывать",
    category: "Сантехника",
    technician: "Малахов Н.",
    reaction: TIMESTAMP_20_07_2025_12_35_45 + 5 * 60 * 60 * 1000,
    resolution: TIMESTAMP_20_07_2025_12_35_45 + (5 * 60 + 30) * 60 * 1000,
    status: "ready",
  },
];
