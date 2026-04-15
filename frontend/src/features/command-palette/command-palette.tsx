import { useEffect, useMemo, useState } from "react";
import { Command, ExternalLink, LockOpen, Router } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/features/session/session-context";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { session, toggleAuthBypass } = useSession();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const actions = useMemo(
    () => [
      {
        id: "auth",
        label: session?.isAuthenticated
          ? "Disable auth bypass"
          : "Enable auth bypass",
        hint: "Local-only stub auth",
        icon: LockOpen,
        action: async () => {
          await toggleAuthBypass(!session?.isAuthenticated);
          onClose();
        },
      },
      {
        id: "home",
        label: "Go to homepage",
        hint: "Route: /",
        icon: Router,
        action: async () => {
          navigate("/");
          onClose();
        },
      },
      {
        id: "apex",
        label: "Open Apex game page",
        hint: "Route: /games/apex-legends",
        icon: Router,
        action: async () => {
          navigate("/games/apex-legends");
          onClose();
        },
      },
      {
        id: "profile",
        label: "Open flagship profile",
        hint: "Route: /profiles/pro-movement-config",
        icon: Router,
        action: async () => {
          navigate("/profiles/pro-movement-config");
          onClose();
        },
      },
      {
        id: "todo-admin",
        label: "Open admin publish flow",
        hint: "TODO placeholder for future admin tooling",
        icon: ExternalLink,
        action: async () => {
          onClose();
        },
      },
    ],
    [navigate, onClose, session?.isAuthenticated, toggleAuthBypass],
  );

  const filteredActions = actions.filter((action) =>
    `${action.label} ${action.hint}`.toLowerCase().includes(query.toLowerCase()),
  );

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-card/95 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
          <Command className="h-4 w-4 text-primary" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search routes, debug actions, and TODO stubs"
            className="border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
          <Button variant="ghost" size="sm" onClick={onClose}>
            Esc
          </Button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {filteredActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted/60"
                onClick={() => void action.action()}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-border/60 bg-background/60 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm text-muted-foreground">{action.hint}</div>
                  </div>
                </div>
              </button>
            );
          })}
          {filteredActions.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No local command matched. TODO: wire real global search.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
