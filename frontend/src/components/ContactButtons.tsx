// ============================================================
// BOTONES DE CONTACTO CONFIGURABLES
// ============================================================
// Renderiza botones de WhatsApp / email / teléfono / web según
// la `contact` de cada hotel, guía u operadora.
// Si un canal está vacío, usa el contacto general del sitio
// (configurado en src/config/site.ts).

import type { CSSProperties } from 'react';
import Icon, { type IconName } from './Icon';
import type { ContactInfo } from '../config/site';
import { siteConfig, waLink, mailtoLink, telLink } from '../config/site';

type Channel = 'whatsapp' | 'email' | 'phone' | 'website';

interface ContactButtonsProps {
  contact: ContactInfo;
  whatsappLabel?: string;
  channels?: Channel[];
  size?: 'sm' | 'md';
  align?: 'left' | 'center';
}

export default function ContactButtons({
  contact,
  whatsappLabel = 'Contactar',
  channels = ['whatsapp', 'email', 'phone', 'website'],
  size = 'md',
  align = 'left',
}: ContactButtonsProps) {
  const wa = waLink(contact.whatsapp ?? siteConfig.contact.whatsapp);
  const mail = mailtoLink(contact.email ?? siteConfig.contact.email);
  const tel = telLink(contact.phone ?? siteConfig.contact.phone);
  const web = contact.website;

  const pad = size === 'sm' ? 'px-3 py-1.5 text-[11px]' : 'px-4 py-2 text-sm';
  const icon = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  const items: { key: Channel; href: string | null; label: string; style: CSSProperties; icon: IconName }[] = [
    {
      key: 'whatsapp',
      href: wa,
      label: whatsappLabel,
      style: {
        background: 'linear-gradient(180deg, #25D366 0%, #128C7E 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 12px rgba(37,211,102,0.35)',
      },
      icon: 'whatsapp',
    },
    {
      key: 'email',
      href: mail,
      label: 'Email',
      style: {
        background: 'linear-gradient(180deg, var(--clr-primary), var(--clr-primary-dark))',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 12px var(--clr-glow)',
      },
      icon: 'mail',
    },
    {
      key: 'phone',
      href: tel,
      label: 'Llamar',
      style: {
        background: 'linear-gradient(180deg, var(--clr-accent), var(--clr-accent-light))',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 12px color-mix(in srgb, var(--clr-accent) 35%, transparent)',
      },
      icon: 'phone',
    },
    {
      key: 'website',
      href: web ?? null,
      label: 'Web',
      style: {
        background: 'linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
        border: '1px solid color-mix(in srgb, var(--clr-primary) 30%, transparent)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
      },
      icon: 'web',
    },
  ];

  const visible = items.filter((i) => i.href && channels.includes(i.key));

  if (visible.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
      {visible.map((item) => (
        <a
          key={item.key}
          href={item.href!}
          target={item.key === 'website' ? '_blank' : undefined}
          rel={item.key === 'website' ? 'noreferrer' : undefined}
          className={`inline-flex items-center gap-1.5 font-semibold text-white transition-all duration-200 ${pad}`}
          style={item.style}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Icon name={item.icon} className={icon} />
          {item.label}
        </a>
      ))}
    </div>
  );
}
