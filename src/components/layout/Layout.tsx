import { ReactNode } from 'react';
import ResponsiveSidebar from './Sidebar';
import { MenuItem } from '@/types/navigation';

interface LayoutProps {
  children: ReactNode;
  menuItems: MenuItem[];
  hideMobileMenu?: true;
}

export default function AdminLayout({ children, menuItems, hideMobileMenu }: LayoutProps) {
  return (
    <div className='bg-[var(--color-secondary-bg)]' >
      <ResponsiveSidebar menuItems={menuItems} hideMobileMenu={hideMobileMenu} />
      <main className="min-h-[100vh] bg-[var(--color-primary-bg)] overflow-auto md:ml-[var(--sidebar-width)]" >
        {children}
      </main>
    </div>
  );
}
