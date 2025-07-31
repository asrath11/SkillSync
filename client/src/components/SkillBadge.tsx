import { Badge } from '@/components/ui/badge';

type BadgeVariant =
  | 'secondary'
  | 'info'
  | 'warning'
  | 'destructive'
  | 'success'
  | 'default'
  | 'outline';

const levelMap: Record<number, { label: string; variant: BadgeVariant }> = {
  1: { label: 'Beginner', variant: 'secondary' },
  2: { label: 'Basic', variant: 'info' },
  3: { label: 'Intermediate', variant: 'warning' },
  4: { label: 'Advanced', variant: 'destructive' },
  5: { label: 'Expert', variant: 'success' },
};

type SkillBadgeProps = {
  level: number;
};

function SkillBadge({ level }: SkillBadgeProps) {
  const { label, variant } = levelMap[level] ?? levelMap[1];
  return <Badge variant={variant}>{label}</Badge>;
}

export default SkillBadge;
