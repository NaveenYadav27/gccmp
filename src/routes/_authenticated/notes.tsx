import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StickyNote, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MONTH_1 } from "@/content/month1";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/notes")({
  head: () => ({ meta: [{ title: "Notes — Cybersec Masters" }] }),
  component: NotesPage,
});

function NotesPage() {
  const [active, setActive] = useState(MONTH_1[0].slug);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("session_notes")
        .select("content")
        .eq("session_slug", active)
        .maybeSingle();
      setContent(data?.content ?? "");
    })();
  }, [active]);

  async function save() {
    setSaving(true);
    const { data: userRes } = await supabase.auth.getUser();
    if (userRes.user) {
      await supabase
        .from("session_notes")
        .upsert(
          { user_id: userRes.user.id, session_slug: active, content },
          { onConflict: "user_id,session_slug" },
        );
      toast.success("Notes saved");
    }
    setSaving(false);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[240px_1fr] md:px-8">
      <aside className="glass-panel h-fit rounded-2xl p-3">
        <div className="mb-2 flex items-center gap-2 px-2 py-1">
          <StickyNote className="h-4 w-4 text-cyber" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Missions
          </span>
        </div>
        <div className="space-y-0.5">
          {MONTH_1.map((s) => (
            <button
              key={s.slug}
              onClick={() => setActive(s.slug)}
              className={`w-full rounded-md px-2 py-2 text-left text-sm transition-colors ${active === s.slug ? "bg-cyber/15 text-cyber" : "hover:bg-surface-2"}`}
            >
              <span className="mr-2 font-mono text-[10px] text-muted-foreground">
                M{String(s.number).padStart(2, "0")}
              </span>
              {s.title}
            </button>
          ))}
        </div>
      </aside>

      <div className="glass-panel rounded-2xl p-5">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-bold">
            Notes · {MONTH_1.find((s) => s.slug === active)?.title}
          </h1>
          <Button onClick={save} disabled={saving} size="sm">
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Highlights, commands, questions to bring to the mentor…"
          className="min-h-[420px] resize-none bg-surface-1 font-mono text-sm"
        />
      </div>
    </div>
  );
}
