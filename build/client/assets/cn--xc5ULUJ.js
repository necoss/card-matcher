import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/shared/constants/routes.ts
var ROUTES = {
	HOME: "/",
	CALCULATOR: "/calculator",
	FAQ: "/faq"
};
//#endregion
//#region src/shared/utils/cn.ts
var cn = (...inputs) => twMerge(clsx(inputs));
//#endregion
export { ROUTES as n, cn as t };
