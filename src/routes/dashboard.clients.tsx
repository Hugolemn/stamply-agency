import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useShop } from "@/lib/use-shop";

export const Route = createFileRoute("/dashboard/clients")({
  component: Clients,
});

interface Customer {
  id: string; numero_telephone: string; total_tampons: number;
  total_recompenses: number; derniere_visite: string | null; created_at: string;
}

function Clients() {
  const { shop } = useShop();
  const [list, setList] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shop) return;
    (async () => {
      const { data } = await supabase.from("customers").select("*").eq("shop_id", shop.id).order("derniere_visite", { ascending: false, nullsFirst: false });
      setList((data ?? []) as Customer[]);
      setLoading(false);
    })();
  }, [shop]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold">Vos clients</h1>
        <p className="mt-1 text-sm text-muted-foreground">{list.length} client{list.length > 1 ? "s" : ""}</p>
      </div>
      {loading ? (
        <div className="text-muted-foreground">Chargement…</div>
      ) : list.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          Aucun client pour l'instant.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Numéro</th>
                <th className="px-4 py-3 text-center">Tampons</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">Récompenses</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">Dernière visite</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-t border-border/60">
                  <td className="px-4 py-3 font-semibold">{c.numero_telephone}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded-full bg-primary/30 px-2.5 py-1 font-bold">{c.total_tampons}</span>
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className="text-secondary font-bold">🎁 {c.total_recompenses}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">
                    {c.derniere_visite ? new Date(c.derniere_visite).toLocaleDateString("fr-FR") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
