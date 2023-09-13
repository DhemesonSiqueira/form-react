export const formatPhone = (phone: string) => {
  return phone.replace(/\D/g, '').replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export const parsePhone = (phone: string) => {
  return phone.replace(/\D/g, '');
}