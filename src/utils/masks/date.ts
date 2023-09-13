export const formatDate = (value: string) => {
  const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2");

  return formatted;
}

export const parseDate = (date: string) => {
  const parsedDate = date.replace(/\D/g, '').replace(/^(\d{2})(\d{2})(\d{4})$/g, '$2-$1-$3'); // dd/mm/yyyy
  const newDate = new Date(parsedDate);
  return newDate;
}