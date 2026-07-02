import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shield, Lock, Activity, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Cybersec Masters" },
      { name: "description", content: "Enter the Cybersec Masters Learning OS." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Access granted");
      navigate({ to: "/dashboard", replace: true });
    }
  }

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName || email.split("@")[0] },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Cohort seat provisioned");
      navigate({ to: "/dashboard", replace: true });
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyber/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-5xl gap-12 md:grid-cols-2 md:items-center">
          {/* Left: brand */}
          <div className="hidden flex-col gap-8 md:flex">
            <div className="flex items-center gap-3">
              <div className="cyber-gradient flex h-11 w-11 items-center justify-center rounded-xl shadow-glow">
                <Shield className="h-6 w-6 text-cyber-foreground" />
              </div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Cybersec Masters
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              The Enterprise <span className="cyber-text">Cybersecurity</span> Learning Operating System.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              120 days. Four missions. Zero fluff. Enter your cohort console to begin
              Month 1 — Fundamentals.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: Lock, label: "Missions" },
                { icon: Activity, label: "Guided Labs" },
                { icon: Eye, label: "AI Mentor" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="glass-panel rounded-xl p-4">
                  <Icon className="mb-2 h-5 w-5 text-cyber" />
                  <div className="text-xs font-medium text-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="glass-panel rounded-2xl p-8 shadow-panel">
            <div className="mb-6 md:hidden">
              <div className="flex items-center gap-3">
                <div className="cyber-gradient flex h-10 w-10 items-center justify-center rounded-lg">
                  <Shield className="h-5 w-5 text-cyber-foreground" />
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Cybersec Masters
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight">Enter the console</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to continue your mission — or provision a new seat.
            </p>

            <Tabs defaultValue="signin" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 bg-surface-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-6">
                <form onSubmit={signIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="si-email">Email</Label>
                    <Input id="si-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="analyst@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="si-pw">Password</Label>
                    <Input id="si-pw" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Authenticating…" : "Enter console"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <form onSubmit={signUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="su-name">Display name</Label>
                    <Input id="su-name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Alex Chen" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-email">Email</Label>
                    <Input id="su-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-pw">Password</Label>
                    <Input id="su-pw" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Provisioning…" : "Provision seat"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing you accept the cohort code of conduct.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
