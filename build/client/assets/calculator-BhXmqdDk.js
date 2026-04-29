import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { UNSAFE_withComponentProps } from "react-router";
import ky from "ky";

import { NumberField } from "@base-ui/react/number-field";
import { Select } from "@base-ui/react/select";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

import { t as Button } from "./Button-B7ZF836U.js";
import { t as cn } from "./cn--xc5ULUJ.js";
import { a as QUALITY_OPTIONS, c as STORAGE_DAYS_OPTIONS, n as BITRATE_HINTS, o as RESOLUTIONS, r as CODEC_OPTIONS, s as RESOLUTION_FPS_OPTIONS, t as ACTIVITY_OPTIONS, u as Container } from "./constants-BL5vlB3X.js";
//#region src/shared/ui/Blocks/ToggleSwitch/ToggleSwitch.tsx
var ToggleSwitch = ({ options, value, onChange, className }) => /* @__PURE__ */ jsx(ToggleGroup, {
	value: [value],
	onValueChange: (values) => {
		const next = values.find((v) => v !== value) ?? values[0];
		if (next) onChange(next);
	},
	className: cn("inline-flex p-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]", className),
	children: options.map((option) => /* @__PURE__ */ jsx(Toggle, {
		value: option.value,
		"aria-label": option.label,
		className: cn("px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer", value === option.value ? "bg-[var(--color-primary)] text-white shadow-sm" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"),
		children: option.label
	}, option.value))
});
//#endregion
//#region src/shared/ui/Blocks/ChipSelector/ChipSelector.tsx
var ChipSelector = ({ options, value, onChange, className }) => /* @__PURE__ */ jsx(ToggleGroup, {
	value: [String(value)],
	onValueChange: (values) => {
		const strVal = values.find((v) => v !== String(value)) ?? values[0];
		if (strVal == null) return;
		const matched = options.find((o) => String(o.value) === strVal);
		if (matched) onChange(matched.value);
	},
	className: cn("flex flex-wrap gap-2", className),
	children: options.map((option) => /* @__PURE__ */ jsx(Toggle, {
		value: String(option.value),
		"aria-label": option.label,
		className: cn("chip-selector", value === option.value && "active"),
		children: option.label
	}, String(option.value)))
});
//#endregion
//#region src/shared/ui/Blocks/Stepper/Stepper.tsx
var Stepper = ({ value, onChange, min = 1, max = 128, className }) => /* @__PURE__ */ jsx(NumberField.Root, {
	value,
	onValueChange: (v) => {
		if (v !== null) onChange(v);
	},
	min,
	max,
	step: 1,
	className: cn("flex items-center gap-3", className),
	children: /* @__PURE__ */ jsxs(NumberField.Group, {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ jsx(NumberField.Decrement, {
				className: "w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] font-bold text-lg flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors cursor-pointer",
				children: "−"
			}),
			/* @__PURE__ */ jsx(NumberField.Input, { className: "w-10 text-center text-base font-semibold text-[var(--color-text-primary)] bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" }),
			/* @__PURE__ */ jsx(NumberField.Increment, {
				className: "w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] font-bold text-lg flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors cursor-pointer",
				children: "+"
			})
		]
	})
});
//#endregion
//#region src/shared/utils/storageCalculation.ts
/**
* Default H.264 bitrates (Mbps) per resolution
* Based on industry-standard camera specs (HIKVISION, Dahua, Reolink)
*/
var DEFAULT_BITRATES = {
	"480p": {
		high: 1,
		medium: .7,
		low: .4
	},
	"720p": {
		high: 2,
		medium: 1.5,
		low: .8
	},
	"1080p": {
		high: 4,
		medium: 3,
		low: 1.5
	},
	"2K": {
		high: 8,
		medium: 6,
		low: 3
	},
	"4K": {
		high: 16,
		medium: 12,
		low: 6
	}
};
/**
* Codec compression multipliers relative to H.264
* H.265 compresses ~50% better, H.265+ ~60%, AV1 ~65%
* MJPEG is far less efficient (~6× worse than H.264)
*/
var CODEC_MULTIPLIERS = {
	"MJPEG": 6,
	"H.264": 1,
	"H.265": .5,
	"H.265+": .4,
	"AV1": .35
};
/**
* Quality level multipliers applied to bitrate
*/
var QUALITY_MULTIPLIERS = {
	high: 1,
	medium: .75,
	low: .5
};
/**
* Scene activity multipliers (affects VBR effective bitrate)
* High activity = constant motion, Low = mostly static scene
*/
var ACTIVITY_MULTIPLIERS = {
	high: 1,
	medium: .7,
	low: .4
};
/**
* Recording mode effective multipliers (fraction of 24h with actual recording)
*/
var RECORDING_MODE_HOURS = {
	continuous: 24,
	motion: 6
};
/**
* Standard SD/microSD card sizes in GB
*/
var STANDARD_CARD_SIZES = [
	8,
	16,
	32,
	64,
	128,
	256,
	512,
	1024
];
/**
* Core storage calculation formula
* @param bitrateMbps - Camera bitrate in Megabits per second
* @param cameras - Number of cameras
* @param hoursPerDay - Active recording hours per day
* @param days - Number of days to store footage
* @returns Storage in GB
*/
var calculateStorageGb = (bitrateMbps, cameras, hoursPerDay, days) => bitrateMbps * 125e3 * 3600 * hoursPerDay * cameras * days / 1e9;
/**
* Round up to next standard card size
*/
var roundUpToCardSize = (gb) => STANDARD_CARD_SIZES.find((size) => size >= gb) ?? 1024;
/**
* Get label for a card size (rounds up to next standard)
*/
var getRecommendedCardLabel = (gb) => {
	const cardSize = roundUpToCardSize(gb);
	if (cardSize >= 1024) return `${cardSize / 1024} ТБ`;
	return `${cardSize} ГБ`;
};
var camerasWord = (n) => {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod100 >= 11 && mod100 <= 14) return "камер";
	if (mod10 === 1) return "камера";
	if (mod10 >= 2 && mod10 <= 4) return "камеры";
	return "камер";
};
/**
* Simple mode calculation
* Uses default H.264 bitrates, derives everything from resolution + recording mode
*/
var calculateSimple = (input) => {
	const { cameras, resolution, recordingMode, storageDays } = input;
	const bitrateMbps = DEFAULT_BITRATES[resolution].medium;
	const hoursPerDay = RECORDING_MODE_HOURS[recordingMode];
	const minimumGb = calculateStorageGb(bitrateMbps, cameras, hoursPerDay, storageDays);
	const recommendedGb = minimumGb * 1.15;
	const recordingModeLabel = recordingMode === "continuous" ? "постоянная запись" : "запись по движению";
	return {
		minimumGb,
		recommendedGb,
		minimumLabel: getRecommendedCardLabel(minimumGb),
		recommendedLabel: getRecommendedCardLabel(recommendedGb),
		details: `${cameras} ${camerasWord(cameras)} · ${resolution} · ${hoursPerDay}ч/сут · ${storageDays} дн · ${recordingModeLabel}`
	};
};
/**
* Advanced mode calculation
* Uses explicit bitrate input with codec and quality adjustments
*/
var calculateAdvanced = (input) => {
	const { cameras, bitrateMbps, codec, videoQuality, sceneActivity, hoursPerDay, storageDays, resolution } = input;
	const codecMultiplier = CODEC_MULTIPLIERS[codec];
	const qualityMultiplier = QUALITY_MULTIPLIERS[videoQuality];
	const activityMultiplier = ACTIVITY_MULTIPLIERS[sceneActivity];
	const minimumGb = calculateStorageGb(bitrateMbps * codecMultiplier * qualityMultiplier * activityMultiplier, cameras, hoursPerDay, storageDays);
	const recommendedGb = minimumGb * 1.15;
	const [resLabel] = resolution.split("_");
	return {
		minimumGb,
		recommendedGb,
		minimumLabel: getRecommendedCardLabel(minimumGb),
		recommendedLabel: getRecommendedCardLabel(recommendedGb),
		details: `${cameras} ${camerasWord(cameras)} · ${resLabel} · ${codec} · ${bitrateMbps} Мбит/с · ${hoursPerDay}ч/сут · ${storageDays} дн`
	};
};
//#endregion
//#region src/shared/ui/Typography/Label/Label.tsx
var Label = ({ children, className }) => /* @__PURE__ */ jsx("label", {
	className: cn("block text-sm font-medium text-[var(--color-text-primary)] mb-1.5", className),
	children
});
//#endregion
//#region src/features/calculator/SimpleCalculatorForm.tsx
var SimpleCalculatorForm = ({ onResult }) => {
	const [cameras, setCameras] = useState(2);
	const [resolution, setResolution] = useState("1080p");
	const [recordingMode, setRecordingMode] = useState("continuous");
	const [storageDays, setStorageDays] = useState(30);
	const handleCalculate = () => {
		onResult(calculateSimple({
			cameras,
			resolution,
			recordingMode,
			storageDays
		}));
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Количество камер" }), /* @__PURE__ */ jsx(Stepper, {
				value: cameras,
				onChange: setCameras,
				min: 1,
				max: 64
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Разрешение камеры" }), /* @__PURE__ */ jsx(ChipSelector, {
				options: RESOLUTIONS,
				value: resolution,
				onChange: setResolution
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Label, { children: "Режим записи" }),
				/* @__PURE__ */ jsx(ToggleSwitch, {
					options: [{
						value: "continuous",
						label: "Постоянная"
					}, {
						value: "motion",
						label: "По движению"
					}],
					value: recordingMode,
					onChange: setRecordingMode
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-xs text-[var(--color-text-muted)]",
					children: recordingMode === "motion" ? "Запись активна ~25% времени — существенно экономит место" : "Камера записывает непрерывно 24/7"
				})
			] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Длительность хранения" }), /* @__PURE__ */ jsx(ChipSelector, {
				options: STORAGE_DAYS_OPTIONS,
				value: storageDays,
				onChange: setStorageDays
			})] }),
			/* @__PURE__ */ jsx(Button, {
				size: "lg",
				className: "w-full mt-2",
				onClick: handleCalculate,
				children: "Рассчитать объём"
			})
		]
	});
};
//#endregion
//#region src/shared/ui/Blocks/NumberInput/NumberInput.tsx
var NumberInput = ({ value, onChange, min = 0, max = 999, step = 1, hint, className }) => /* @__PURE__ */ jsxs("div", {
	className,
	children: [/* @__PURE__ */ jsx(NumberField.Root, {
		value,
		onValueChange: (v) => {
			if (v !== null) onChange(v);
		},
		min,
		max,
		step,
		children: /* @__PURE__ */ jsx(NumberField.Group, {
			className: "flex",
			children: /* @__PURE__ */ jsx(NumberField.Input, { className: "w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors" })
		})
	}), hint && /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs text-[var(--color-text-muted)]",
		children: hint
	})]
});
//#endregion
//#region src/shared/ui/Blocks/Select/Select.tsx
var ChevronIcon = (props) => /* @__PURE__ */ jsx("svg", {
	width: "10",
	height: "10",
	viewBox: "0 0 10 10",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	...props,
	children: /* @__PURE__ */ jsx("path", { d: "M1 3.5L5 7L9 3.5" })
});
var CheckIcon = (props) => /* @__PURE__ */ jsx("svg", {
	width: "10",
	height: "10",
	viewBox: "0 0 10 10",
	fill: "currentColor",
	...props,
	children: /* @__PURE__ */ jsx("path", { d: "M9.16 1.12a.75.75 0 0 1 0 1.07L4.14 8.66a.75.75 0 0 1-1.14.04L1.19 5.95a.75.75 0 1 1 1.06-1.07l1.32 1.31L8.12 1.12a.75.75 0 0 1 1.04 0Z" })
});
var Select$1 = ({ value, onChange, options, placeholder, className }) => /* @__PURE__ */ jsxs(Select.Root, {
	value,
	onValueChange: (v) => {
		if (v) onChange(v);
	},
	items: options,
	children: [/* @__PURE__ */ jsxs(Select.Trigger, {
		className: cn("w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-colors cursor-pointer", className),
		children: [/* @__PURE__ */ jsx(Select.Value, { placeholder }), /* @__PURE__ */ jsx(Select.Icon, {
			className: "ml-2 text-[var(--color-text-muted)]",
			children: /* @__PURE__ */ jsx(ChevronIcon, {})
		})]
	}), /* @__PURE__ */ jsx(Select.Portal, { children: /* @__PURE__ */ jsx(Select.Positioner, {
		sideOffset: 4,
		alignItemWithTrigger: false,
		children: /* @__PURE__ */ jsx(Select.Popup, {
			className: "z-50 min-w-[var(--anchor-width)] rounded-lg border border-[var(--color-border)] bg-white shadow-lg py-1 overflow-auto max-h-60",
			children: /* @__PURE__ */ jsx(Select.List, { children: options.map((option) => /* @__PURE__ */ jsxs(Select.Item, {
				value: option.value,
				className: "flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] cursor-pointer data-[highlighted]:bg-[var(--color-surface)] outline-none",
				children: [/* @__PURE__ */ jsx(Select.ItemIndicator, {
					className: "w-4 flex-shrink-0 text-[var(--color-primary)]",
					children: /* @__PURE__ */ jsx(CheckIcon, {})
				}), /* @__PURE__ */ jsx(Select.ItemText, { children: option.label })]
			}, option.value)) })
		})
	}) })]
});
//#endregion
//#region src/features/calculator/AdvancedCalculatorForm.tsx
var AdvancedCalculatorForm = ({ onResult }) => {
	const [cameras, setCameras] = useState(1);
	const [resolution, setResolution] = useState("1080p_30");
	const [codec, setCodec] = useState("H.264");
	const [videoQuality, setVideoQuality] = useState("medium");
	const [sceneActivity, setSceneActivity] = useState("medium");
	const [bitrateMbps, setBitrateMbps] = useState(4);
	const [hoursPerDay, setHoursPerDay] = useState(8);
	const [storageDays, setStorageDays] = useState(30);
	const resolutionLabel = RESOLUTION_FPS_OPTIONS.find((r) => r.value === resolution);
	const bitrateHint = resolutionLabel ? BITRATE_HINTS[resolutionLabel.label.split(" ")[0]] ?? void 0 : void 0;
	useEffect(() => {
		const opt = RESOLUTION_FPS_OPTIONS.find((r) => r.value === resolution);
		if (opt) setBitrateMbps(opt.bitrate);
	}, [resolution]);
	const handleCalculate = () => {
		onResult(calculateAdvanced({
			cameras,
			resolution,
			bitrateMbps,
			codec,
			videoQuality,
			sceneActivity,
			hoursPerDay,
			storageDays
		}));
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Label, { children: "Формат видео (кодек)" }),
				/* @__PURE__ */ jsx(ChipSelector, {
					options: CODEC_OPTIONS.map((o) => ({
						value: o.value,
						label: o.label
					})),
					value: codec,
					onChange: (v) => setCodec(v)
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1.5 text-xs text-[var(--color-text-muted)]",
					children: CODEC_OPTIONS.find((c) => c.value === codec)?.description
				})
			] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1.5 mb-1.5",
				children: [/* @__PURE__ */ jsx(Label, {
					className: "mb-0",
					children: "Качество видео"
				}), /* @__PURE__ */ jsx("span", {
					title: "Влияет на эффективный битрейт записи",
					className: "cursor-help text-[var(--color-text-muted)] text-xs",
					children: "ⓘ"
				})]
			}), /* @__PURE__ */ jsx(ToggleSwitch, {
				options: QUALITY_OPTIONS,
				value: videoQuality,
				onChange: setVideoQuality
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1.5 mb-1.5",
					children: [/* @__PURE__ */ jsx(Label, {
						className: "mb-0",
						children: "Активность в кадре"
					}), /* @__PURE__ */ jsx("span", {
						title: "Насыщенность движением в кадре — влияет на VBR",
						className: "cursor-help text-[var(--color-text-muted)] text-xs",
						children: "ⓘ"
					})]
				}),
				/* @__PURE__ */ jsx(ToggleSwitch, {
					options: ACTIVITY_OPTIONS.map((a) => ({
						value: a.value,
						label: a.label
					})),
					value: sceneActivity,
					onChange: setSceneActivity
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1.5 text-xs text-[var(--color-text-muted)]",
					children: ACTIVITY_OPTIONS.find((a) => a.value === sceneActivity)?.hint
				})
			] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Разрешение и частота кадров" }), /* @__PURE__ */ jsx(Select$1, {
				value: resolution,
				onChange: (v) => setResolution(v),
				options: RESOLUTION_FPS_OPTIONS.map((o) => ({
					value: o.value,
					label: `${o.label} (базов. ${o.bitrate} Мбит/с)`
				}))
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Битрейт (Мбит/с)" }), /* @__PURE__ */ jsx(NumberInput, {
				value: bitrateMbps,
				onChange: setBitrateMbps,
				min: .1,
				max: 200,
				step: .5,
				hint: bitrateHint ? `Типичный диапазон: ${bitrateHint}` : void 0
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Число камер" }), /* @__PURE__ */ jsx(NumberInput, {
				value: cameras,
				onChange: setCameras,
				min: 1,
				max: 128,
				step: 1
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Часов работы в сутки" }), /* @__PURE__ */ jsx(NumberInput, {
				value: hoursPerDay,
				onChange: setHoursPerDay,
				min: 1,
				max: 24,
				step: 1,
				hint: "24 — непрерывная запись"
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Длительность хранения, дней" }), /* @__PURE__ */ jsx(NumberInput, {
				value: storageDays,
				onChange: setStorageDays,
				min: 1,
				max: 365,
				step: 1
			})] }),
			/* @__PURE__ */ jsx(Button, {
				size: "lg",
				className: "w-full",
				onClick: handleCalculate,
				children: "Рассчитать объём"
			})
		]
	});
};
//#endregion
//#region src/features/calculator/CalculatorResults.tsx
var CalculatorResults = ({ result }) => /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsxs(motion.div, {
	initial: {
		opacity: 0,
		y: 20
	},
	animate: {
		opacity: 1,
		y: 0
	},
	transition: { duration: .4 },
	className: "mt-8",
	children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold text-[var(--color-text-primary)] mb-4",
			children: "Необходимый объём хранилища"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-2 gap-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2",
						children: "Минимальный объём"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-3xl font-bold text-[var(--color-text-primary)] mb-1",
						children: result.minimumLabel
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-[var(--color-text-muted)]",
						children: result.details
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-5 rounded-2xl bg-[var(--color-primary)] text-white",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-medium text-white/60 uppercase tracking-wide mb-2",
						children: "Рекомендуемый объём"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-3xl font-bold text-white mb-1",
						children: result.recommendedLabel
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-white/50",
						children: result.details
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-3 text-xs text-[var(--color-text-muted)]",
			children: "Рекомендуемый объём включает запас +15% для файловой системы и пиков битрейта"
		})
	]
}, result.details) });
//#endregion
//#region src/shared/api/products/mockAdapter.ts
/**
* Mock product adapter
*
* Used as a fallback when Onliner/Ozon APIs are unavailable.
* Contains realistic product data for common surveillance-grade SD cards.
*/
var MOCK_PRODUCTS = [
	{
		id: "samsung-evo-plus-256",
		name: "Samsung EVO Plus 256GB microSDXC",
		capacityGb: 256,
		priceFormatted: "89.99 BYN",
		priceValue: 89.99,
		currency: "BYN",
		imageUrl: "https://images5.onliner.by/catalog/2023/05/05/23/62/3600.jpg",
		productUrl: "https://catalog.onliner.by/sdcard",
		shopName: "Онлайнер",
		rating: 4.8,
		reviewCount: 1240,
		recommendReason: "Отличный баланс цены и ёмкости для систем видеонаблюдения"
	},
	{
		id: "kingston-canvas-128",
		name: "Kingston Canvas Select Plus 128GB microSDXC",
		capacityGb: 128,
		priceFormatted: "44.99 BYN",
		priceValue: 44.99,
		currency: "BYN",
		imageUrl: "https://images5.onliner.by/catalog/2023/05/05/23/62/3600.jpg",
		productUrl: "https://catalog.onliner.by/sdcard",
		shopName: "Онлайнер",
		rating: 4.7,
		reviewCount: 892,
		recommendReason: "Высокая надёжность, специально для непрерывной записи"
	},
	{
		id: "wd-purple-64",
		name: "WD Purple 64GB microSDXC",
		capacityGb: 64,
		priceFormatted: "24.99 BYN",
		priceValue: 24.99,
		currency: "BYN",
		imageUrl: "https://images5.onliner.by/catalog/2023/05/05/23/62/3600.jpg",
		productUrl: "https://catalog.onliner.by/sdcard",
		shopName: "Онлайнер",
		rating: 4.9,
		reviewCount: 567,
		recommendReason: "Разработана специально для систем безопасности, повышенная выносливость"
	},
	{
		id: "samsung-pro-endurance-128",
		name: "Samsung PRO Endurance 128GB microSDXC",
		capacityGb: 128,
		priceFormatted: "59.90 BYN",
		priceValue: 59.9,
		currency: "BYN",
		imageUrl: "https://images5.onliner.by/catalog/2023/05/05/23/62/3600.jpg",
		productUrl: "https://catalog.onliner.by/sdcard",
		shopName: "Онлайнер",
		rating: 4.9,
		reviewCount: 2341,
		recommendReason: "До 140 000 часов записи, лучший выбор для видеонаблюдения"
	},
	{
		id: "lexar-silver-256",
		name: "Lexar Professional Silver 256GB microSDXC",
		capacityGb: 256,
		priceFormatted: "79.90 BYN",
		priceValue: 79.9,
		currency: "BYN",
		imageUrl: "https://images5.onliner.by/catalog/2023/05/05/23/62/3600.jpg",
		productUrl: "https://catalog.onliner.by/sdcard",
		shopName: "Онлайнер",
		rating: 4.6,
		reviewCount: 445,
		recommendReason: "Высокая скорость записи, подходит для 4K видеонаблюдения"
	},
	{
		id: "wd-purple-128",
		name: "WD Purple 128GB microSDXC",
		capacityGb: 128,
		priceFormatted: "42.50 BYN",
		priceValue: 42.5,
		currency: "BYN",
		imageUrl: "https://images5.onliner.by/catalog/2023/05/05/23/62/3600.jpg",
		productUrl: "https://catalog.onliner.by/sdcard",
		shopName: "Онлайнер",
		rating: 4.8,
		reviewCount: 788,
		recommendReason: "Оптимизирована для AI-камер и систем безопасности"
	}
];
var mockProductAdapter = { getProducts: async (params) => {
	await new Promise((resolve) => setTimeout(resolve, 800));
	const minCard = roundUpToCardSize(params.minCapacityGb);
	const maxCap = params.maxCapacityGb ?? Infinity;
	return MOCK_PRODUCTS.filter((p) => p.capacityGb >= minCard && p.capacityGb <= maxCap).sort((a, b) => a.priceValue - b.priceValue);
} };
//#endregion
//#region src/shared/api/api.ts
var apiClient = ky.create({
	timeout: 1e4,
	retry: {
		limit: 2,
		methods: ["get"]
	},
	hooks: { beforeError: [(error) => {
		const { response } = error;
		if (response) console.warn(`[API] ${response.status} ${response.url}`);
		return error;
	}] }
});
//#endregion
//#region src/shared/api/apiRoutes.ts
/**
* Centralized API endpoint definitions.
* Single source of truth for all external service URLs.
*/
var API_ROUTES = { onliner: {
	sdCards: "https://catalog.api.onliner.by/search/sdcard",
	catalog: "https://catalog.onliner.by/sdcard"
} };
//#endregion
//#region src/shared/api/products/onlinerAdapter.ts
/**
* Onliner catalog adapter for memory cards (SD/microSD)
*
* Uses Onliner's unofficial but publicly accessible catalog API.
* Endpoint: https://catalog.onliner.by/sdcard
*
* Note: Onliner's API is not officially documented and may change.
* The adapter is wrapped in try/catch so we can fall back to mock.
*/
var parseCapacityGb = (name) => {
	const match = name.match(/(\d+)\s*(?:GB|ГБ|TB|ТБ)/i);
	if (!match) return null;
	const value = parseInt(match[1], 10);
	return /TB|ТБ/i.test(name.slice(name.indexOf(match[0]))) ? value * 1024 : value;
};
var onlinerProductAdapter = { getProducts: async (params) => {
	const minCard = roundUpToCardSize(params.minCapacityGb);
	return (await (await apiClient.get(API_ROUTES.onliner.sdCards, { searchParams: {
		"page[limit]": 30,
		"page[offset]": 0
	} })).json()).products.map((p) => {
		const capacity = parseCapacityGb(p.full_name || p.name);
		if (!capacity || capacity < minCard) return null;
		const price = p.prices?.price_min;
		return {
			id: String(p.id),
			name: p.full_name || p.name,
			capacityGb: capacity,
			priceFormatted: price ? `${price.amount} ${price.currency}` : "Уточните цену",
			priceValue: price ? parseFloat(price.amount) : 0,
			currency: price?.currency ?? "BYN",
			imageUrl: p.images?.header,
			productUrl: p.html_url ?? API_ROUTES.onliner.catalog,
			shopName: "Онлайнер",
			rating: p.reviews?.rating,
			reviewCount: p.reviews?.count,
			recommendReason: `Подходит по объёму (${capacity} ГБ ≥ ${minCard} ГБ)`
		};
	}).filter((p) => p !== null).sort((a, b) => a.priceValue - b.priceValue);
} };
//#endregion
//#region src/shared/api/products/productService.ts
/**
* Product service with automatic fallback chain:
* 1. Try Onliner API
* 2. If fails → fall back to mock data
*
* This abstraction makes it trivial to add new adapters.
*/
var fetchProducts = async (params) => {
	try {
		const products = await onlinerProductAdapter.getProducts(params);
		if (products.length > 0) return products;
		return mockProductAdapter.getProducts(params);
	} catch {
		console.info("[ProductService] Onliner unavailable, using mock data");
		return mockProductAdapter.getProducts(params);
	}
};
//#endregion
//#region src/shared/api/products/products.queries.ts
/**
* Centralized query keys for the products domain.
* Stable, serializable, and reusable.
*/
var productKeys = {
	all: ["products"],
	byMinCapacity: (minCapacityGb) => [...productKeys.all, roundUpToCardSize(minCapacityGb)]
};
/**
* Fetches products matching the minimum capacity requirement.
* Query is disabled when minimumGb <= 0.
*/
var useProducts = (minimumGb) => {
	const minCard = roundUpToCardSize(minimumGb);
	return useQuery({
		queryKey: productKeys.byMinCapacity(minimumGb),
		queryFn: () => fetchProducts({ minCapacityGb: minCard }),
		enabled: minimumGb > 0
	});
};
//#endregion
//#region src/shared/ui/Blocks/ProductCard/ProductCard.tsx
var PLACEHOLDER_IMAGES = [
	"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80",
	"https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80",
	"https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=300&q=80"
];
var getPlaceholder = (id) => {
	return PLACEHOLDER_IMAGES[id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % PLACEHOLDER_IMAGES.length];
};
var ProductCard = ({ product, className }) => {
	const imgSrc = product.imageUrl && product.imageUrl.startsWith("http") ? product.imageUrl : getPlaceholder(product.id);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 flex flex-col", className),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative aspect-[4/3] bg-[var(--color-surface)] overflow-hidden",
			children: [/* @__PURE__ */ jsx("img", {
				src: imgSrc,
				alt: product.name,
				className: "w-full h-full object-cover",
				onError: (e) => {
					e.target.src = getPlaceholder(product.id);
				}
			}), /* @__PURE__ */ jsx("div", {
				className: "absolute top-2.5 right-2.5",
				children: /* @__PURE__ */ jsx("span", {
					className: "px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-white",
					children: product.capacityGb >= 1024 ? `${product.capacityGb / 1024} ТБ` : `${product.capacityGb} ГБ`
				})
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-4 flex flex-col flex-1",
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] leading-tight mb-1 line-clamp-2",
					children: product.name
				}),
				product.rating && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1.5 mb-2",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx("svg", {
							className: cn("w-3.5 h-3.5", i < Math.round(product.rating ?? 0) ? "text-amber-400" : "text-gray-200"),
							fill: "currentColor",
							viewBox: "0 0 20 20",
							children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
						}, i))
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-xs text-[var(--color-text-muted)]",
						children: [product.reviewCount?.toLocaleString("ru"), " оценок"]
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-[var(--color-text-secondary)] mb-3 flex-1 line-clamp-2",
					children: product.recommendReason
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-3 mt-auto pt-3 border-t border-[var(--color-border)]",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-lg font-bold text-[var(--color-text-primary)]",
						children: product.priceFormatted
					}), /* @__PURE__ */ jsx("a", {
						href: product.productUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-accent)] transition-colors duration-150 whitespace-nowrap",
						children: "Купить"
					})]
				})
			]
		})]
	});
};
//#endregion
//#region src/features/products/ProductList.tsx
var ProductList = ({ minimumGb }) => {
	const minCard = roundUpToCardSize(minimumGb);
	const { data, isLoading, isError } = useProducts(minimumGb);
	if (isLoading) return /* @__PURE__ */ jsxs("div", {
		className: "mt-10",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold text-[var(--color-text-primary)] mb-4",
			children: "Рекомендуемые товары"
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-[var(--color-surface)] h-64 animate-pulse" }, i))
		})]
	});
	if (isError || !data?.length) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-10",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-lg font-semibold text-[var(--color-text-primary)] mb-2",
				children: "Рекомендуемые товары"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-[var(--color-text-muted)] mb-5",
				children: [
					"Карты памяти ёмкостью от ",
					minCard,
					" ГБ, подходящие для вашей системы"
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: data.map((product, idx) => /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .35,
						delay: idx * .08
					},
					children: /* @__PURE__ */ jsx(ProductCard, {
						product,
						className: "h-full"
					})
				}, product.id))
			})
		]
	});
};
//#endregion
//#region src/features/calculator/Calculator.tsx
var Calculator = () => {
	const [mode, setMode] = useState("simple");
	const [result, setResult] = useState(null);
	const handleResult = (r) => {
		setResult(r);
		setTimeout(() => {
			document.getElementById("results-section")?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}, 100);
	};
	const handleModeChange = (newMode) => {
		setMode(newMode);
		setResult(null);
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2",
				children: "Калькулятор ёмкости"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-[var(--color-text-secondary)] text-sm",
				children: "Рассчитайте необходимый объём карты памяти для вашей системы видеонаблюдения"
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-8 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center gap-3 justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: "Режим калькулятора"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-[var(--color-text-muted)]",
					children: "Выберите подходящий уровень детализации"
				})] }), /* @__PURE__ */ jsx(ToggleSwitch, {
					options: [{
						value: "simple",
						label: "✦ Простой"
					}, {
						value: "advanced",
						label: "⚙ Продвинутый"
					}],
					value: mode,
					onChange: handleModeChange
				})]
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-8",
			children: [/* @__PURE__ */ jsx(AnimatePresence, {
				mode: "wait",
				children: mode === "simple" ? /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						x: -10
					},
					animate: {
						opacity: 1,
						x: 0
					},
					exit: {
						opacity: 0,
						x: 10
					},
					transition: { duration: .2 },
					children: /* @__PURE__ */ jsx(SimpleCalculatorForm, { onResult: handleResult })
				}, "simple") : /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						x: 10
					},
					animate: {
						opacity: 1,
						x: 0
					},
					exit: {
						opacity: 0,
						x: -10
					},
					transition: { duration: .2 },
					children: /* @__PURE__ */ jsx(AdvancedCalculatorForm, { onResult: handleResult })
				}, "advanced")
			}), /* @__PURE__ */ jsx(AnimatePresence, { children: result && /* @__PURE__ */ jsx("div", {
				id: "results-section",
				children: /* @__PURE__ */ jsx(CalculatorResults, { result })
			}) })]
		}),
		/* @__PURE__ */ jsx(AnimatePresence, { children: result && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .4,
				delay: .1
			},
			children: /* @__PURE__ */ jsx(ProductList, { minimumGb: result.minimumGb })
		}) })
	] });
};
//#endregion
//#region app/routes/calculator.tsx
var meta = () => {
	return [{ title: "Калькулятор ёмкости карт памяти" }, {
		name: "description",
		content: "Рассчитайте необходимый объём карт памяти для систем видеонаблюдения."
	}];
};
var calculator_default = UNSAFE_withComponentProps(function CalculatorRoute() {
	return /* @__PURE__ */ jsx("section", {
		className: "py-12 md:py-16 bg-[var(--color-surface)] min-h-[calc(100vh-64px)]",
		children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Calculator, {}) })
	});
});
//#endregion
export { calculator_default as default, meta };
