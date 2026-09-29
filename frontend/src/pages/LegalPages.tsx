import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import PageHead from '../components/PageHead';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';
import Section from '../components/Section';
import GradientTitle from '../components/GradientTitle';
import { siteConfig } from '../config/site';

const LAST_UPDATE = 'Septiembre de 2026';

// Revisa estos textos con tu asesor legal antes de publicar.
const TITULAR = siteConfig.name;
const EMAIL = siteConfig.contact.email;

function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <PageHead title={`${title} · ${siteConfig.name}`} />
      <WavesBackground />
      <Navbar />

      <Section size="md" width="4xl" className="pt-28 md:pt-32">
        <GradientTitle className="text-2xl md:text-3xl mb-2">{title}</GradientTitle>
        <p className="text-xs mb-10" style={{ color: 'var(--clr-text-muted)' }}>
          Última actualización: {LAST_UPDATE}
        </p>
        <div className="space-y-8">{children}</div>
      </Section>

      <Footer />
    </div>
  );
}

function Bloque({ h, children }: { h: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-lg font-bold mb-3" style={{ color: 'var(--clr-text-heading)' }}>
        {h}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--clr-text-body)' }}>
        {children}
      </div>
    </section>
  );
}

export function AvisoLegalPage() {
  return (
    <LegalShell title="Aviso legal">
      <Bloque h="Titular del sitio">
        <p>
          El presente sitio web es gestionado por {TITULAR}, con sede en Ecuador. Para
          cualquier comunicación, puedes escribirnos a {EMAIL}.
        </p>
      </Bloque>
      <Bloque h="Objeto">
        <p>
          Este sitio ofrece información turística de la provincia de Santa Elena (Ecuador):
          experiencias, playas, alojamiento, guías y eventos. El contenido es meramente
          informativo y no constituye asesoramiento comercial, profesional ni legal.
        </p>
      </Bloque>
      <Bloque h="Propiedad intelectual">
        <p>
          Los textos, diseños, logotipos y demás contenidos del sitio son titularidad de
          {TITULAR} o de terceros con los que se ha llegado a un acuerdo. Queda prohibida
          su reproducción sin autorización expresa.
        </p>
      </Bloque>
      <Bloque h="Responsabilidad">
        <p>
          {TITULAR} no se hace responsable de los perjuicios derivados del uso de la
          información publicada ni de los enlaces a servicios externos (hoteles, guías,
          operadoras o redes sociales). Los datos de contacto de terceros se incluyen a
          título informativo; cada proveedor es responsable de su propia oferta.
        </p>
      </Bloque>
    </LegalShell>
  );
}

export function PrivacidadPage() {
  return (
    <LegalShell title="Política de privacidad">
      <Bloque h="Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales es {TITULAR}. Tratamos
          los datos conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP)
          de la República del Ecuador y normativa aplicable.
        </p>
      </Bloque>
      <Bloque h="Qué datos tratamos y para qué">
        <p>
          Este sitio es esencialmente informativo. Solo recopilamos los datos que tú nos
          facilitas voluntariamente (por ejemplo, al escribirnos por WhatsApp o por
          correo electrónico para solicitar información sobre experiencias o itinerarios),
          con la finalidad de atender tu consulta.
        </p>
        <p>
          No solicitamos datos personales sensibles ni tratamos datos de menores de forma
          deliberada.
        </p>
      </Bloque>
      <Bloque h="Base legítima">
        <p>
          La base para tratar tus datos es tu consentimiento al contactarnos y el interés
          legítimo de responder a tus solicitudes de información.
        </p>
      </Bloque>
      <Bloque h="Plazo de conservación">
        <p>
          Conservamos los datos únicamente mientras sea necesario para atenderte o
          mientras lo exija la ley.
        </p>
      </Bloque>
      <Bloque h="Tus derechos">
        <p>
          De acuerdo con la LOPDP puedes ejercer los derechos de acceso, rectificación,
          actualización, supresión y oposición escribiéndonos a {EMAIL}. También puedes
          presentar una reclamación ante la Autoridad de Protección de Datos del Ecuador.
        </p>
      </Bloque>
      <Bloque h="Transferencias y encargados">
        <p>
          No vendemos ni cedemos datos personales a terceros. Prestamos el servicio con
          proveedores de infraestructura que actúan como encargados de tratamiento
          (alojamiento web) en los términos que exige la ley.
        </p>
      </Bloque>
    </LegalShell>
  );
}

export function CookiesPage() {
  return (
    <LegalShell title="Política de cookies">
      <Bloque h="Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que se guardan en tu dispositivo al visitar
          un sitio web. Se usan para hacer funcionar el sitio y, en su caso, medir su uso.
        </p>
      </Bloque>
      <Bloque h="Cookies que utiliza este sitio">
        <p>
          <strong>Esenciales:</strong> las necesarias para que el sitio funcione, como
          recordar tu consentimiento (guardado localmente en tu navegador) o la sesión
          del panel de administración. No requieren tu consentimiento.
        </p>
        <p>
          <strong>De análisis (opcionales):</strong> si aceptas la medición de audiencia,
          se puede cargar una herramienta externa de analítica configurada por el titular
          del sitio, únicamente tras tu aceptación expresa.
        </p>
      </Bloque>
      <Bloque h="Gestión del consentimiento">
        <p>
          Puedes aceptar o rechazar las cookies no esenciales desde el aviso que se
          muestra al entrar al sitio. Si ya decidiste, puedes dejar de compartir
          información borrando el consentimiento guardado desde la configuración de tu
          navegador.
        </p>
      </Bloque>
      <Bloque h="Derechos y contacto">
        <p>
          Para cualquier consulta sobre el uso de cookies, escríbenos a {EMAIL}.
        </p>
      </Bloque>
    </LegalShell>
  );
}