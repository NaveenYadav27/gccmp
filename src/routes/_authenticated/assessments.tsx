import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { MONTH_1 } from "@/content/month1";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/assessments")({
  head: () => ({ meta: [{ title: "Assessments — Cybersec Masters" }] }),
  component: AssessmentsPage,
});

function AssessmentsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 md:px-8">
      <header>
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">Verify</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">Assessments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every mission ends with a scored assessment. Attempts are logged.
        </p>
      </header>
      <div className="glass-panel divide-y divide-border/60 rounded-2xl">
        {MONTH_1.map((s) => (
          <Link
            key={s.slug}
            to="/session/$slug"
            params={{ slug: s.slug }}
            hash="assessment"
            className="flex items-center gap-4 p-4 transition-colors hover:bg-surface-1"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-cyber">
              <ClipboardCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">
                M{String(s.number).padStart(2, "0")} · {s.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {s.assessment.length} questions · scored
              </div>
            </div>
            <Badge variant="outline" className="text-[10px]">
              Day {s.day}
            </Badge>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
