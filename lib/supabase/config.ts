export type SupabasePublicConfig = {
  url: string;
  key: string;
};

/**
 * Publishable keys are preferred. The legacy anon key remains supported
 * so existing Supabase projects can be connected without a rename.
 */
export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();

  if (!url || !key) return null;
  return { url, key };
}
