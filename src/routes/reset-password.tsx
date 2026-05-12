import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nouveau mot de passe · Stamply Agency" },
      { name: "description", content: "Définissez un nouveau mot de passe pour votre compte Stamply Agency." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Reset,
});

function Reset() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pwd.length < 8) { toast.error("Au moins 8 caractères"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pwd });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Mot de passe mis à jour !");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-gradient-hero px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
        <h1 className="text-2xl font-extrabold">Nouveau mot de passe</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label className="mb-1.5 block text-sm font-semibold">Nouveau mot de passe</Label>
            <Input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} className="h-11 rounded-xl" required />
          </div>
          <Button type="submit" variant="cta" size="xl" disabled={loading} className="w-full">
            {loading ? "Mise à jour…" : "Mettre à jour"}
          </Button>
        </form>
      </div>
    </div>
  );
}
