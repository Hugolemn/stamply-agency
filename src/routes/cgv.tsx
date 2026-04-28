import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions Générales de Vente — Tamply" },
      { name: "description", content: "Conditions générales de vente et d'utilisation du service Tamply." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "CGV — Tamply" },
      { property: "og:description", content: "Les conditions encadrant l'usage du service Tamply." },
    ],
  }),
  component: CgvPage,
});

function CgvPage() {
  return (
    <div className="min-h-screen bg-background">
      <LegalHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground">Conditions Générales de Vente et d'Utilisation</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <Section title="1. Objet">
          <p>
            Les présentes Conditions Générales de Vente et d'Utilisation (ci-après « CGV ») régissent l'accès et
            l'utilisation du service <strong>Tamply</strong>, plateforme de fidélité digitale destinée aux
            professionnels de l'Horeca.
          </p>
        </Section>

        <Section title="2. Éditeur du service">
          <p>
            Le service est édité par <strong>[À COMPLÉTER — raison sociale]</strong>, dont les coordonnées complètes
            figurent dans les <Link to="/mentions-legales" className="text-primary underline">mentions légales</Link>.
          </p>
        </Section>

        <Section title="3. Description du service">
          <p>
            Tamply permet aux commerçants de remplacer leurs cartes de fidélité papier par une solution digitale
            accessible via un lien unique, sans installation d'application par le client final. Le service inclut :
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Création de cartes de fidélité personnalisables</li>
            <li>Validation des tampons via QR code ou code à 4 chiffres</li>
            <li>Tableau de bord et suivi des clients</li>
            <li>Assistant IA pour les questions fréquentes</li>
          </ul>
        </Section>

        <Section title="4. Inscription et compte">
          <p>
            L'utilisation du service nécessite la création d'un compte commerçant. L'utilisateur s'engage à fournir des
            informations exactes et à les maintenir à jour. Il est responsable de la confidentialité de ses identifiants.
          </p>
        </Section>

        <Section title="5. Tarifs et abonnement">
          <p>
            Les tarifs en vigueur sont affichés sur la page d'accueil et dans l'espace abonnement. Ils sont indiqués en
            euros, [À COMPLÉTER — TTC / HT selon régime].
          </p>
          <p className="mt-3">
            <strong>Modes de paiement acceptés :</strong> [À COMPLÉTER — carte bancaire via Stripe, prélèvement SEPA…]
          </p>
          <p className="mt-3">
            L'abonnement est renouvelé automatiquement à échéance, sauf résiliation par l'utilisateur depuis son espace
            personnel.
          </p>
        </Section>

        <Section title="6. Droit de rétractation">
          <p>
            Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux
            contrats conclus entre professionnels. Pour les utilisateurs ayant la qualité de consommateur, un délai de
            14 jours s'applique à compter de la souscription, sauf renoncement exprès en cas d'exécution immédiate du
            service.
          </p>
        </Section>

        <Section title="7. Résiliation">
          <p>
            L'utilisateur peut résilier son abonnement à tout moment depuis son espace personnel. La résiliation prend
            effet à la fin de la période en cours, sans remboursement au prorata, sauf disposition contraire mentionnée
            sur l'offre souscrite.
          </p>
          <p className="mt-3">
            L'éditeur se réserve le droit de suspendre ou résilier un compte en cas de manquement aux présentes CGV,
            après mise en demeure restée sans effet.
          </p>
        </Section>

        <Section title="8. Obligations de l'utilisateur">
          <p>L'utilisateur s'engage à :</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Utiliser le service conformément à sa destination et à la législation en vigueur</li>
            <li>Ne pas porter atteinte au service ou à son intégrité technique</li>
            <li>Respecter les droits des tiers, notamment en matière de données personnelles de ses clients</li>
            <li>Informer ses clients finaux du traitement de leurs données via Tamply</li>
          </ul>
        </Section>

        <Section title="9. Disponibilité du service">
          <p>
            L'éditeur s'efforce d'assurer une disponibilité continue du service mais ne peut garantir un accès
            ininterrompu. Des opérations de maintenance pourront être réalisées, dans la mesure du possible en dehors
            des heures d'ouverture habituelles.
          </p>
        </Section>

        <Section title="10. Responsabilité">
          <p>
            La responsabilité de l'éditeur est limitée au montant des sommes effectivement versées par l'utilisateur au
            cours des 12 derniers mois. L'éditeur ne saurait être tenu responsable des dommages indirects (perte de
            chiffre d'affaires, perte de clientèle, etc.).
          </p>
        </Section>

        <Section title="11. Propriété intellectuelle">
          <p>
            L'utilisateur reste propriétaire de ses contenus (nom du commerce, logo, données clients). Il accorde à
            l'éditeur une licence non exclusive d'usage uniquement aux fins de fourniture du service.
          </p>
          <p className="mt-3">
            La marque Tamply, son logo et l'ensemble du code source restent la propriété exclusive de l'éditeur.
          </p>
        </Section>

        <Section title="12. Données personnelles">
          <p>
            Le traitement des données personnelles est détaillé dans la{" "}
            <Link to="/confidentialite" className="text-primary underline">politique de confidentialité</Link>.
          </p>
        </Section>

        <Section title="13. Modification des CGV">
          <p>
            L'éditeur se réserve le droit de modifier les présentes CGV à tout moment. Les utilisateurs seront informés
            par email au moins 30 jours avant l'entrée en vigueur des modifications substantielles.
          </p>
        </Section>

        <Section title="14. Droit applicable et litiges">
          <p>
            Les présentes CGV sont soumises au droit [À COMPLÉTER — français / belge]. En cas de litige, et après
            tentative de résolution amiable, les tribunaux de [À COMPLÉTER — ville] seront seuls compétents.
          </p>
          <p className="mt-3">
            Conformément à l'article L612-1 du Code de la consommation, le consommateur peut recourir gratuitement à un
            médiateur de la consommation : <strong>[À COMPLÉTER — nom et coordonnées du médiateur]</strong>.
          </p>
        </Section>

        <Section title="15. Contact">
          <p>
            Pour toute question relative aux présentes CGV : <strong>[À COMPLÉTER — contact@tamply.app]</strong>
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