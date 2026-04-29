import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { UNSAFE_withComponentProps } from "react-router";

import { AnimatePresence, motion } from "motion/react";

import { t as cn } from "./cn--xc5ULUJ.js";
import { i as FAQ_ITEMS, u as Container } from "./constants-BL5vlB3X.js";
//#region src/features/faq/FAQItem.tsx
var FAQItem = ({ question, answer }) => {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "border-b border-[var(--color-border)] last:border-0",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			className: "w-full py-4 flex items-center justify-between text-left gap-4 hover:text-[var(--color-accent)] transition-colors",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-sm font-medium text-[var(--color-text-primary)]",
				children: question
			}), /* @__PURE__ */ jsx("span", {
				className: cn("flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-transform duration-200", open && "rotate-45 border-[var(--color-accent)] text-[var(--color-accent)]"),
				children: "+"
			})]
		}), /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
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
			className: "overflow-hidden",
			children: /* @__PURE__ */ jsx("p", {
				className: "pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed pr-8",
				children: answer
			})
		}) })]
	});
};
//#endregion
//#region app/routes/faq.tsx
var meta = () => {
	return [{ title: "Часто задаваемые вопросы | CardMatcher" }, {
		name: "description",
		content: "Ответы на самые популярные вопросы о CardMatcher и выборе карт памяти."
	}];
};
var faq_default = UNSAFE_withComponentProps(function FAQRoute() {
	return /* @__PURE__ */ jsx("section", {
		className: "py-16 md:py-24 min-h-[calc(100vh-64px)]",
		children: /* @__PURE__ */ jsxs(Container, {
			narrow: true,
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .5 },
				className: "text-center mb-14",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4",
					children: "Часто задаваемые вопросы"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-[var(--color-text-secondary)]",
					children: "Ответы на самые популярные вопросы о CardMatcher и выборе карт памяти"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-10",
				children: FAQ_ITEMS.map((section, si) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .4,
						delay: si * .08
					},
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3",
						children: section.category
					}), /* @__PURE__ */ jsx("div", {
						className: "bg-white rounded-2xl border border-[var(--color-border)] px-6 divide-y divide-[var(--color-border)]",
						children: section.items.map((item) => /* @__PURE__ */ jsx(FAQItem, {
							question: item.question,
							answer: item.answer
						}, item.question))
					})]
				}, section.category))
			})]
		})
	});
});
//#endregion
export { faq_default as default, meta };
