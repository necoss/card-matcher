import { jsx, jsxs } from "react/jsx-runtime";

import { Button } from "@base-ui/react/button";

import { t as cn } from "./cn--xc5ULUJ.js";
//#region src/shared/ui/Blocks/Button/Button.tsx
var Button$1 = ({ variant = "primary", size = "md", loading, children, className, disabled, ...props }) => {
	return /* @__PURE__ */ jsxs(Button, {
		className: cn("inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]", {
			primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] active:scale-[0.98]",
			secondary: "bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-dark)] active:scale-[0.98]",
			ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
		}[variant], {
			sm: "px-4 py-2 text-sm",
			md: "px-5 py-2.5 text-sm",
			lg: "px-7 py-3.5 text-base"
		}[size], (disabled || loading) && "opacity-60 cursor-not-allowed pointer-events-none", className),
		disabled: disabled ?? loading,
		focusableWhenDisabled: loading,
		...props,
		children: [loading && /* @__PURE__ */ jsxs("svg", {
			className: "animate-spin w-4 h-4",
			fill: "none",
			viewBox: "0 0 24 24",
			children: [/* @__PURE__ */ jsx("circle", {
				className: "opacity-25",
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				strokeWidth: "4"
			}), /* @__PURE__ */ jsx("path", {
				className: "opacity-75",
				fill: "currentColor",
				d: "M4 12a8 8 0 018-8v8H4z"
			})]
		}), children]
	});
};
//#endregion
export { Button$1 as t };
