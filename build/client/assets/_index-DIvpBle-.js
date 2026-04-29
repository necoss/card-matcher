import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { UNSAFE_withComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "motion/react";

import { n as ROUTES } from "./cn--xc5ULUJ.js";
import { l as WHY_FEATURES, u as Container } from "./constants-BL5vlB3X.js";
//#region src/features/home/sections/HeroSection.tsx
var CARD_SIZES = [
	"32",
	"64",
	"128",
	"256"
];
var HeroSection = () => /* @__PURE__ */ jsxs("section", {
	className: "relative overflow-hidden bg-white pt-16 pb-24 md:pt-24 md:pb-32",
	children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] via-white to-white pointer-events-none" }), /* @__PURE__ */ jsx("div", {
		className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid lg:grid-cols-2 gap-12 items-center",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 24
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						ease: "easeOut"
					},
					children: /* @__PURE__ */ jsx("span", {
						className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-6",
						children: "📹 Видеонаблюдение"
					})
				}),
				/* @__PURE__ */ jsxs(motion.h1, {
					className: "text-4xl sm:text-5xl lg:text-[56px] font-bold text-[var(--color-text-primary)] tracking-tight leading-[1.1] mb-6",
					initial: {
						opacity: 0,
						y: 24
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						delay: .1,
						ease: "easeOut"
					},
					children: ["Выберите карту памяти ", /* @__PURE__ */ jsx("span", {
						className: "text-[var(--color-accent)]",
						children: "без ошибок"
					})]
				}),
				/* @__PURE__ */ jsx(motion.p, {
					className: "text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-lg",
					initial: {
						opacity: 0,
						y: 24
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						delay: .2,
						ease: "easeOut"
					},
					children: "Калькулятор CardMatcher точно рассчитает необходимую ёмкость карт памяти для вашей системы видеонаблюдения. Никаких сюрпризов — только цифры."
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: "flex flex-wrap gap-3",
					initial: {
						opacity: 0,
						y: 24
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						delay: .3,
						ease: "easeOut"
					},
					children: [/* @__PURE__ */ jsxs(Link, {
						to: ROUTES.CALCULATOR,
						className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] bg-[var(--color-primary)] text-white text-base font-semibold hover:bg-[var(--color-primary-light)] active:scale-[0.98] transition-all duration-150",
						children: [/* @__PURE__ */ jsx("svg", {
							className: "w-4 h-4",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							strokeWidth: 2,
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
							})
						}), "Начать расчёт"]
					}), /* @__PURE__ */ jsx(Link, {
						to: ROUTES.FAQ,
						className: "inline-flex items-center px-7 py-3.5 rounded-[10px] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-base font-semibold border border-[var(--color-border)] hover:bg-[var(--color-surface-dark)] active:scale-[0.98] transition-all duration-150",
						children: "Узнать больше"
					})]
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: "mt-10 flex items-center gap-8",
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						duration: .6,
						delay: .5
					},
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-2xl font-bold text-[var(--color-text-primary)]",
							children: "99%"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs text-[var(--color-text-muted)]",
							children: "Точность расчёта"
						})] }),
						/* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-[var(--color-border)]" }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-2xl font-bold text-[var(--color-text-primary)]",
							children: "10+"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs text-[var(--color-text-muted)]",
							children: "Форматов видео"
						})] }),
						/* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-[var(--color-border)]" }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-2xl font-bold text-[var(--color-text-primary)]",
							children: "0 BYN"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs text-[var(--color-text-muted)]",
							children: "Полностью бесплатно"
						})] })
					]
				})
			] }), /* @__PURE__ */ jsx(motion.div, {
				className: "hidden lg:flex items-center justify-center",
				initial: {
					opacity: 0,
					scale: .9
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .7,
					delay: .2,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ jsx("div", {
					className: "relative flex gap-3 items-end",
					children: CARD_SIZES.map((size, idx) => {
						const heights = [
							"h-36",
							"h-44",
							"h-52",
							"h-48"
						];
						const isHighlighted = idx === 2;
						return /* @__PURE__ */ jsxs(motion.div, {
							className: `relative flex flex-col items-center justify-between p-4 rounded-2xl ${heights[idx]} w-24 overflow-hidden ${isHighlighted ? "bg-[var(--color-primary)]" : "bg-white border-2 border-[var(--color-border)]"}`,
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .5,
								delay: .3 + idx * .08
							},
							style: { boxShadow: isHighlighted ? "var(--shadow-float)" : "var(--shadow-card)" },
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: `text-xs font-bold px-2 py-0.5 rounded-full ${isHighlighted ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-surface)] text-[var(--color-text-secondary)]"}`,
									children: [size, " GB"]
								}),
								/* @__PURE__ */ jsx("div", {
									className: `w-14 h-16 rounded-lg border-2 ${isHighlighted ? "border-white/30 bg-white/10" : "border-[var(--color-border)] bg-[var(--color-surface)]"} flex items-center justify-center relative`,
									children: /* @__PURE__ */ jsx("div", {
										className: `text-2xl font-black ${isHighlighted ? "text-white" : "text-[var(--color-primary)]"}`,
										children: "SD"
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex gap-0.5",
									children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: `w-1.5 h-3 rounded-sm ${isHighlighted ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"}` }, i))
								})
							]
						}, size);
					})
				})
			})]
		})
	})]
});
//#endregion
//#region src/shared/hooks/useAutoRotate.ts
/**
* Auto-rotates through an array of items periodically.
* Pauses rotation when hoveredIndex is set.
*/
var useAutoRotate = (count, intervalMs = 3e3) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const timer = useRef(null);
	useEffect(() => {
		if (hoveredIndex !== null) {
			if (timer.current) clearInterval(timer.current);
			return;
		}
		timer.current = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % count);
		}, intervalMs);
		return () => {
			if (timer.current) clearInterval(timer.current);
		};
	}, [
		count,
		intervalMs,
		hoveredIndex
	]);
	return {
		activeIndex: hoveredIndex ?? activeIndex,
		setHoveredIndex
	};
};
//#endregion
//#region src/features/home/sections/WhyCardMatcherSection.tsx
var WhyCardMatcherSection = () => {
	const { activeIndex, setHoveredIndex } = useAutoRotate(WHY_FEATURES.length, 3e3);
	return /* @__PURE__ */ jsx("section", {
		className: "py-20 md:py-28 bg-[var(--color-surface)]",
		children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsxs("div", {
			className: "text-center mb-14",
			children: [/* @__PURE__ */ jsx(motion.h2, {
				className: "text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3",
				initial: {
					opacity: 0,
					y: 16
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .5 },
				children: "Почему CardMatcher?"
			}), /* @__PURE__ */ jsx(motion.p, {
				className: "text-[var(--color-text-secondary)] text-base",
				initial: {
					opacity: 0,
					y: 12
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .5,
					delay: .1
				},
				children: "Профессиональный подход к выбору накопителей"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
			children: WHY_FEATURES.map((feature, idx) => {
				const isActive = activeIndex === idx;
				return /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .4,
						delay: idx * .08
					},
					onMouseEnter: () => setHoveredIndex(idx),
					onMouseLeave: () => setHoveredIndex(null),
					className: "relative rounded-2xl p-6 cursor-default transition-all duration-300 overflow-hidden",
					style: {
						background: isActive ? "var(--color-primary)" : "white",
						boxShadow: isActive ? "var(--shadow-elevated)" : "var(--shadow-card)",
						transform: isActive ? "translateY(-4px)" : "translateY(0)"
					},
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 transition-colors duration-300",
							style: { background: isActive ? "rgba(255,255,255,0.15)" : "var(--color-surface)" },
							children: feature.icon
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-base font-semibold mb-2 transition-colors duration-300",
							style: { color: isActive ? "white" : "var(--color-text-primary)" },
							children: feature.title
						}),
						/* @__PURE__ */ jsx(AnimatePresence, {
							mode: "wait",
							children: isActive ? /* @__PURE__ */ jsx(motion.p, {
								initial: {
									opacity: 0,
									height: 0
								},
								animate: {
									opacity: 1,
									height: "auto"
								},
								exit: {
									opacity: 0,
									height: 0
								},
								transition: { duration: .2 },
								className: "text-sm text-white/75 leading-relaxed",
								children: feature.description
							}, "active") : /* @__PURE__ */ jsxs(motion.p, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: { opacity: 0 },
								className: "text-sm text-[var(--color-text-secondary)] leading-relaxed",
								children: [feature.description.slice(0, 60), "..."]
							}, "inactive")
						}),
						isActive && /* @__PURE__ */ jsx(motion.div, {
							layoutId: "active-indicator",
							className: "absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[var(--color-accent)]",
							transition: {
								type: "spring",
								bounce: .2,
								duration: .4
							}
						})
					]
				}, feature.id);
			})
		})] })
	});
};
//#endregion
//#region src/features/home/sections/CTASection.tsx
var CTASection = () => /* @__PURE__ */ jsx("section", {
	className: "py-20 md:py-28 bg-[var(--color-primary)]",
	children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(motion.div, {
		className: "text-center",
		initial: {
			opacity: 0,
			y: 24
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: { once: true },
		transition: { duration: .6 },
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-3xl sm:text-4xl font-bold text-white mb-4",
				children: "Готовы рассчитать нужный объём?"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-white/60 text-lg mb-8",
				children: "Получите точный расчёт за несколько секунд и сразу перейдите к покупке"
			}),
			/* @__PURE__ */ jsxs(Link, {
				to: ROUTES.CALCULATOR,
				className: "inline-flex items-center gap-2 px-8 py-4 rounded-[10px] bg-[var(--color-accent)] text-white text-base font-semibold hover:bg-[var(--color-accent-hover)] active:scale-[0.98] transition-all duration-150",
				children: [/* @__PURE__ */ jsx("svg", {
					className: "w-5 h-5",
					fill: "none",
					viewBox: "0 0 24 24",
					stroke: "currentColor",
					strokeWidth: 2,
					children: /* @__PURE__ */ jsx("path", {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
					})
				}), "Перейти к калькулятору"]
			})
		]
	}) })
});
//#endregion
//#region app/routes/_index.tsx
var _index_default = UNSAFE_withComponentProps(function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(HeroSection, {}),
		/* @__PURE__ */ jsx(WhyCardMatcherSection, {}),
		/* @__PURE__ */ jsx(CTASection, {})
	] });
});
//#endregion
export { _index_default as default };
