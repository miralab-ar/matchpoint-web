"use client";

import { useId, useState } from "react";

export type DetailTabId =
  | "resumen"
  | "equipos"
  | "jugadores"
  | "partidos"
  | "clasificacion";

const TABS: { id: DetailTabId; label: string }[] = [
  { id: "resumen", label: "Resumen" },
  { id: "equipos", label: "Equipos" },
  { id: "jugadores", label: "Jugadores" },
  { id: "partidos", label: "Partidos" },
  { id: "clasificacion", label: "Clasificación" },
];

type DetailTabsProps = {
  /** Hide tabs with no data (still allow resumen). */
  hasMatches: boolean;
  hasStandings: boolean;
  children: (active: DetailTabId) => React.ReactNode;
};

export function DetailTabs({
  hasMatches,
  hasStandings,
  children,
}: DetailTabsProps) {
  const baseId = useId();
  const visible = TABS.filter((tab) => {
    if (tab.id === "partidos") return hasMatches;
    if (tab.id === "clasificacion") return hasStandings;
    return true;
  });
  const [active, setActive] = useState<DetailTabId>("resumen");

  const effectiveActive = visible.some((t) => t.id === active)
    ? active
    : visible[0]?.id ?? "resumen";

  return (
    <div className="mt-6">
      <div
        role="tablist"
        aria-label="Secciones del torneo"
        className="mp-scrollbar -mx-1 flex gap-1 overflow-x-auto rounded-full border border-mp-border bg-mp-bg p-1 sm:mx-0"
      >
        {visible.map((tab) => {
          const selected = tab.id === effectiveActive;
          const panelId = `${baseId}-panel-${tab.id}`;
          const tabId = `${baseId}-tab-${tab.id}`;
          return (
            <button
              key={tab.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`min-h-11 shrink-0 grow rounded-full px-3 py-2 text-center font-display text-[0.95rem] sm:px-4 sm:text-base font-bold uppercase tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mp-yellow ${
                selected
                  ? "bg-mp-yellow text-mp-bg"
                  : "text-mp-text-secondary hover:bg-mp-surface-light hover:text-mp-text"
              }`}
              onClick={(e) => {
                setActive(tab.id);
                e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        key={effectiveActive}
        role="tabpanel"
        id={`${baseId}-panel-${effectiveActive}`}
        aria-labelledby={`${baseId}-tab-${effectiveActive}`}
        className="mp-enter mt-6 min-h-[120px]"
        tabIndex={0}
      >
        {children(effectiveActive)}
      </div>
    </div>
  );
}
