"use client";

import { useEffect, useId, useRef, useState } from "react";
import Arrow from "./Arrow";

/**
 * Themed select (ARIA "select-only combobox" pattern, WAI-ARIA APG).
 * Replaces native <select>, whose option list is drawn by the OS and ignores the site theme.
 *
 * Keyboard: Enter / Space / ↓ / ↑ open · ↑ ↓ Home End move · Enter / Space choose ·
 * Escape closes · Tab chooses the highlighted option and moves on · typing a letter jumps.
 * The value is submitted through a hidden input, so it works with FormData.
 */
export default function Select({
    id,
    name,
    options,
    placeholder = "Choose",
    defaultValue = "",
    labelId,
    invalid = false,
    describedBy,
    className = "",
}) {
    const uid = useId();
    const listId = `${uid}-list`;
    const [value, setValue] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const rootRef = useRef(null);
    const buttonRef = useRef(null);
    const typed = useRef({ text: "", timer: 0 });

    const selectedIndex = options.findIndex((o) => o.value === value);
    const selected = options[selectedIndex];

    // Close when clicking outside.
    useEffect(() => {
        if (!open) return;
        const onDown = (e) => {
            if (!rootRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("pointerdown", onDown);
        return () => document.removeEventListener("pointerdown", onDown);
    }, [open]);

    const openList = () => {
        setActive(selectedIndex >= 0 ? selectedIndex : 0);
        setOpen(true);
    };

    const choose = (index) => {
        if (index < 0 || index >= options.length) return;
        setValue(options[index].value);
        setOpen(false);
        buttonRef.current?.focus();
    };

    const typeahead = (key) => {
        const t = typed.current;
        window.clearTimeout(t.timer);
        t.text += key.toLowerCase();
        t.timer = window.setTimeout(() => (t.text = ""), 600);
        const start = open ? active + 1 : selectedIndex + 1;
        const ordered = [...options.slice(start), ...options.slice(0, start)];
        const hit = ordered.find((o) => o.label.toLowerCase().startsWith(t.text));
        if (!hit) return;
        const index = options.indexOf(hit);
        if (open) setActive(index);
        else setValue(hit.value);
    };

    const onKeyDown = (e) => {
        const last = options.length - 1;
        if (!open) {
            if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
                e.preventDefault();
                openList();
            } else if (e.key.length === 1 && /\S/.test(e.key)) {
                typeahead(e.key);
            }
            return;
        }
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActive((i) => Math.min(i + 1, last));
                break;
            case "ArrowUp":
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
                break;
            case "Home":
                e.preventDefault();
                setActive(0);
                break;
            case "End":
                e.preventDefault();
                setActive(last);
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                choose(active);
                break;
            case "Escape":
                e.preventDefault();
                setOpen(false);
                break;
            case "Tab":
                if (active >= 0) setValue(options[active].value);
                setOpen(false);
                break;
            default:
                if (e.key.length === 1 && /\S/.test(e.key)) typeahead(e.key);
        }
    };

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            <input type="hidden" name={name} value={value} />
            <button
                ref={buttonRef}
                id={id}
                type="button"
                role="combobox"
                data-field={name}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-labelledby={labelId}
                aria-activedescendant={open && active >= 0 ? `${uid}-opt-${active}` : undefined}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                onClick={() => (open ? setOpen(false) : openList())}
                onKeyDown={onKeyDown}
                className={`mt-3 flex w-full items-center justify-between border-0 border-b bg-transparent py-3 text-left transition-colors focus:outline-none focus-visible:outline-none ${
                    invalid ? "border-danger" : open ? "border-accent" : "border-line focus:border-accent"
                }`}
            >
                <span className={selected ? "text-heading" : "text-muted"}>{selected ? selected.label : placeholder}</span>
                <Arrow className={`text-muted transition-transform duration-500 ease-club ${open ? "-rotate-90" : "rotate-90"}`} />
            </button>

            <ul
                id={listId}
                role="listbox"
                aria-labelledby={labelId}
                tabIndex={-1}
                className={`absolute inset-x-0 top-full z-20 mt-2 border border-line bg-surface-2 py-2 transition-[clip-path,opacity] duration-500 ease-club ${
                    open ? "visible opacity-100 [clip-path:inset(0_0_0_0)]" : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]"
                }`}
            >
                {options.map((o, i) => {
                    const isSelected = o.value === value;
                    const isActive = i === active;
                    return (
                        <li
                            key={o.value}
                            id={`${uid}-opt-${i}`}
                            role="option"
                            aria-selected={isSelected}
                            onPointerEnter={() => setActive(i)}
                            onPointerDown={(e) => e.preventDefault()} /* keep focus on the button */
                            onClick={() => choose(i)}
                            className={`flex cursor-pointer items-center justify-between gap-4 px-5 py-3 text-sm transition-colors ${
                                isActive ? "bg-surface text-accent" : "text-heading/85"
                            }`}
                        >
                            {o.label}
                            {isSelected ? <span aria-hidden="true" className="size-[5px] rounded-full bg-accent" /> : null}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
