import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useShop } from "@/lib/use-shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

function Settings() {
  const { shop, refresh } = useShop();
  const [form, setForm] = useState({ nom: "", description_recompense: "", tampons_requis: 10, couleur: "#FFD700", logo_url: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (shop) setForm({
      nom: shop.nom,
      description_recompense: shop.description_recompense,
      tampons_requis: shop.tampons_requis,
      couleur: shop.couleur,
      logo_url: shop.logo_url ?? "",
    });
  }, [shop]);

  const save = async () => {
    if (!shop) return;
    setSaving(true);
    const { error } = await supabase.from("shops").update({
      nom: form.nom.trim(),
      description_recompense: form.description_recompense.trim(),
      tampons_requis: Math.max(3, Math.min(50, form.tampons_requis)),
      couleur: form.couleur,
      logo_url: form.logo_url.trim() || null,
    }).eq("id", shop.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Paramètres enregistrés ✓");
    refresh();
  };

  if (!shop) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Paramètres</h1>
        <p className="mt-1 text-sm text-muted-foreground">Personnalisez votre programme de fidélité.</p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card space-y-4">
        <h2 className="font-bold">Établissement</h2>
        <div>
          <Label className="mb-1.5 block text-sm font-semibold">Nom</Label>
          <Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className="h-11 rounded-xl" />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-semibold">URL du logo (optionnel)</Label>
          <Input value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} placeholder="https://…" className="h-11 rounded-xl" />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-semibold">Couleur de marque</Label>
          <div className="flex items-center gap-3">
            <input type="color" value={form.couleur} onChange={(e) => setForm({ ...form, couleur: e.target.value })} className="h-11 w-16 cursor-pointer rounded-xl border border-border bg-transparent" />
            <Input value={form.couleur} onChange={(e) => setForm({ ...form, couleur: e.target.value })} className="h-11 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card space-y-4">
        <h2 className="font-bold">Programme de fidélité</h2>
        <div>
          <Label className="mb-1.5 block text-sm font-semibold">Récompense</Label>
          <Input value={form.description_recompense} onChange={(e) => setForm({ ...form, description_recompense: e.target.value })} placeholder="Ex : 1 boisson offerte, 1 dessert gratuit, -10%…" className="h-11 rounded-xl" />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-semibold">Tampons requis (3 à 50)</Label>
          <Input type="number" min={3} max={50} value={form.tampons_requis} onChange={(e) => setForm({ ...form, tampons_requis: Number(e.target.value) })} className="h-11 rounded-xl" />
        </div>
      </div>

      <Button variant="cta" size="xl" disabled={saving} onClick={save} className="w-full sm:w-auto">
        {saving ? "Enregistrement…" : "Enregistrer"}
      </Button>

      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <h2 className="font-bold">Compte</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pour changer votre email ou mot de passe, utilisez la page « Mot de passe oublié » depuis la connexion. (Bientôt directement ici.)
        </p>
      </div>
    </div>
  );
}
