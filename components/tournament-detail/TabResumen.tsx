import type { TournamentDetail } from "@/lib/types/tournament";
import type { WaitlistByDivision } from "@/lib/types/waitlist";
import { WaitlistDetailSection } from "@/components/tournament-detail/WaitlistDetailSection";
import { categoryLabel } from "@/lib/format/category";
import { divisionLabel } from "@/lib/format/division";
import { phaseLabel, statusLabel } from "@/lib/format/tournament";

type TabResumenProps = {
  tournament: TournamentDetail;
  waitlistByDivision: WaitlistByDivision;
  /** Conteos reales de la página (la API de detalle puede mandar 0 en teamsCount/entriesCount). */
  teamsTotal?: number;
  entriesTotal?: number;
};

export function TabResumen({
  tournament: t,
  waitlistByDivision,
  teamsTotal,
  entriesTotal,
}: TabResumenProps) {
  const snap = t.categoriesSnapshot;

  const stats: { label: string; value: string | number }[] = [
    { label: "Equipos", value: Math.max(t.teamsCount ?? 0, teamsTotal ?? 0) },
    { label: "Jugadores", value: Math.max(t.entriesCount ?? 0, entriesTotal ?? 0) },
    { label: "En espera", value: t.waitlistCount ?? 0 },
    { label: "Cupo", value: t.maxTeams },
  ];

  return (
    <div className="space-y-6">
      {t.description ? (
        <p className="text-sm leading-relaxed text-mp-text-secondary">{t.description}</p>
      ) : null}
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-mp-bg/60 px-3 py-3 text-center">
            <dd className="mp-score text-3xl text-mp-text">{s.value}</dd>
            <dt className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wider text-mp-text-muted">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
      <dl className="grid gap-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-mp-border pb-2">
          <dt className="text-mp-text-muted">Estado</dt>
          <dd className="font-medium text-mp-text">{statusLabel(t.status)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-mp-border pb-2">
          <dt className="text-mp-text-muted">Fase</dt>
          <dd className="font-medium text-mp-text">{phaseLabel(t.phase)}</dd>
        </div>
        {t.waitlistCountByDivision ? (
          <div className="flex justify-between gap-4 border-b border-mp-border pb-2">
            <dt className="text-mp-text-muted">Espera por división</dt>
            <dd className="text-right font-medium text-mp-text tabular-nums">
              {divisionLabel("men")} {t.waitlistCountByDivision.men ?? 0} ·{" "}
              {divisionLabel("women")} {t.waitlistCountByDivision.women ?? 0} ·{" "}
              {divisionLabel("mixed")} {t.waitlistCountByDivision.mixed ?? 0}
            </dd>
          </div>
        ) : null}
        {(t.pointsToWin != null || t.setsPerMatch != null) && (
          <div className="flex justify-between gap-4 pb-2">
            <dt className="text-mp-text-muted">Reglas</dt>
            <dd className="text-right font-medium text-mp-text">
              {t.pointsToWin != null ? `${t.pointsToWin} pts por set` : ""}
              {t.pointsToWin != null && t.setsPerMatch != null ? " · " : ""}
              {t.setsPerMatch != null ? `${t.setsPerMatch} ${t.setsPerMatch === 1 ? "set" : "sets"}` : ""}
            </dd>
          </div>
        )}
      </dl>

      {snap?.divisions?.length ? (
        <section className="rounded-xl border border-mp-border bg-mp-bg/40 p-4" aria-labelledby="cat-snap-h">
          <h3 id="cat-snap-h" className="text-lg font-bold uppercase italic text-mp-yellow">
            Categorías (Oro · Plata · Bronce)
          </h3>
          <p className="mt-1 text-xs text-mp-text-muted">
            Cuadros generados el{" "}
            {new Date(snap.computedAt).toLocaleString("es-AR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <ul className="mt-3 space-y-3">
            {snap.divisions.map((row, i) => (
              <li key={`${String(row.division)}-${i}`}>
                <p className="text-xs font-semibold uppercase text-mp-text-secondary">
                  {divisionLabel(String(row.division))}
                </p>
                <ul className="mt-1 space-y-1 pl-2">
                  {row.categories.map((c) => (
                    <li
                      key={c.category}
                      className="flex flex-wrap justify-between gap-2 text-sm text-mp-text"
                    >
                      <span>{categoryLabel(c.category)}</span>
                      <span className="text-mp-text-muted">
                        {c.teamIds?.length ?? 0} equipos · {c.matchIds?.length ?? 0}{" "}
                        partidos
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <WaitlistDetailSection
        totalCount={t.waitlistCount ?? 0}
        waitlistByDivision={waitlistByDivision}
      />
    </div>
  );
}
