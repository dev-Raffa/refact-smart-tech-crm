export function calculateCompanyAge(foundationDate?: string) {
  if (!foundationDate) return 'Indisponível';
  const foundation = new Date(foundationDate);
  const today = new Date();
  let age = today.getFullYear() - foundation.getFullYear();
  const m = today.getMonth() - foundation.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < foundation.getDate())) {
    age--;
  }
  return `${age} anos`;
}
