import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useShop } from "@/lib/use-shop";
import { Users, CheckCircle2, Gift, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  const { shop, loading } = useShop();
  const [stats, setStats] = useState({ clients: 0, tamponsAujourdhui: 0, recompensesMois: 0, pending: 0 });

  useEffect(() => {
    if (!shop) return;
    (async () => {
      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
      const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);

      const [{ count: clients }, { count: tamponsAujourdhui }, { count: pending }, { data: customersMois }] = await Promise.all([
        supabase.from("customers").select("*", { count: "exact", head: true }).eq("shop_id", shop.id),
        supabase.from("stamp_requests").select("*", { count: "exact", head: true }).eq("shop_id", shop.id).eq("statut", "valide").gte("validated_at", todayStart.toISOString()),
        supabase.from("stamp_requests").select("*", { count: "exact", head: true }).eq("shop_id", shop.id).eq("statut", "en_attente"),
        supabase.from("customers").select("total_recompenses").eq("shop_id", shop.id),
      ]);
      const recompensesMois = (customersMois ?? []).reduce((s, c) => s + (c.total_recompenses ?? 0), 0);
      setStats({
        clients: clients ?? 0,
        tamponsAujourdhui: tamponsAujourdhui ?? 0,
        recompensesMois,
        pending: pending ?? 0,
      });
    })();
  }, [shop]);

  if (loading) return <div className="text-muted-foreground">Chargement…</div>;
  if (!shop) return <div className="text-muted-foreground">Aucun établissement.</div>;

  const trialDays = Math.max(0, Math.ceil((new Date(shop.trial_end).getTime() - Date.now()) / 86400000));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold md:text-3xl">Bonjour {shop.owner_nom?.split(" ")[0] ?? ""} 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">{shop.nom}</p>
      </div>

      {shop.statut_abonnement === "essai" && (
        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-4 shadow-card">
          <div className="text-sm">
            <b>Essai gratuit</b> — encore <b>{trialDays} jours</b>.
          </div>
          <Link to="/dashboard/subscription" className="text-sm font-semibold text-secondary hover:underline">Activer l'abonnement →</Link>
        </div>
      )}

      {stats.pending > 0 && (
        <Link to="/dashboard/validation" className="block rounded-2xl bg-secondary p-5 text-secondary-foreground shadow-soft transition hover:brightness-105">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-90">À valider maintenant</div>
              <div className="mt-1 text-2xl font-extrabold">{stats.pending} demande{stats.pending > 1 ? "s" : ""} en attente</div>
            </div>
            <ArrowRight className="h-6 w-6" />
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Users} label="Clients" value={stats.clients} />
        <StatCard icon={CheckCircle2} label="Tampons aujourd'hui" value={stats.tamponsAujourdhui} />
        <StatCard icon={Gift} label="Récompenses ce mois" value={stats.recompensesMois} />
        <StatCard icon={Calendar} label="Inscrit le" value={new Date(shop.created_at).toLocaleDateString("fr-FR")} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/20">
        <Icon className="h-4 w-4 text-foreground" />
      </div>
      <div className="mt-3 text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
