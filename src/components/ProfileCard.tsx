import { useState } from "react";
import { BRAND, CONTACT, addressLines, downloadVCard, mapsUrl } from "../data";
import { GMark, Logo } from "./Logo";
import {
  BriefcaseIcon,
  CheckIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ShareIcon,
  UserPlusIcon,
  WhatsAppIcon,
} from "./Icons";

const waUrl = `https://wa.me/${CONTACT.phoneRaw.replace("+", "")}`;

export function ProfileCard({ compact = false }: { compact?: boolean }) {
  const [shared, setShared] = useState(false);

  const share = async () => {
    const url = window.location.href.split("#")[0] + "#card";
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${CONTACT.fullName} — ${CONTACT.company}`,
          text: `${CONTACT.fullName}, ${CONTACT.title} at ${CONTACT.company}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* cancelled */
    }
  };

  const quick = [
    { label: "Call", href: `tel:${CONTACT.phoneRaw}`, icon: PhoneIcon },
    { label: "WhatsApp", href: waUrl, icon: WhatsAppIcon },
    { label: "Email", href: `mailto:${CONTACT.email}`, icon: MailIcon },
    { label: "Website", href: CONTACT.websiteUrl, icon: GlobeIcon },
  ];

  const rows = [
    { icon: PhoneIcon, label: "Phone", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneRaw}` },
    { icon: MailIcon, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: GlobeIcon, label: "Website", value: CONTACT.website, href: CONTACT.websiteUrl },
    { icon: PinIcon, label: "Address", value: addressLines.join(" "), href: mapsUrl },
  ];

  return (
    <div className="w-full bg-white overflow-hidden flex flex-col min-h-full">
      {/* Header */}
      <div className="relative" style={{ background: BRAND.blue }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 80% 0%, rgba(255,255,255,.5), transparent 50%), radial-gradient(circle at 0% 100%, rgba(139,199,89,.6), transparent 45%)",
          }}
        />
        <div className={`relative flex justify-center ${compact ? "pt-9 pb-14" : "pt-12 pb-16"}`}>
          <Logo variant="dark" className={compact ? "w-48" : "w-60"} />
        </div>
        <div
          className="relative h-7 flex items-center justify-end pr-5"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${BRAND.green} 45%, ${BRAND.green} 100%)`,
          }}
        >
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wide uppercase" style={{ color: BRAND.blue }}>
            Delivering Freshness. <em>Driving Trust.</em>
          </span>
        </div>
      </div>

      {/* Identity */}
      <div className="relative px-6 -mt-1">
        <div className="-mt-10 w-20 h-20 rounded-2xl bg-white shadow-lg ring-4 ring-white flex items-center justify-center">
          <GMark className="w-12 h-12" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
          {CONTACT.fullName}
        </h1>
        <p className="mt-1 text-sm font-semibold text-slate-600 flex items-start gap-1.5">
          <BriefcaseIcon className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            {CONTACT.title}
            <span className="block font-bold" style={{ color: BRAND.blue }}>
              {CONTACT.company}
            </span>
          </span>
        </p>
        <div className="mt-5 h-[3px] rounded-full" style={{ background: BRAND.green }} />
      </div>

      {/* Quick actions */}
      <div className="px-6 mt-5 grid grid-cols-4 gap-2">
        {quick.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex flex-col items-center gap-1.5"
          >
            <span
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition group-hover:scale-105 group-active:scale-95"
              style={{ background: label === "WhatsApp" ? "#25D366" : BRAND.blue }}
            >
              <Icon className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-medium text-slate-600">{label}</span>
          </a>
        ))}
      </div>

      {/* Details */}
      <div className="px-6 mt-6 space-y-2.5">
        {rows.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition"
          >
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(139,199,89,.18)", color: "#4d8a22" }}
            >
              <Icon className="w-[18px] h-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                {label}
              </span>
              <span className="block text-sm font-medium text-slate-800 break-words">{value}</span>
            </span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 mt-6 pb-6 flex gap-2">
        <button
          onClick={downloadVCard}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110 active:scale-[.98]"
          style={{ background: BRAND.blue }}
        >
          <UserPlusIcon className="w-5 h-5" /> Save Contact
        </button>
        <button
          onClick={share}
          aria-label="Share"
          className="w-14 inline-flex items-center justify-center rounded-xl border-2 transition hover:bg-slate-50"
          style={{ borderColor: BRAND.green, color: "#4d8a22" }}
        >
          {shared ? <CheckIcon className="w-5 h-5" /> : <ShareIcon className="w-5 h-5" />}
        </button>
      </div>

      <div className="mt-auto py-4 text-center text-[11px] text-slate-400 border-t border-slate-100">
        © {new Date().getFullYear()} {CONTACT.company} · India
      </div>
    </div>
  );
}
