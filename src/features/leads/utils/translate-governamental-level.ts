export function translateGovernamentLevel(level?: string | null) {
  if (!level || level.toUpperCase() === 'NOT INFORMED') return 'Não informado';

  const normalized = level.toUpperCase();

  if (normalized === 'MUNICIPAL') return 'Municipal';
  if (normalized === 'STATE' || normalized === 'ESTADUAL') return 'Estadual';
  if (normalized === 'FEDERAL') return 'Federal';

  return level;
}
