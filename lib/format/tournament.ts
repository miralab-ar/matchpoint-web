import { parseLocalDay } from "@/lib/date/calendarHelpers";
import type { TournamentPhase, TournamentStatus } from "@/lib/types/tournament";

/**
 * Rango de fechas en es-AR. Usa el día civil local (`YYYY-MM-DD` no se corre
 * un día por la zona horaria, como pasaba con `new Date("2026-05-01")`).
 */
export function formatRange(
  start: string,
  end: string,
  month: "long" | "short" = "long",
): string {
  const s = parseLocalDay(start);
  const e = parseLocalDay(end || start);
  if (Number.isNaN(s.getTime())) return start;
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month, year: "numeric" };
  if (Number.isNaN(e.getTime()) || s.toDateString() === e.toDateString()) {
    return s.toLocaleDateString("es-AR", opts);
  }
  return `${s.toLocaleDateString("es-AR", opts)} — ${e.toLocaleDateString("es-AR", opts)}`;
}

/** Fecha corta para chips: «1 may». */
export function formatChipDate(start: string): string {
  const s = parseLocalDay(start);
  if (Number.isNaN(s.getTime())) return start;
  return s
    .toLocaleDateString("es-AR", { day: "numeric", month: "short" })
    .replace(".", "");
}

export function statusLabel(status: TournamentStatus | string | undefined): string {
  if (status === "open") return "Inscripciones abiertas";
  if (status === "full") return "Cupo completo";
  if (status === "cancelled") return "Cancelado";
  return status ?? "—";
}

export function phaseLabel(phase: TournamentPhase | string | undefined): string {
  if (phase === "registration") return "Inscripción";
  if (phase === "classification") return "Fase de grupos";
  if (phase === "categories") return "Cuadros por categoría";
  if (phase === "completed") return "Finalizado";
  return phase ?? "—";
}
