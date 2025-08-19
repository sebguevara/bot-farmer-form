import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ThumbsUp, MessageSquarePlus, Heart } from "lucide-react";
import { ActionKind } from "./form";

export const NavList = ({
  active,
  onChange,
  disabled = false,
}: {
  active: ActionKind;
  onChange: (k: ActionKind) => void;
  disabled?: boolean;
}) => {
  const items: { key: ActionKind; icon: React.ReactNode; label: string }[] = [
    { key: "like-post", icon: <ThumbsUp className="h-4 w-4" />, label: "Dar like (post)" },
    { key: "comment-post", icon: <MessageSquarePlus className="h-4 w-4" />, label: "Crear comentario" },
    { key: "like-comment", icon: <Heart className="h-4 w-4" />, label: "Like a comentario" },
  ];

  return (
    <div className="flex flex-col gap-1 shadow-xl">
      {items.map((it) => {
        const isActive = active === it.key;
        return (
          <Button
            key={it.key}
            variant={isActive ? "secondary" : "ghost"}
            className={cn("justify-start", isActive && "font-medium")}
            onClick={() => !disabled && onChange(it.key)} // ⛔ bloquea click si está cargando
            disabled={disabled} // visual + accesibilidad
          >
            <span className="mr-2">{it.icon}</span>
            {it.label}
          </Button>
        );
      })}
    </div>
  );
};
