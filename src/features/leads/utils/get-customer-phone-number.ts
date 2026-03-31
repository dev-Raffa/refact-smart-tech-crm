export const getCustomerProneNumbers = (
  phoneNumber1: string | null | undefined,
  phoneNumber2: string | null | undefined
) => {
  if (phoneNumber1 && phoneNumber2) {
    return [phoneNumber1, phoneNumber2];
  }

  if (phoneNumber1) {
    return [phoneNumber1];
  }

  if (phoneNumber2) {
    return [phoneNumber2];
  }

  return 'Não informado';
};
