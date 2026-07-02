import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MONTH_1 } from "@/content/month1";

export type ProgressRow = {
  session_slug: string;
  status: "not_started" | "in_progress" | "completed";
  progress_pct: number;
  completed_at: string | null;
  updated_at: string;
};

export function useMyProgress() {
  return useQuery({
    queryKey: ["my-progress"],
    queryFn: async (): Promise<ProgressRow[]> => {
      const { data, error } = await supabase
        .from("user_progress")
        .select("session_slug,status,progress_pct,completed_at,updated_at");
      if (error) throw error;
      return data as ProgressRow[];
    },
  });
}

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes.user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userRes.user.id)
        .maybeSingle();
      if (error) throw error;
      return { ...data, email: userRes.user.email, uid: userRes.user.id };
    },
  });
}

export function useMyRoles() {
  return useQuery({
    queryKey: ["my-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role");
      if (error) throw error;
      return (data ?? []).map((r) => r.role as "student" | "instructor" | "admin");
    },
  });
}

export async function markSessionStarted(slug: string) {
  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return;
  await supabase.from("user_progress").upsert(
    {
      user_id: userRes.user.id,
      session_slug: slug,
      status: "in_progress",
      progress_pct: 10,
    },
    { onConflict: "user_id,session_slug" }
  );
}

export async function updateSessionProgress(slug: string, pct: number) {
  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return;
  await supabase.from("user_progress").upsert(
    {
      user_id: userRes.user.id,
      session_slug: slug,
      status: pct >= 100 ? "completed" : "in_progress",
      progress_pct: Math.min(100, Math.max(0, pct)),
      completed_at: pct >= 100 ? new Date().toISOString() : null,
    },
    { onConflict: "user_id,session_slug" }
  );
}

export function summarizeMonth1(rows: ProgressRow[] | undefined) {
  const map = new Map((rows ?? []).map((r) => [r.session_slug, r]));
  const total = MONTH_1.length;
  let completed = 0;
  let inProgress = 0;
  for (const s of MONTH_1) {
    const r = map.get(s.slug);
    if (r?.status === "completed") completed++;
    else if (r?.status === "in_progress") inProgress++;
  }
  const pct = Math.round((completed / total) * 100);
  return { total, completed, inProgress, pct, map };
}
