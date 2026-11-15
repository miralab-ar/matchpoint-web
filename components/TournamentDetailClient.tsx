"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getTournamentPollIntervalMs, isApiConfigured } from "@/lib/config";
import {
  clearTournamentPage,
  loadTournamentPage,
  refreshTournamentPage,
} from "@/store/features/tournamentsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DetailTabs } from "@/components/tournament-detail/DetailTabs";
import type { DetailTabId } from "@/components/tournament-detail/DetailTabs";
import { TabResumen } from "@/components/tournament-detail/TabResumen";
import { TabEquipos } from "@/components/tournament-detail/TabEquipos";
import { TabJugadores } from "@/components/tournament-detail/TabJugadores";
import { TabPartidos } from "@/components/tournament-detail/TabPartidos";
import { TabClasificacion } from "@/components/tournament-detail/TabClasificacion";
import { formatRange, phaseLabel, statusLabel } from "@/lib/format/tournament";
import { IconCalendar, IconLocation } from "@/components/icons/MatchpointIcons";

export function TournamentDetailClient({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { page, detailStatus, detailError } = useAppSelector((s) => s.tournaments);
  const configured = isApiConfigured();

  const pollMs = getTournamentPollIntervalMs();

  useEffect(() => {
    if (!configured) return;
    void dispatch(loadTournamentPage(id));
    return () => {
      dispatch(clearTournamentPage());
    };
  }, [dispatch, id, configured]);

  /** Near–live updates: re-fetch detail + teams on an interval; pause when tab is hidden. */
  useEffect(() => {
    if (!configured || pollMs <= 0 || detailStatus !== "succeeded") return;

    const run = () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      void dispatch(refreshTournamentPage(id));
    };

    const intervalId = window.setInterval(run, pollMs);
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        run();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [configured, detailStatus, dispatch, id, pollMs]);

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    if (!configured) return;
    setRefreshing(true);
    try {
      await dispatch(refreshTournamentPage(id)).unwrap();
    } catch {
      /* keep last good payload */
    } finally {
      setRefreshing(false);
    }
  }, [configured, dispatch, id]);

  const tournament = page?.tournament;
  const teams = page?.teams ?? [];
  const entries = page?.entries ?? [];
  const waitlistByDivision = page?.waitlistByDivision ?? {
    men: [],
    women: [],
    mixed: [],
  };

  const hasMatches = useMemo(
    () => (tournament?.matches?.length ?? 0) > 0,
    [tournament?.matches?.length],
  );
  const hasStandings = useMemo(
    () => (tournament?.standings?.length ?? 0) > 0,
    [tournament?.standings?.length],
  );

  const renderTab = (tab: DetailTabId) => {
    if (!tournament) return null;
    if (tab === "resumen") {
      return (
        <TabResumen
          tournament={tournament}
          waitlistByDivision={waitlistByDivision}
          teamsTotal={teams.length}
          entriesTotal={entries.length}
        />
      );
    }
    if (tab === "equipos") {
      return (
        <TabEquipos teams={teams} matches={tournament.matches ?? []} />
      );
    }
    if (tab === "jugadores") {
      return <TabJugadores entries={entries} teams={teams} />;
    }
    if (tab === "partidos") {
      return (
        <TabPartidos
          tournamentId={tournament._id}
          matches={tournament.matches ?? []}
          teams={teams}
        />
      );
    }
    if (tab === "clasificacion") {
      return <TabClasificacion standings={tournament.standings ?? []} />;
    }
    return null;
  };

  const headerTitle =
    tournament?.name ??
    (detailStatus === "loading" ? "Cargando…" : "Torneo");

  return (
    <div className="flex min-h-screen flex-col bg-mp-bg">
      <SiteHeader
        variant="detail"
        title={headerTitle}
        onRefresh={configured && detailStatus === "succeeded" ? handleRefresh : undefined}
        refreshPending={refreshing}
      />

      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        tabIndex={-1}
      >
        {!configured && (
          <p className="text-mp-text-muted" role="status">
            Configurá la URL de la API en{" "}
            <code className="text-mp-yellow">.env.local</code>.
          </p>
        )}

        {configured && detailStatus === "loading" && (
          <div className="animate-pulse space-y-4" role="status" aria-busy="true">
            <div className="h-40 rounded-2xl bg-mp-surface" />
            <div className="h-10 rounded-lg bg-mp-surface-light/60" />
            <div className="h-24 rounded-lg bg-mp-surface" />
          </div>
        )}

        {configured && detailStatus === "failed" && detailError && (
          <div className="rounded-xl border border-red-500/40 bg-mp-surface px-4 py-3 text-sm text-mp-error">
            {detailError}
            <div className="mt-4">
              <Link
                href="/"
                className="font-semibold text-mp-yellow underline underline-offset-2"
              >
                Volver al listado
              </Link>
            </div>
          </div>
        )}

        {tournament && detailStatus === "succeeded" && (
          <article className="mp-enter rounded-2xl border border-mp-border bg-mp-surface p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-mp-yellow px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-mp-bg">
                {statusLabel(tournament.status)}
              </span>
              {tournament.phase ? (
                <span className="rounded-md bg-mp-violet/20 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-violet-300">
                  {phaseLabel(tournament.phase)}
                </span>
              ) : null}
            </div>
            <h2 className="mt-3 text-4xl font-extrabold uppercase italic leading-[0.95] text-mp-text sm:text-5xl">
              {tournament.name}
            </h2>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-mp-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <IconCalendar className="h-4 w-4 text-mp-text-muted" aria-hidden />
                {formatRange(tournament.startDate, tournament.endDate)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconLocation className="h-4 w-4 text-mp-text-muted" aria-hidden />
                {tournament.location}
              </span>
            </div>

            <DetailTabs hasMatches={hasMatches} hasStandings={hasStandings}>
              {(active) => renderTab(active)}
            </DetailTabs>
          </article>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
