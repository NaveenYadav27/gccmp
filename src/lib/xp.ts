import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const XP_RULES = {
  mission_start: 5,
  mission_progress: 2,
  mission_complete: 50,
  quiz_perfect: 20,
  daily_mission: 40,
} as const;

export type XpReason = keyof typeof XP_RULES;

export function useMyXp() {
  return useQuery({
    queryKey: ["my-xp"],
    queryFn: async () => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes.user) return null;
      const { data } = await supabase
        .from("user_xp")
        .select("*")
        .eq("user_id", userRes.user.id)
        .maybeSingle();
      return data as {
        xp: number; level: number; streak_days: number;
        last_active: string | null; badges: string[];
      } | null;
    },
  });
}

export function useMySkillUnlocks() {
  return useQuery({
    queryKey: ["my-skills"],
    queryFn: async () => {
      const { data } = await supabase.from("skill_unlocks").select("skill_key");
      return (data ?? []).map((r) => r.skill_key as string);
    },
  });
}

function levelFor(xp: number) {
  return Math.max(1, Math.floor(Math.sqrt(xp / 25)) + 1);
}

export async function awardXp(reason: XpReason) {
  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return;
  const uid = userRes.user.id;
  const today = new Date().toISOString().slice(0, 10);
  const { data: existing } = await supabase
    .from("user_xp").select("*").eq("user_id", uid).maybeSingle();
  const delta = XP_RULES[reason];
  const prevXp = existing?.xp ?? 0;
  const newXp = prevXp + delta;
  let streak = existing?.streak_days ?? 0;
  const last = existing?.last_active as string | null | undefined;
  if (last === today) {
    // no change
  } else {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streak = last === yesterday ? streak + 1 : 1;
  }
  await supabase.from("user_xp").upsert({
    user_id: uid,
    xp: newXp,
    level: levelFor(newXp),
    streak_days: streak,
    last_active: today,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
}

export async function unlockSkill(skillKey: string) {
  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return;
  await supabase
    .from("skill_unlocks")
    .upsert({ user_id: userRes.user.id, skill_key: skillKey }, { onConflict: "user_id,skill_key" });
}
