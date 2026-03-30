export const normalizeServantOrigin = (
  origin: string | 'NOT INFORMED' | null
) => {
  if (!origin || origin === 'NOT INFORMED') return 'Não informado';
  return origin;
};
