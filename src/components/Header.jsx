import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

const links = [
  ["首页", "/", "/"],
  ["产品中心", "/products", "/products"],
  ["制造能力", "/manufacturing", "/manufacturing"],
  ["品质保障", "/manufacturing#quality", "/manufacturing"],
  ["关于我们", "/#about", ""],
];

export function Header({ currentPath = "/", onOpenQuote }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="青岛凯丰德包装首页">
          <img src="/assets/kfd-logo.png" alt="凯丰德包装 KFD Packaging" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={26} /> : <List size={26} />}
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="主导航">
          {links.map(([label, href, activePath]) => {
            const isQualityAnchor = href === "/manufacturing#quality";
            const isCurrent = isQualityAnchor
              ? currentPath === "/manufacturing" && window.location.hash === "#quality"
              : activePath && activePath === currentPath && !(href === "/manufacturing" && window.location.hash === "#quality");
            return (
              <a className={isCurrent ? "is-current" : ""} key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            );
          })}
        </nav>

        <button className="button button-primary header-cta" type="button" onClick={onOpenQuote}>
          提交询价
        </button>
      </div>
    </header>
  );
}
