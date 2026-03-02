import { MenuItem } from "../../types/navigation";
import nexusLogo from '../../assets/nexus-logo-white.png'
import { useLocation, Link } from "react-router-dom";

interface ResponsiveSidebarProps {
  menuItems: MenuItem[];
  hideMobileMenu?: true;
}

export default function ResponsiveSidebar({ menuItems, hideMobileMenu }: ResponsiveSidebarProps) {
  const { pathname } = useLocation();
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed left-0 z-40 md:flex flex-col width-[var(--sidebar-width)] h-[100vh] bg-[var(--color-secondary-bg)] border-r-1 border-[var(--color-border)]" >
        <div className="flex items-center justify-center w-[var(--sidebar-width)] gap-2 mb-6 mt-6">
          <img src={nexusLogo} alt="NexusLogo" className="h-10" />
        </div>
        <nav className="flex-1 py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${isActive ? "bg-[var(--color-accent-bg)]" : "hover:bg-[var(--color-card-bg)]"} flex items-center gap-3 px-4 py-3 rounded-lg transition-colors`}
                >
                  <Icon size={20} className={isActive ? "text-[var(--color-accent)]" : "text-gray-400"} />
                  <span className={`${isActive ? "text-[var(--color-accent)]" : "text-gray-400"} text-sm font-medium`}>{item.label}</span>
                </Link>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      {hideMobileMenu || <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{
          backgroundColor: 'var(--color-secondary-bg)',
          borderTopColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <ul className="flex items-center justify-around h-16 px-2">
          {menuItems.filter(item => item.mobile === true).map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1 py-2 transition-colors"
              >
                <Icon size={20} className={isActive ? "text-[var(--color-accent)]" : "text-gray-400"} />
                <span className={`${isActive ? "text-[var(--color-accent)]" : "text-gray-400"} text-sm font-medium`}>{item.label}</span>
              </Link>
            );
          })}
        </ul>
      </nav>}
    </>
  );
}
