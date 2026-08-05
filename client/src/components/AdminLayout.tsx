import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Trophy,
  Users,
  UserPlus,
  Image,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logger } from '@lark-apaas/client-toolkit/logger';

/**
 * 后台侧边栏导航项
 */
const adminNavItems = [
  { path: "/admin", label: "数据概览", icon: LayoutDashboard, end: true },
  { path: "/admin/images", label: "图片管理", icon: Image },
  { path: "/admin/content", label: "内容管理", icon: FileText },
  { path: "/admin/competitions", label: "赛事管理", icon: Trophy },
  { path: "/admin/members", label: "队员管理", icon: Users },
  { path: "/admin/recruits", label: "招新管理", icon: UserPlus },
  { path: "/admin/settings", label: "站点设置", icon: Settings },
];

/**
 * 后台布局组件 - 左侧侧边栏 + 右侧内容区
 */
const AdminLayout = () => {
  const location = useLocation();

  const handleLogout = () => {
    // 登出逻辑（后续实现）
    logger.info("logout");
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* 左侧侧边栏 */}
      <aside className="w-60 border-r border-border bg-card flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h1 className="text-base font-semibold">管理后台</h1>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <LogOut size={18} />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* 右侧内容区 */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
