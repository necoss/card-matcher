import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, UNSAFE_withComponentProps } from "react-router";
import { Link, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

import { t as Button } from "./Button-B7ZF836U.js";
import { n as ROUTES, t as cn } from "./cn--xc5ULUJ.js";
//#region app/providers/QueryProvider.tsx
var queryClient = new QueryClient({ defaultOptions: { queries: {
	staleTime: 300 * 1e3,
	retry: 1
} } });
var QueryProvider = ({ children }) => /* @__PURE__ */ jsx(QueryClientProvider, {
	client: queryClient,
	children
});
//#endregion
//#region src/shared/hooks/useScrollDirection.ts
/**
* Detects scroll direction for navbar hide/show behavior.
* Returns 'up' | 'down' | null
*/
var useScrollDirection = () => {
	const [scrollDir, setScrollDir] = useState(null);
	const lastScrollY = useRef(0);
	const ticking = useRef(false);
	useEffect(() => {
		const updateScrollDir = () => {
			const currentY = window.scrollY;
			const diff = currentY - lastScrollY.current;
			if (Math.abs(diff) > 4) {
				setScrollDir(currentY < 16 ? "up" : diff < 0 ? "up" : "down");
				lastScrollY.current = currentY;
			}
			ticking.current = false;
		};
		const handleScroll = () => {
			if (!ticking.current) {
				window.requestAnimationFrame(updateScrollDir);
				ticking.current = true;
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return scrollDir;
};
//#endregion
//#region src/shared/ui/Navigation/Navbar/Navbar.tsx
var navLinks = [
	{
		label: "Главная",
		to: ROUTES.HOME
	},
	{
		label: "Калькулятор",
		to: ROUTES.CALCULATOR
	},
	{
		label: "FAQ",
		to: ROUTES.FAQ
	}
];
var Navbar = () => {
	const scrollDir = useScrollDirection();
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = useState(false);
	const isHidden = scrollDir === "down" && !mobileOpen;
	return /* @__PURE__ */ jsxs(motion.header, {
		animate: {
			y: isHidden ? -100 : 0,
			opacity: isHidden ? 0 : 1
		},
		transition: {
			duration: .3,
			ease: "easeInOut"
		},
		className: "sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex h-16 items-center justify-between",
				children: [
					/* @__PURE__ */ jsxs(Link, {
						to: ROUTES.HOME,
						className: "flex items-center gap-2.5 flex-shrink-0 group",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white text-sm font-bold group-hover:bg-[var(--color-accent)] transition-colors duration-200",
							children: "CM"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-[var(--color-text-primary)] text-base tracking-tight",
							children: "CardMatcher"
						})]
					}),
					/* @__PURE__ */ jsx("nav", {
						className: "hidden md:flex items-center gap-1",
						children: navLinks.map((link) => /* @__PURE__ */ jsx(Link, {
							to: link.to,
							className: cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150", location.pathname === link.to ? "text-[var(--color-text-primary)] bg-[var(--color-surface)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"),
							children: link.label
						}, link.to))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(Link, {
							to: ROUTES.CALCULATOR,
							className: "hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-light)] transition-colors duration-150",
							children: "Калькулятор"
						}), /* @__PURE__ */ jsxs(Button, {
							variant: "ghost",
							size: "sm",
							className: "md:hidden flex flex-col gap-1.5 p-2",
							onClick: () => setMobileOpen((v) => !v),
							"aria-label": "Меню",
							children: [
								/* @__PURE__ */ jsx("span", { className: cn("block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all", mobileOpen && "rotate-45 translate-y-2") }),
								/* @__PURE__ */ jsx("span", { className: cn("block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all", mobileOpen && "opacity-0") }),
								/* @__PURE__ */ jsx("span", { className: cn("block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all", mobileOpen && "-rotate-45 -translate-y-2") })
							]
						})]
					})
				]
			})
		}), /* @__PURE__ */ jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				height: 0,
				opacity: 0
			},
			animate: {
				height: "auto",
				opacity: 1
			},
			exit: {
				height: 0,
				opacity: 0
			},
			transition: { duration: .2 },
			className: "md:hidden overflow-hidden border-t border-[var(--color-border)] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1 px-4 py-4",
				children: [navLinks.map((link) => /* @__PURE__ */ jsx(Link, {
					to: link.to,
					onClick: () => setMobileOpen(false),
					className: cn("px-4 py-2.5 rounded-lg text-sm font-medium transition-colors", location.pathname === link.to ? "bg-[var(--color-surface)] text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"),
					children: link.label
				}, link.to)), /* @__PURE__ */ jsx(Link, {
					to: ROUTES.CALCULATOR,
					onClick: () => setMobileOpen(false),
					className: "mt-2 px-4 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold text-center hover:bg-[var(--color-primary-light)] transition-colors",
					children: "Калькулятор"
				})]
			})
		}) })]
	});
};
//#endregion
//#region src/shared/ui/Navigation/Footer/Footer.tsx
var Footer = () => /* @__PURE__ */ jsx("footer", {
	className: "bg-[var(--color-primary)] text-white",
	children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2.5 mb-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold",
							children: "CM"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-white text-base",
							children: "CardMatcher"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-white/60 text-sm leading-relaxed max-w-xs",
						children: "Помогаем выбрать правильную карту памяти для систем видеонаблюдения. Точные расчёты — без лишних затрат."
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "text-sm font-semibold text-white/80 uppercase tracking-wide mb-4",
					children: "Навигация"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-2.5",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: ROUTES.HOME,
							className: "text-white/60 hover:text-white text-sm transition-colors",
							children: "Главная"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: ROUTES.CALCULATOR,
							className: "text-white/60 hover:text-white text-sm transition-colors",
							children: "Калькулятор"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: ROUTES.FAQ,
							className: "text-white/60 hover:text-white text-sm transition-colors",
							children: "FAQ"
						}) })
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "text-sm font-semibold text-white/80 uppercase tracking-wide mb-4",
					children: "Поддержка"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-2.5",
					children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", {
						className: "text-white/60 text-sm",
						children: "help@cardmatcher.by"
					}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: ROUTES.FAQ,
						className: "text-white/60 hover:text-white text-sm transition-colors",
						children: "Часто задаваемые вопросы"
					}) })]
				})] })
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-white/40 text-xs",
				children: "© 2026 CardMatcher. Все права защищены."
			}), /* @__PURE__ */ jsx("p", {
				className: "text-white/40 text-xs",
				children: "Данные носят справочный характер"
			})]
		})]
	})
});
//#endregion
//#region app/root.tsx
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "ru",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1.0"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: "Калькулятор ёмкости карт памяти для систем видеонаблюдения. Рассчитайте необходимый объём и подберите подходящие карты памяти."
			}),
			/* @__PURE__ */ jsx("title", { children: "CardMatcher — Калькулятор ёмкости карт памяти" }),
			/* @__PURE__ */ jsx("link", {
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			}),
			/* @__PURE__ */ jsx("link", {
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
				rel: "stylesheet"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(QueryProvider, { children: /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children: /* @__PURE__ */ jsx(Outlet, {})
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	}) });
});
//#endregion
export { Layout, root_default as default };
