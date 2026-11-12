"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

interface ContactFormLabels {
  readonly nameLabel: string;
  readonly namePlaceholder: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly inquiryLabel: string;
  readonly inquiryPlaceholder: string;
  readonly inquiryOptions: readonly string[];
  readonly messageLabel: string;
  readonly messagePlaceholder: string;
  readonly submit: string;
  readonly sending: string;
  readonly success: string;
  readonly error: string;
}

export function ContactForm({ labels }: { readonly labels: ContactFormLabels }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      if (!response.ok) throw new Error("Contact request failed.");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const statusMessage = status === "success" ? labels.success : status === "error" ? labels.error : "";
  const fieldClassName =
    "select-text caret-primary min-h-12 rounded-xl border-2 border-transparent bg-surface px-4 font-body-md text-body-md font-normal normal-case text-on-surface outline-none transition hover:bg-surface-container-lowest focus:border-primary focus:bg-surface-container-lowest";
  const labelClassName =
    "flex min-w-0 flex-col gap-2 font-label-sm text-label-sm font-bold uppercase text-on-surface";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-0 flex-col gap-6 rounded-[24px] border border-outline/30 bg-surface-container-low p-5 shadow-[2px_2px_0px_#1b1b1c] sm:p-8 lg:col-span-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClassName}>
          {labels.nameLabel}
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            placeholder={labels.namePlaceholder}
            className={fieldClassName}
          />
        </label>
        <label className={labelClassName}>
          {labels.emailLabel}
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder={labels.emailPlaceholder}
            className={fieldClassName}
          />
        </label>
      </div>
      <label className={labelClassName}>
        {labels.inquiryLabel}
        <span className="relative">
          <select
            required
            name="inquiry"
            defaultValue=""
            className={`${fieldClassName} contact-select w-full cursor-pointer pr-11 shadow-[2px_2px_0px_#1b1b1c] focus:shadow-[3px_3px_0px_#1b1b1c]`}
          >
            <option value="" disabled>{labels.inquiryPlaceholder}</option>
            {labels.inquiryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface"
          >
            <span className="material-icons-outlined text-xl">expand_more</span>
          </span>
        </span>
      </label>
      <label className={labelClassName}>
        {labels.messageLabel}
        <textarea
          required
          name="message"
          rows={5}
          maxLength={4000}
          placeholder={labels.messagePlaceholder}
          className={`${fieldClassName} resize-y px-4 py-3`}
        />
      </label>
      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={status === "sending"}
          icon="arrow_forward"
          className="min-h-12 w-full"
        >
          {status === "sending" ? labels.sending : labels.submit}
        </Button>
        {statusMessage && (
          <p
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`rounded-full px-4 py-2 text-center font-label-sm text-label-sm font-bold ${
              status === "success"
                ? "bg-secondary-container text-on-secondary-fixed"
                : "bg-error-container text-on-error-container"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}
