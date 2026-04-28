import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Tamply" },
      { name: "description", content: "Comment Tamply collecte, utilise et protège vos données personnelles, conformément au RGPD." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Politique de confidentialité — Tamply" },
      { property: "og:description", content: "Notre engagement RGPD : transparence sur la collecte et le traitement des données." },
    ],
  }),
  component: ConfidentialitePage,
});

function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <LegalHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground">Politique de confidentialité</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <Section title="1. Responsable du traitement">
          <p>
            Le responsable du traitement des données personnelles collectées via Tamply est :
            <br />
            <strong>[À COMPLÉTER — raison sociale]</strong>, [À COMPLÉTER — adresse], contact :{" "}
            <strong>[À COMPLÉTER — email]</strong>.
          </p>
        </Section>

        <Section title="2. Données collectées">
          <p>Nous collectons uniquement les données strictement nécessaires au fonctionnement du service :</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li><strong>Commerçants :</strong> email, nom du commerce, mot de passe (chiffré), informations de facturation.</li>
            <li><strong>Clients finaux :</strong> identifiant anonyme stocké localement (aucune création de compte requise).</li>
            <li><strong>Données techniques :</strong> logs de connexion, adresse IP, type de navigateur (à des fins de sécurité).</li>
          </ul>
        </Section>

        <Section title="3. Finalités du traitement">
          <p>Les données sont utilisées pour :</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Fournir et opérer le service de fidélité digitale.</li>
            <li>Gérer l'authentification et la sécurité des comptes.</li>
            <li>Gérer la facturation et les abonnements.</li>
            <li>Répondre aux demandes de support.</li>
            <li>Respecter les obligations légales et comptables.</li>
          </ul>
        </Section>

        <Section title="4. Base légale">
          <p>
            Les traitements reposent sur l'<strong>exécution du contrat</strong> (art. 6.1.b RGPD), le{" "}
            <strong>consentement</strong> (art. 6.1.a RGPD) lorsque requis, et nos <strong>obligations légales</strong>{" "}
            (art. 6.1.c RGPD) en matière comptable et fiscale.
          </p>
        </Section>

        <Section title="5. Durée de conservation">
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Compte commerçant : pendant toute la durée d'utilisation du service, puis 3 ans après inactivité.</li>
            <li>Données de facturation : 10 ans (obligation légale).</li>
            <li>Logs techniques : 12 mois maximum.</li>
            <li>Données clients finaux : tant que le commerçant utilise le service.</li>
          </ul>
        </Section>

        <Section title="6. Destinataires et sous-traitants">
          <p>Vos données ne sont jamais vendues. Elles peuvent être traitées par nos sous-traitants techniques :</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li><strong>Lovable Cloud</strong> (infrastructure backend, hébergement UE)</li>
            <li><strong>[À COMPLÉTER — Stripe / autre prestataire de paiement]</strong> (paiements)</li>
            <li><strong>[À COMPLÉTER — service email transactionnel si utilisé]</strong></li>
          </ul>
        </Section>

        <Section title="7. Transferts hors UE">
          <p>
            Les données sont hébergées au sein de l'Union européenne. En cas de transfert vers un pays tiers, celui-ci
            sera encadré par les clauses contractuelles types de la Commission européenne.
          </p>
        </Section>

        <Section title="8. Vos droits (RGPD)">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Droit d'accès, de rectification et d'effacement</li>
            <li>Droit à la limitation et à l'opposition au traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit de retirer votre consentement à tout moment</li>
            <li>Droit d'introduire une réclamation auprès de la <strong>CNIL</strong> (France) ou de l'<strong>APD</strong> (Belgique)</li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits : <strong>[À COMPLÉTER — email contact]</strong>
          </p>
        </Section>

        <Section title="9. Sécurité">
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles adaptées : chiffrement des mots de passe,
            connexions HTTPS, hébergement sécurisé en UE, accès restreint aux données.
          </p>
        </Section>

        <Section title="10. Cookies">
          <p>
            Tamply utilise uniquement des cookies techniques nécessaires au fonctionnement du service (session,
            authentification). Aucun cookie publicitaire ni de mesure d'audience tierce n'est utilisé.
          </p>
        </Section>

        <Section title="11. Modifications">
          <p>
            Cette politique peut être mise à jour à tout moment. La date de dernière mise à jour figure en haut du
            document.
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