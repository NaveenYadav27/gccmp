import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/foundation")({
  component: FoundationLayout,
});

function FoundationLayout() {
  return <Outlet />;
}
