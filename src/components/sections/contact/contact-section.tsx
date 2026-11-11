import type { ReactNode } from "react";
import { en } from "@/i18n/en";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/config/site";

interface ContactLink {
  readonly label: string;
  readonly href: string;
}

function ContactDetail({
  label,
  children,
  href,
}: {
  readonly label: string;
  readonly children: ReactNode;
  readonly href?: string;
}) {
  const content = (
    <>
      <span className="block font-label-sm text-label-sm uppercase text-on-surface-variant">
        {label}
      </span>
      <span className="font-headline-sm text-headline-sm text-on-surface">
        {children}
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="rounded-2xl bg-surface p-4 shadow-[3px_3px_0px_var(--color-on-surface)]">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      className="block rounded-2xl bg-surface p-4 shadow-[3px_3px_0px_var(--color-on-surface)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {content}
    </a>
  );
}

export function ContactSection() {
  const { contact, header } = en;
  const contactNavigation = header.navigation.find(({ id }) => id === "contact");
  const socialLinks: ContactLink[] = [
    { label: contact.form.linkedIn, href: siteConfig.socialLinks.linkedin },
    { label: contact.form.github, href: siteConfig.socialLinks.github },
    { label: contact.form.x, href: siteConfig.socialLinks.x },
  ].filter((link) => link.href);

  return (
    <section
      id={contactNavigation?.id ?? "contact"}
      aria-label={contactNavigation?.label ?? contact.badge}
      className="contact-content flex flex-col gap-8 pt-12 lg:gap-10 lg:pt-16"
    >
      <div className="flex max-w-3xl flex-col gap-3">
        <Badge variant="primary-fixed" size="sm" className="w-fit">
          {contact.badge}
        </Badge>
        <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface lg:text-headline-lg">
          {contact.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
        <ContactForm labels={contact.form} />
        <aside className="select-text flex min-w-0 flex-col gap-5 rounded-[24px] bg-tertiary-fixed p-5 text-on-tertiary-fixed shadow-[6px_6px_0px_var(--color-on-surface)] sm:p-8 lg:col-span-5">
          <h3 className="flex items-center gap-3 font-headline-sm text-headline-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary">
              <span aria-hidden="true" className="material-icons-outlined">mail</span>
            </span>
            {contact.form.directCoordinates}
          </h3>

          <ContactDetail
            label={contact.form.directEmail}
            href={`mailto:${siteConfig.contactEmail}`}
          >
            <span className="break-all">{siteConfig.contactEmail}</span>
          </ContactDetail>
          <ContactDetail label={contact.form.basedIn}>
            {contact.form.location}
          </ContactDetail>
          <p className="rounded-2xl bg-secondary-container p-4 font-label-sm text-label-sm font-bold text-on-secondary-fixed">
            {contact.form.availability}
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <span className="font-label-sm text-label-sm uppercase">
              {contact.form.connectOnline}
            </span>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-between rounded-xl bg-surface px-3 font-label-sm text-label-sm font-bold shadow-[3px_3px_0px_var(--color-on-surface)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {link.label}
                  <span aria-hidden="true" className="material-icons-outlined text-base">open_in_new</span>
                </a>
              ))}
              <a
                href="/curriculum.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-between rounded-xl bg-primary px-3 font-label-sm text-label-sm font-bold text-on-primary shadow-[3px_3px_0px_var(--color-on-surface)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {contact.form.resume}
                <span aria-hidden="true" className="material-icons-outlined text-base">download</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
