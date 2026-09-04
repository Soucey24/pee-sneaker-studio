import { ArrowLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export function BackButton({ homeOnly = false }: { homeOnly?: boolean }) {
  const router = useRouter();

  const goBack = () => {
    if (homeOnly) {
      router.navigate({ to: "/" });
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back"
      title="Go back"
      className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <ArrowLeft className="size-4" />
    </button>
  );
}
