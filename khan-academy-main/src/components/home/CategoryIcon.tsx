import {
  BarChart3,
  Brain,
  BookOpen,
  Briefcase,
  Code2,
  Megaphone,
  PenTool,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Brain,
  Code2,
  BarChart3,
  ShieldCheck,
  PenTool,
  Megaphone,
  Briefcase,
  Terminal,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? BookOpen;
  return <Icon className={className} aria-hidden="true" />;
}
