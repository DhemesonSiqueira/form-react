export const formatCurrencyBRL = (value: string) => {
  const cleanedValue = value.replace(/[^0-9]/g, "");

  if (cleanedValue === "") {
    return "R$ 0,00";
  } else {
    const valueAsNumber = parseInt(cleanedValue, 10) / 100;
    const formattedNumber = `R$ ${valueAsNumber
      .toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+,)/g, "$1.")}`;

    return formattedNumber;
  }
}

export const parseCurrencyBRL = (value: string) => {
  const cleanedValue = value.replace(/[^0-9]/g, "");
  const valueAsNumber = parseInt(cleanedValue, 10) / 100;
  return valueAsNumber;
}