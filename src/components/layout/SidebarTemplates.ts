import { BanknoteArrowDown, Coins, HandCoins, HomeIcon, Users } from "lucide-react";
import { MenuItem } from "../../types/navigation";

export const AdminMenu: MenuItem[] = [
  { id: 1, icon: HomeIcon, label: 'Home', path: '/admin/dashboard', mobile: true },
  { id: 2, icon: Users, label: 'Usuários', path: '/admin/users', mobile: true },
  { id: 3, icon: BanknoteArrowDown, label: 'Depósito', path: '/admin/deposit', mobile: true },
  { id: 4, icon: HandCoins, label: 'Saque', path: '/admin/withdraw', mobile: true },
  { id: 5, icon: Coins, label: 'Conversão', path: '/conversion', mobile: true },
];