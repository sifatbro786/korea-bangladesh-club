"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { Field, inputClass } from "@/components/forms/Field";
import Arrow from "@/components/ui/Arrow";
import Select from "@/components/ui/Select";

/*
 * Contact form — Phase 1 UI only (validation, honeypot, a11y done; submit is faked).
 * PHASE 2: Server Action + zod + rate limit + MongoDB + email to the secretariat.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s-]{7,20}$/;

// Read ?subject= without useSearchParams (which would need a Suspense boundary under cacheComponents).
const subscribe = () => () => {};
const readSearch = () => window.location.search;
const readServer = () => "";

function validate(fd) {
    const e = {};
    if (String(fd.get("fullName") ?? "").trim().length < 2) e.fullName = "Please enter your name.";
    if (!EMAIL.test(String(fd.get("email") ?? "").trim())) e.email = "Please enter a valid email address.";
    const phone = String(fd.get("phone") ?? "").trim();
    if (phone && !PHONE.test(phone)) e.phone = "Please check the phone number.";
    if (!fd.get("subject")) e.subject = "Please choose a subject.";
    const msg = String(fd.get("message") ?? "").trim();
    if (msg.length < 10) e.message = "Please write a little more (at least 10 characters).";
    if (msg.length > 2000) e.message = "Please keep this under 2,000 characters.";
    if (!fd.get("consent")) e.consent = "Please confirm so we can reply.";
    return e;
}

export default function ContactForm({ data, subjects, events }) {
    const uid = useId();
    const formRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");

    const search = useSyncExternalStore(subscribe, readSearch, readServer);
    const param = new URLSearchParams(search).get("subject") ?? "";
    const event = events.find((e) => e.slug === param);
    const presetSubject = event ? "events" : subjects.some((s) => s.value === param) ? param : "";
    const presetMessage = event ? `I would like to reserve a place at: ${event.title}.\n\nNumber of guests: ` : "";

    const id = (name) => `${uid}-${name}`;
    const a11y = (name, hint) => ({
        id: id(name),
        name,
        "aria-invalid": errors[name] ? true : undefined,
        "aria-describedby": errors[name] ? `${id(name)}-error` : hint ? `${id(name)}-hint` : undefined,
    });

    async function submit(e) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        if (fd.get("website")) return;
        const found = validate(fd);
        setErrors(found);
        const first = Object.keys(found)[0];
        if (first) {
            (formRef.current?.querySelector(`[data-field="${first}"]`) ?? formRef.current?.querySelector(`[name="${first}"]`))?.focus();
            return;
        }
        setStatus("sending");
        await new Promise((r) => setTimeout(r, 700)); // PHASE 2: Server Action
        setStatus("sent");
    }

    if (status === "sent") {
        return (
            <div role="status" className="border-t border-line pt-10">
                <p className="text-label uppercase tracking-label text-accent">Sent</p>
                <p className="mt-6 font-display text-display-sm font-light">{data.successTitle}</p>
                <p className="mt-4">{data.successBody}</p>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={submit} noValidate className="grid gap-10 sm:grid-cols-2" key={presetSubject + presetMessage}>
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
            </div>

            <Field id={id("fullName")} label="Name" required error={errors.fullName}>
                <input {...a11y("fullName")} type="text" autoComplete="name" maxLength={100} className={inputClass} />
            </Field>
            <Field id={id("email")} label="Email" required error={errors.email}>
                <input {...a11y("email")} type="email" autoComplete="email" maxLength={160} className={inputClass} />
            </Field>
            <Field id={id("phone")} label="Phone" error={errors.phone}>
                <input {...a11y("phone")} type="tel" autoComplete="tel" maxLength={20} className={inputClass} />
            </Field>
            <Field id={id("subject")} label="Subject" required error={errors.subject}>
                <Select
                    id={id("subject")}
                    name="subject"
                    labelId={`${id("subject")}-label`}
                    defaultValue={presetSubject}
                    invalid={Boolean(errors.subject)}
                    describedBy={errors.subject ? `${id("subject")}-error` : undefined}
                    options={subjects}
                />
            </Field>
            <Field id={id("message")} label="Message" required error={errors.message} className="sm:col-span-2">
                <textarea {...a11y("message")} rows={6} maxLength={2000} defaultValue={presetMessage} className={`${inputClass} resize-y`} />
            </Field>

            <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-4">
                    <input
                        type="checkbox"
                        name="consent"
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
                        className="mt-1 size-4 shrink-0 cursor-pointer appearance-none border border-line bg-transparent checked:border-accent checked:bg-accent"
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
