import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: number;
  icon: LucideIcon;
  label: string;
  path: string;
  mobile?: boolean;
}