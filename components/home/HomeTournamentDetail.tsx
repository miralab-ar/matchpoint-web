import Link from "next/link";
import type { TournamentListItem } from "@/lib/types/tournament";
import { formatChipDate, formatRange, statusLabel } from "@/lib/format/tournament";
import {
  IconCalendar,
  IconHourglassOutline,
  IconLocation,
  IconPeopleOutline,
  IconShieldOutline,
} from "@/components/icons/MatchpointIcons";

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-mp-bg/60 px-2 py-2.5">
      <span className="text-mp-yellow">{icon}</span>
      <span className="mp-score text-2xl text-mp-text">{value}</span>
      <span className="text-[0.7rem] font-medium text-mp-text-secondary">{label}</span>
    </div>
  );
}

export function HomeTournamentDetail({
  tournament,
}: {
  tournament: TournamentListItem | null;
}) {
  if (!tournament) {
    return (
      <section
        className="flex min-h-[220px] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-mp-border bg-mp-surface/50 p-6 text-center lg:min-h-0"
        aria-live="polite"
      >
        <IconCalendar className="mb-3 h-7 w-7 text-mp-text-muted" aria-hidden />
        <p className="text-sm text-mp-text-secondary">
          Elegí un torneo en el calendario o en el listado para ver el resumen.
        </p>
      </section>
    );
  }

  const t = tournament;
  const isOpen = t.status === "open";

  return (
    <section
      key={t._id}
      className="mp-enter flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-mp-border bg-mp-surface p-5 lg:min-h-0 lg:p-4"
      aria-labelledby="home-detail-title"
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-mp-yellow px-2 py-0.5 font-display text-sm font-bold uppercase tracking-wide text-mp-bg tabular-nums">
            <IconCalendar className="h-3.5 w-3.5" aria-hidden />
            {formatChipDate(t.startDate)}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider ${
              isOpen ? "bg-emerald-500/15 text-emerald-400" : "bg-mp-surface-light text-mp-text-secondary"
            }`}
          >
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-400" : "bg-mp-text-muted"}`}
            />
            {statusLabel(t.status)}
          </span>
        </div>
        <h2
          id="home-detail-title"
          className="mt-3 line-clamp-2 text-3xl font-extrabold uppercase italic leading-[0.95] text-mp-text"
        >
          {t.name}
        </h2>
        <p className="mt-3 flex items-center gap-2 text-sm text-mp-text-secondary">
          <IconLocation className="h-4 w-4 shrink-0 text-mp-text-muted" aria-hidden />
          <span className="truncate">{t.location}</span>
        </p>
        <p className="mt-1 text-sm text-mp-text-muted">{formatRange(t.startDate, t.endDate)}</p>
        {t.description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mp-text-secondary lg:line-clamp-2">
            {t.description}
          </p>
        ) : null}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat
            icon={<IconShieldOutline className="h-4 w-4" aria-hidden />}
            label="Equipos"
            value={t.teamsCount ?? "—"}
          />
          <Stat
            icon={<IconPeopleOutline className="h-4 w-4" aria-hidden />}
            label="Jugadores"
            value={t.entriesCount ?? "—"}
          />
          <Stat
            icon={<IconHourglassOutline className="h-4 w-4" aria-hidden />}
            label="En espera"
            value={t.waitlistCount ?? 0}
          />
        </div>
      </div>
      <div className="mt-auto shrink-0 pt-4">
        <Link
          href={`/tournaments/${t._id}`}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-mp-yellow px-3 py-2 font-display text-base font-bold uppercase tracking-wide text-mp-bg transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-mp-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-mp-surface"
        >
          Ver torneo completo
        </Link>
      </div>
    </section>
  );
}
