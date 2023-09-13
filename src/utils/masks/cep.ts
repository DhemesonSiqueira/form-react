export const formatCEP = (cep: string) => {
  return cep.replace(/\D/g, '').replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1-$2");
}

export const parseCEP = (cep: string) => {
  return cep.replace(/\D/g, '')
}