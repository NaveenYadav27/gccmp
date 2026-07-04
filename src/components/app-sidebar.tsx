import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Radar,
  Map,
  BookOpen,
  Terminal,
  Library,
  StickyNote,
  Award,
  User,
  Users,
  ClipboardCheck,
  Shield,
  LogOut,
  Building2,
  Network,
  AlertTriangle,
  Zap,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FOUNDATION_TOPICS } from "@/content/foundation";
import { CEHV13_MODULES } from "@/content/cehv13";

const MISSION_CONTROL = [
  { title: "Mission Control", to: "/dashboard", icon: Radar },
  { title: "Program Roadmap", to: "/roadmap", icon: Map },
  { title: "Daily Mission", to: "/daily", icon: AlertTriangle },
];

const CYBER_RANGE = [
  { title: "Virtual Labs", to: "/labs", icon: Terminal },
  { title: "Assessments", to: "/assessments", icon: ClipboardCheck },
  { title: "Month 1 · Fundamentals", to: "/month/1", icon: BookOpen },
];

const ENTERPRISE = [
  { title: "Digital Twin", to: "/enterprise", icon: Building2 },
  { title: "Knowledge Graph", to: "/graph", icon: Network },
  { title: "Resources", to: "/resources", icon: Library },
  { title: "Notes", to: "/notes", icon: StickyNote },
];

const CAREER = [
  { title: "Skill Tree", to: "/skills", icon: Zap },
  { title: "Career Ladder", to: "/career", icon: Briefcase },
  { title: "Certificates", to: "/certificates", icon: Award },
  { title: "Profile", to: "/profile", icon: User },
];

const STAFF = [{ title: "Instructor Portal", to: "/instructor", icon: Users }];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Session terminated");
    navigate({ to: "/auth", replace: true });
  }

  const foundationOpen = pathname.startsWith("/foundation");
  const cehOpen = pathname.startsWith("/cehv13");

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/70">
      <SidebarHeader className="border-b border-sidebar-border/60 py-4">
        <div className="flex items-center gap-3 px-2">
          <div className="cyber-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-glow">
            <Shield className="h-4.5 w-4.5 text-cyber-foreground" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-bold tracking-tight text-sidebar-foreground">
                CyberOS Enterprise
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Learning OS · v1
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-1">
        <SidebarGroup>
          <SidebarGroupLabel>Mission Control</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MISSION_CONTROL.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.title}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Foundation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen={foundationOpen} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isActive("/foundation")} tooltip="Foundation">
                      <BookOpen />
                      <span>Foundation · 12 topics</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/foundation"}>
                          <Link to="/foundation">All topics</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {FOUNDATION_TOPICS.map((t) => (
                        <SidebarMenuSubItem key={t.slug}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === `/foundation/${t.slug}`}
                          >
                            <Link to="/foundation/$topic" params={{ topic: t.slug }}>
                              <span className="font-mono text-[10px] text-cyber">
                                F{String(t.number).padStart(2, "0")}
                              </span>
                              <span className="truncate">{t.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>CEHv13</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen={cehOpen} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isActive("/cehv13")} tooltip="CEHv13">
                      <GraduationCap />
                      <span>CEHv13 · 20 modules</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/cehv13"}>
                          <Link to="/cehv13">All modules</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {CEHV13_MODULES.map((m) => (
                        <SidebarMenuSubItem key={m.slug}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === `/cehv13/${m.slug}`}
                          >
                            <Link to="/cehv13/$module" params={{ module: m.slug }}>
                              <span className="font-mono text-[10px] text-cyber">
                                {String(m.number).padStart(2, "0")}
                              </span>
                              <span className="truncate">{m.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Cyber Range</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CYBER_RANGE.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.title}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Enterprise</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ENTERPRISE.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.title}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Career</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CAREER.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.title}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Staff</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {STAFF.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.title}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signOut} tooltip="Sign out">
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
