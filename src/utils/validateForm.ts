import type { FormErrors, NewRequestFormData } from "@/lib/types";

export const validateForm = (data: NewRequestFormData): FormErrors => {
  const newErrors: FormErrors = {};

  if (!data.pharmacyId.trim()) {
    newErrors.pharmacyId = "Выберите аптеку";
  }

  if (!data.topic.trim()) {
    newErrors.topic = "Введите тему заявки";
  }

  if (!data.category.trim()) {
    newErrors.category = "Выберите категорию";
  }

  if (!data.description.trim()) {
    newErrors.description = "Опишите проблему";
  }

  return newErrors;
};
