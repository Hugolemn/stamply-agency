import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Tamply" },
      { name: "description", content: "Mentions légales de Tamply : éditeur, hébergeur, propriété intellectuelle et contact." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Mentions légales — Tamply" },
      { property: "og:description", content: "Informations légales obligatoires concernant le site Tamply." },
    ],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <LegalHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground">Mentions légales</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <Section title="1. Éditeur du site">
          <p>Le site <strong>Tamply</strong> est édité par :</p>
          <ul className="mt-3 space-y-1">
            <li><strong>Raison sociale :</strong> [À COMPLÉTER — nom de l'entreprise / nom et prénom si auto-entrepreneur]</li>
            <li><strong>Forme juridique :</strong> [À COMPLÉTER — SAS, SARL, SASU, EI, auto-entrepreneur, SRL...]</li>
            <li><strong>Capital social :</strong> [À COMPLÉTER — si société, ex : 1 000 €]</li>
            <li><strong>Siège social :</strong> [À COMPLÉTER — adresse complète]</li>
            <li><strong>Numéro d'immatriculation :</strong> [À COMPLÉTER — RCS / SIRET (FR) ou BCE (BE)]</li>
            <li><strong>Numéro de TVA intracommunautaire :</strong> [À COMPLÉTER — si applicable]</li>
            <li><strong>Directeur de la publication :</strong> [À COMPLÉTER — nom et prénom]</li>
            <li><strong>Email de contact :</strong> [À COMPLÉTER — contact@tamply.app]</li>
            <li><strong>Téléphone :</strong> [À COMPLÉTER — facultatif]</li>
          </ul>
        </Section>

        <Section title="2. Hébergeur">
          <p>Le site est hébergé par :</p>
          <ul className="mt-3 space-y-1">
            <li><strong>Hébergeur principal :</strong> Lovable (Lovable AB)</li>
            <li><strong>Adresse :</strong> Sveavägen 31, 111 34 Stockholm, Suède</li>
            <li><strong>Site web :</strong> <a className="text-primary underline" href="https://lovable.dev" target="_blank" rel="noopener noreferrer">lovable.dev</a></li>
          </ul>
          <p className="mt-3">
            Les données et services backend sont hébergés au sein de l'Union européenne via l'infrastructure Lovable Cloud.
          </p>
        </Section>

        <Section title="3. Propriété intellectuelle">
          <p>
            L'ensemble du contenu présent sur le site Tamply (textes, graphismes, logo, icônes, images, code source) est
            la propriété exclusive de [À COMPLÉTER — éditeur] ou de ses partenaires, et est protégé par les lois
            françaises et internationales relatives à la propriété intellectuelle.
          </p>
          <p className="mt-3">
            Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, est
            interdite sans autorisation écrite préalable.
          </p>
        </Section>

        <Section title="4. Données personnelles">
          <p>
            Le traitement des données personnelles est détaillé dans notre{" "}
            <Link to="/confidentialite" className="text-primary underline">Politique de confidentialité</Link>.
          </p>
        </Section>

        <Section title="5. Cookies">
          <p>
            Le site utilise uniquement des cookies strictement nécessaires à son fonctionnement (session,
            authentification). Aucun cookie publicitaire ou de mesure d'audience tierce n'est déposé sans consentement.
          </p>
        </Section>

        <Section title="6. Responsabilité">
          <p>
            L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site, mais ne
            peut garantir l'exactitude, la précision ou l'exhaustivité de ces informations. L'utilisation du site se
            fait sous la responsabilité exclusive de l'utilisateur.
          </p>
        </Section>

        <Section title="7. Droit applicable">
          <p>
            Les présentes mentions légales sont régies par le droit [À COMPLÉTER — français / belge]. Tout litige relatif
            au site sera de la compétence exclusive des tribunaux de [À COMPLÉTER — ville].
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            Pour toute question : <strong>[À COMPLÉTER — contact@tamply.app]</strong>
          </p>
        </Section>
      </main>
      <LegalFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function LegalHeader() {
  return (
    <header className="border-b border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo Tamply" className="h-8 w-8 object-contain" />
          <span className="font-bold text-foreground">Tamply</span>
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
      </div>
    </header>
  );
}

function LegalFooter() {
  return (
    <footer className="mt-12 border-t border-border/60 bg-background py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} Tamply</span>
        <div className="flex gap-6">
          <Link to="/mentions-legales" className="hover:text-foreground">Mentions légales</Link>
          <Link to="/confidentialite" className="hover:text-foreground">Confidentialité</Link>
          <Link to="/cgv" className="hover:text-foreground">CGV</Link>
        </div>
      </div>
    </footer>
  );
}