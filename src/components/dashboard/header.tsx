import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <div className="flex items-center gap-4">
      <SidebarTrigger className="md:hidden" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome to Your Career Dashboard
        </h1>
        <p className="text-muted-foreground">
          Your personalized skilling assistant for a future-ready career.
        </p>
      </div>
    </div>
  );
}
