import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useShop } from "@/lib/use-shop";

export function usePendingCount() {
  const { shop } = useShop();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shop) return;
    let cancelled = false;

    const load = async () => {
      const { count: c } = await supabase
        .from("stamp_requests")
        .select("*", { count: "exact", head: true })
        .eq("shop_id", shop.id)
        .eq("statut", "en_attente");
      if (!cancelled) setCount(c ?? 0);
    };
    load();

    const channel = supabase
      .channel(`pending-count-${shop.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "stamp_requests", filter: `shop_id=eq.${shop.id}` },
        () => load()
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [shop]);

  return count;
}