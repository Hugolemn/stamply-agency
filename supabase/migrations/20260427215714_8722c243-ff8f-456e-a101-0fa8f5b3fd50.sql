-- Restreindre l'exécution de la fonction trigger
REVOKE EXECUTE ON FUNCTION public.handle_stamp_validation() FROM PUBLIC, anon, authenticated;

-- Remplacer les policies INSERT trop permissives
DROP POLICY IF EXISTS "public_insert_customer" ON public.customers;
CREATE POLICY "public_insert_customer" ON public.customers
  FOR INSERT TO anon
  WITH CHECK (
    length(trim(numero_telephone)) BETWEEN 6 AND 20
    AND EXISTS (SELECT 1 FROM public.shops s WHERE s.id = shop_id)
    AND total_tampons = 0
    AND total_recompenses = 0
  );

DROP POLICY IF EXISTS "public_insert_request" ON public.stamp_requests;
CREATE POLICY "public_insert_request" ON public.stamp_requests
  FOR INSERT TO anon
  WITH CHECK (
    length(trim(numero_telephone)) BETWEEN 6 AND 20
    AND statut = 'en_attente'
    AND EXISTS (SELECT 1 FROM public.shops s WHERE s.id = shop_id)
    AND EXISTS (SELECT 1 FROM public.customers c WHERE c.id = customer_id AND c.shop_id = stamp_requests.shop_id)
  );