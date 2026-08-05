import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteImages } from "@/contexts/SiteImagesContext";

/**
 * 前台导航项
 */
const navItems = [
  { path: "/", label: "首页", end: true },
  { path: "/about", label: "车队介绍" },
  { path: "/racecar", label: "赛车展示" },
  { path: "/competition", label: "赛事历程" },
  { path: "/member", label: "队员风采" },
  { path: "/sponsor", label: "赞助商" },
  { path: "/recruit", label: "招新" },
  { path: "/contact", label: "联系我们" },
];

/**
 * 导航组件 - 固定顶部、毛玻璃效果、双 logo 并列、移动端汉堡菜单
 */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { images } = useSiteImages();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-300 border-b",
        scrolled
          ? "bg-white/95 border-border"
          : "bg-white/80 border-transparent"
      )}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 左侧双 logo 并列 */}
        <NavLink to="/" className="flex items-center gap-3 h-full">
          {/* 校徽 */}
          <img
            src={images.logos.schoolLogo.url}
            alt={images.logos.schoolLogo.alt}
            className="w-10 h-10 object-contain"
          />
          {/* 队徽 */}
          <img
            src={images.logos.teamLogo.url}
            alt={images.logos.teamLogo.alt}
            className="w-10 h-10 object-contain"
          />
          <span className="hidden sm:block text-foreground font-medium text-base">
            巴哈车队
          </span>
        </NavLink>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 text-sm transition-colors duration-200 rounded-full",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 移动端汉堡按钮 */}
        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 移动端下拉菜单 */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white/95 nav-blur border-t border-border",
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-4 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "py-3 px-2 text-base border-b border-border/50 transition-colors",
                  isActive
                    ? "text-primary font-medium"
                    : "text-foreground hover:text-primary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

/**
 * 页脚组件
 */
function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-medium text-foreground mb-3">联系我们</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>邮箱：baha@example.edu.cn</li>
              <li>地址：合肥经济技术职业学院</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-3">快速导航</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <NavLink to="/about" className="hover:text-foreground">
                  车队介绍
                </NavLink>
              </li>
              <li>
                <NavLink to="/racecar" className="hover:text-foreground">
                  赛车展示
                </NavLink>
              </li>
              <li>
                <NavLink to="/recruit" className="hover:text-foreground">
                  加入我们
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-3">关注我们</h3>
            <p className="text-muted-foreground">社交媒体链接占位</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} 合肥经济技术职业学院 · 巴哈车队
        </div>
      </div>
    </footer>
  );
}

/**
 * 主布局组件
 */
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
