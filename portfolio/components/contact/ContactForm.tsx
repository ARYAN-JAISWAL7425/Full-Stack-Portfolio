"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/content";
import Magnetic from "@/components/ui/Magnetic";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The contact form — posts directly to Web3Forms (client-side; their free
 * plan only allows browser submissions). Styled for a dark background.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", botcheck: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Tell me a little more";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    if (!validate()) return;
    if (form.botcheck) return; // honeypot tripped — silently ignore
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          from_name: "Aryan Jaiswal — Portfolio",
          subject: `New message from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("sent");
      } else {
        setStatus("error");
        setServerError(data?.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again or email me directly.");
    }
  };

  const field =
    "w-full border-b border-bone/20 bg-transparent py-4 text-bone placeholder:text-bone/30 outline-none transition-colors focus:border-vermillion";

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-bone/15 p-10"
      >
        <span className="text-4xl">✦</span>
        <h3 className="font-display text-3xl font-bold">Message sent.</h3>
        <p className="max-w-sm text-bone/60">
          Thanks for reaching out — I&apos;ll get back to you within a day or two.
          Prefer email? Reach me directly at{" "}
          <a href={`mailto:${site.email}`} className="text-vermillion-soft underline">
            {site.email}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex min-w-0 flex-col gap-7">
      {/* honeypot — invisible to people, trips up bots */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.botcheck}
        onChange={(e) => setForm({ ...form, botcheck: e.target.value })}
        className="hidden"
      />
      <div>
        <label htmlFor="name" className="eyebrow text-bone/40">
          Your name
        </label>
        <input
          id="name"
          className={field}
          placeholder="Jane Founder"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && (
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-vermillion">
            {errors.name}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="email" className="eyebrow text-bone/40">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={field}
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && (
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-vermillion">
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="message" className="eyebrow text-bone/40">
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Say hello, share a project, or tell me what you're exploring."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        {errors.message && (
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-vermillion">
            {errors.message}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Magnetic strength={0.3} className="self-start">
          <button
            type="submit"
            disabled={status === "sending"}
            data-cursor="send"
            className="inline-flex items-center gap-2 rounded-full bg-vermillion px-7 py-3.5 text-sm font-medium text-bone-2 transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
            <span aria-hidden>→</span>
          </button>
        </Magnetic>
        {status === "error" && serverError && (
          <p className="font-mono text-[11px] uppercase tracking-wider text-vermillion-soft">
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}
