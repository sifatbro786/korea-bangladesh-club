"use client";

import { useId, useRef, useState } from "react";
import Arrow from "@/components/ui/Arrow";
import Select from "@/components/ui/Select";
import { Field, inputClass } from "@/components/forms/Field";

/*
 * Membership application — Phase 1 UI only.
 * PHASE 2: replace `submit` with a Server Action: zod validation (same rules as below),
 * rate limit per IP, honeypot check, store in MongoDB, email the secretariat.
 * Do NOT launch with this mock — nothing is sent anywhere yet.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s-]{7,20}$/;

function validate(fd) {
    const e = {};
    const name = String(fd.get("fullName") ?? "").trim();
    if (name.length < 2) e.fullName = "Please enter your full name.";
    if (!EMAIL.test(String(fd.get("email") ?? "").trim())) e.email = "Please enter a valid email address.";
    if (!PHONE.test(String(fd.get("phone") ?? "").trim())) e.phone = "Please enter a phone number, including country code.";
    if (!fd.get("nationality")) e.nationality = "Please choose one.";
    if (!fd.get("category")) e.category = "Please choose a membership category.";
    if (String(fd.get("message") ?? "").length > 1000) e.message = "Please keep this under 1,000 characters.";
    if (!fd.get("consent")) e.consent = "Please confirm so we can process your application.";
    return e;
}

export default function ApplicationForm({ data, categories }) {
    const uid = useId();
    const formRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | sent

    const id = (name) => `${uid}-${name}`;
    const a11y = (name, hint) => ({
        id: id(name),
        name,
        "aria-invalid": errors[name] ? true : undefined,
        "aria-describedby": errors[name] ? `${id(name)}-error` : hint ? `${id(name)}-hint` : undefined,
    });

    async function submit(event) {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        if (fd.get("website")) return; // honeypot
        const found = validate(fd);
        setErrors(found);
        const first = Object.keys(found)[0];
        if (first) {
            const el = formRef.current?.querySelector(`[data-field="${first}"]`) ?? formRef.current?.querySelector(`[name="${first}"]`);
            el?.focus();
            return;
        }
        setStatus("sending");
        await new Promise((r) => setTimeout(r, 700)); // PHASE 2: Server Action
        setStatus("sent");
    }

    if (status === "sent") {
        return (
            <div role="status" className="border-t border-line pt-10">
                <p className="text-label uppercase tracking-label text-accent">Received</p>
                <p className="mt-6 font-display text-display-sm font-light">{data.successTitle}</p>
                <p className="mt-4">{data.successBody}</p>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={submit} noValidate className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {/* Honeypot: hidden from people, filled by bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
            </div>

            <Field id={id("fullName")} label="Full name" required error={errors.fullName}>
                <input {...a11y("fullName")} type="text" autoComplete="name" maxLength={100} className={inputClass} />
            </Field>
            <Field id={id("company")} label="Company">
                <input {...a11y("company")} type="text" autoComplete="organization" maxLength={120} className={inputClass} />
            </Field>
            <Field id={id("designation")} label="Designation">
                <input {...a11y("designation")} type="text" autoComplete="organization-title" maxLength={80} className={inputClass} />
            </Field>
            <Field id={id("email")} label="Email" required error={errors.email}>
                <input {...a11y("email")} type="email" autoComplete="email" maxLength={160} className={inputClass} />
            </Field>
            <Field id={id("phone")} label="Phone" required error={errors.phone} hint="Include the country code, e.g. +880 or +82.">
                <input {...a11y("phone", true)} type="tel" autoComplete="tel" maxLength={20} className={inputClass} />
            </Field>
            <Field id={id("nationality")} label="Nationality" required error={errors.nationality}>
                <Select
                    id={id("nationality")}
                    name="nationality"
                    labelId={`${id("nationality")}-label`}
                    invalid={Boolean(errors.nationality)}
                    describedBy={errors.nationality ? `${id("nationality")}-error` : undefined}
                    options={[
                        { value: "bangladeshi", label: "Bangladeshi" },
                        { value: "korean", label: "Korean" },
                        { value: "other", label: "Other" },
                    ]}
                />
            </Field>
            <Field id={id("category")} label="Membership category" required error={errors.category}>
                <Select
                    id={id("category")}
                    name="category"
                    labelId={`${id("category")}-label`}
                    invalid={Boolean(errors.category)}
                    describedBy={errors.category ? `${id("category")}-error` : undefined}
                    options={categories.map((c) => ({ value: c.key, label: c.name }))}
                />
            </Field>
            <Field id={id("nominator")} label="Nominating member" hint="Leave blank if you don't know a member yet.">
                <input {...a11y("nominator", true)} type="text" maxLength={100} className={inputClass} />
            </Field>
            <Field id={id("message")} label="Anything we should know?" error={errors.message} className="sm:col-span-2">
                <textarea {...a11y("message")} rows={4} maxLength={1000} className={`${inputClass} resize-y`} />
            </Field>

            <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-4">
                    <input
                        type="checkbox"
                        name="consent"
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
                        className="peer mt-1 size-4 shrink-0 cursor-pointer appearance-none border border-line bg-transparent checked:border-accent checked:bg-accent"
                    />
                    <span className="text-sm">{data.consent}</span>
                </label>
                {errors.consent ? (
                    <p id={`${id("consent")}-error`} role="alert" className="mt-2 text-sm text-danger">
                        {errors.consent}
                    </p>
                ) : null}
            </div>

            <div className="sm:col-span-2">
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-4 border border-accent px-8 py-4 text-sm uppercase tracking-[0.18em] text-accent transition-colors duration-500 hover:bg-accent hover:text-bg disabled:opacity-60"
                >
                    {status === "sending" ? "Sending…" : data.submitLabel}
                    <Arrow className="group-hover:translate-x-1" />
                </button>
            </div>
        </form>
    );
}
