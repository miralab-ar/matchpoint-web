"use client";

import Link from "next/link";
import type { TournamentListItem } from "@/lib/types/tournament";
import { IconChevronForward } from "@/components/icons/MatchpointIcons";
import { formatChipDate } from "@/lib/format/tournament";

export function TournamentPickCard({
  t,
  selected,
  onSelect,
}: {
  t: TournamentListItem;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <article
      className={`group flex min-h-0 items-center gap-2 rounded-xl border bg-mp-surface py-1.5 pl-3 pr-1.5 transition-colors ${
        selected ? "border-mp-yellow" : "border-mp-border hover:border-mp-text-muted"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(t._id)}
        aria-pressed={selected}
        className="flex min-h-11 min-w-0 flex-1 items-center gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-mp-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-mp-surface"
      >
        <span
          className={`mp-score w-12 shrink-0 text-center text-sm uppercase ${
            selected ? "text-mp-yellow" : "text-mp-text-secondary"
          }`}
        >
          {formatChipDate(t.startDate)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-mp-text">{t.name}</span>
          <span className="block truncate text-xs text-mp-text-muted">{t.location}</span>
        </span>
      </button>
      <Link
        href={`/tournaments/${t._id}`}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-mp-text-secondary transition-colors hover:bg-mp-surface-light hover:text-mp-yellow focus-visible:outline focus-visible:ring-2 focus-visible:ring-mp-yellow"
        aria-label={`Abrir ${t.name}`}
        title="Abrir ficha"
        onClick={(e) => e.stopPropagation()}
      >
        <IconChevronForward className="h-5 w-5" aria-hidden />
      </Link>
    </article>
  );
}
