-- Allow merchant to choose how many stamps to add per validation
ALTER TABLE public.stamp_requests
  ADD COLUMN IF NOT EXISTS nb_tampons integer NOT NULL DEFAULT 1;

-- Update trigger to use nb_tampons in stamp mode (and handle reward loop if multiple)
CREATE OR REPLACE FUNCTION public.handle_stamp_validation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_mode text;
  v_tampons_requis integer;
  v_points_requis integer;
  v_montant_tranche numeric(10,2);
  v_points_par_tranche integer;
  v_points_gagnes integer;
  v_nb_tampons integer;
  v_current integer;
  v_total integer;
  v_rewards integer;
  v_remainder integer;
BEGIN
  IF NEW.statut = 'valide' AND OLD.statut = 'en_attente' THEN
    SELECT loyalty_mode, tampons_requis, points_requis, montant_tranche, points_par_tranche
      INTO v_mode, v_tampons_requis, v_points_requis, v_montant_tranche, v_points_par_tranche
    FROM public.shops WHERE id = NEW.shop_id;

    IF v_mode = 'points' THEN
      IF NEW.montant_achat IS NULL OR NEW.montant_achat <= 0 OR v_montant_tranche <= 0 THEN
        v_points_gagnes := 0;
      ELSE
        v_points_gagnes := FLOOR(NEW.montant_achat / v_montant_tranche)::integer * v_points_par_tranche;
      END IF;

      UPDATE public.customers
      SET total_points = total_points + v_points_gagnes,
          derniere_visite = now()
      WHERE id = NEW.customer_id;

      UPDATE public.customers
      SET total_points = total_points - v_points_requis,
          total_recompenses = total_recompenses + 1
      WHERE id = NEW.customer_id AND total_points >= v_points_requis;
    ELSE
      v_nb_tampons := COALESCE(NEW.nb_tampons, 1);
      IF v_nb_tampons < 1 THEN v_nb_tampons := 1; END IF;

      SELECT total_tampons INTO v_current FROM public.customers WHERE id = NEW.customer_id;
      v_total := COALESCE(v_current, 0) + v_nb_tampons;

      IF v_tampons_requis > 0 THEN
        v_rewards := v_total / v_tampons_requis;
        v_remainder := v_total % v_tampons_requis;
      ELSE
        v_rewards := 0;
        v_remainder := v_total;
      END IF;

      UPDATE public.customers
      SET total_tampons = v_remainder,
          total_recompenses = total_recompenses + v_rewards,
          derniere_visite = now()
      WHERE id = NEW.customer_id;
    END IF;

    NEW.validated_at := now();
  END IF;
  RETURN NEW;
END;
$function$;

-- Recreate trigger to ensure binding
DROP TRIGGER IF EXISTS trg_handle_stamp_validation ON public.stamp_requests;
CREATE TRIGGER trg_handle_stamp_validation
BEFORE UPDATE ON public.stamp_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_stamp_validation();