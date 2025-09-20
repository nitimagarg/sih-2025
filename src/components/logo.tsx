import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-lg font-bold text-primary tracking-tight group-data-[collapsible=icon]:justify-center",
        className
      )}
    >
      <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
        <Briefcase
          className="shrink-0"
          size={18}
        />
      </div>
      <span className="group-data-[collapsible=icon]:hidden">SkillSage</span>
    </div>
  );
}
