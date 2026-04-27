import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useShop } from "@/lib/use-shop";
import { Button } from "@/components/ui/button";
import { Check, X, Inbox } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/validation")({
  component: Validation,
});

interface PendingReq {
  id: string;
  numero_telephone: string;
  created_at: string;
  customer_id: string;
}

function Validation() {
  const { shop } = useShop();
  const [requests, setRequests] = useState<PendingReq[]>([]);
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const audioCtxRef = useRef<AudioContext | null>(null);
  const knownIds = useRef<Set<string>>(new Set());

  // Sound on new request
  const beep = () => {
    try {
      if (typeof window === "undefined") return;
      audioCtxRef.current ||= new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current!;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = "sine"; o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.4);
    } catch {}
  };

  useEffect(() => {
    if (!shop) return;
    let cancelled = false;
    const load = async () => {
      const { data } = await supabase
        .from("stamp_requests")
        .select("id, numero_telephone, created_at, customer_id")
        .eq("shop_id", shop.id)
        .eq("statut", "en_attente")
        .order("created_at", { ascending: true });
      if (cancelled) return;
      const list = (data ?? []) as PendingReq[];
      knownIds.current = new Set(list.map((r) => r.id));
      setRequests(list);
    };
    load();

    const channel = supabase
      .channel(`pending-${shop.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "stamp_requests", filter: `shop_id=eq.${shop.id}` },
        (payload) => {
          const row = (payload.new ?? payload.old) as any;
          if (!row) return;
          if (payload.eventType === "INSERT" && row.statut === "en_attente") {
            if (!knownIds.current.has(row.id)) {
              knownIds.current.add(row.id);
              setRequests((r) => [...r, row]);
              beep();
            }
          } else {
            // UPDATE/DELETE: re-filter pending list
            setRequests((r) => r.filter((x) => x.id !== row.id || (payload.eventType === "UPDATE" && row.statut === "en_attente")));
          }
        }
      )
      .subscribe();

    return () => { cancelled = true; supabase.removeChannel(channel); };
  }, [shop]);

  const decide = async (id: string, statut: "valide" | "refuse") => {
    setBusy((b) => ({ ...b, [id]: true }));
    const { error } = await supabase.from("stamp_requests").update({ statut }).eq("id", id);
    setBusy((b) => ({ ...b, [id]: false }));
    if (error) { toast.error(error.message); return; }
    setRequests((r) => r.filter((x) => x.id !== id));
    toast.success(statut === "valide" ? "Tampon validé ✓" : "Demande refusée");
  };

  if (!shop) return null;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold">Tampons à valider</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mises à jour en temps réel · Notification sonore à chaque demande
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center">
          <Inbox className="mx-auto h-10 w-10 text-muted-foreground" />
          <div className="mt-3 font-semibold">Aucune demande en attente</div>
          <p className="mt-1 text-sm text-muted-foreground">Les demandes apparaissent ici dès qu'un client scanne le QR.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Client</div>
                  <div className="mt-0.5 text-2xl font-extrabold tracking-tight">{r.numero_telephone}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Demande à {new Date(r.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="refuse" size="huge"
                  disabled={busy[r.id]}
                  onClick={() => decide(r.id, "refuse")}
                >
                  <X className="!size-7" /> Refuser
                </Button>
                <Button
                  variant="validate" size="huge"
                  disabled={busy[r.id]}
                  onClick={() => decide(r.id, "valide")}
                >
                  <Check className="!size-7" /> Valider
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
