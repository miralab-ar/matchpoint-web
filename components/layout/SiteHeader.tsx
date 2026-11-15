"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowBack, IconRefresh } from "@/components/icons/MatchpointIcons";

type SiteHeaderProps =
  | {
      variant: "list";
      onRefresh?: () => void;
      refreshPending?: boolean;
    }
  | {
      variant: "detail";
      title: string;
      onRefresh?: () => void;
      refreshPending?: boolean;
    };

export function SiteHeader(props: SiteHeaderProps) {
  const refreshBtn =
    props.onRefresh != null ? (
      <button
        type="button"
        onClick={props.onRefresh}
        disabled={props.refreshPending}
        aria-busy={props.refreshPending}
        aria-label="Actualizar datos"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mp-border bg-mp-surface text-mp-text transition-[background-color,transform] duration-150 hover:bg-mp-surface-light active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mp-yellow disabled:cursor-not-allowed disabled:opacity-60"
      >
        <IconRefresh
          className={`h-5 w-5 ${props.refreshPending ? "animate-spin" : ""}`}
          aria-hidden
        />
      </button>
    ) : null;

  if (props.variant === "list") {
    return (
      <header
        className="sticky top-0 z-20 shrink-0 border-b border-mp-border bg-mp-bg/90 backdrop-blur-md"
        role="banner"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:max-w-[100rem] lg:px-8 lg:py-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-md outline-none ring-mp-yellow focus-visible:ring-2"
          >
            <Image
              src="/matchpoint-app-icon.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-xl object-contain"
              priority
              aria-hidden
            />
            <div className="flex min-w-0 flex-col items-start leading-none">
              <span className="font-display text-2xl font-extrabold uppercase italic tracking-tight sm:text-[1.7rem]">
                <span className="text-mp-yellow">Match</span>
                <span className="text-mp-violet">point</span>
              </span>
              <span className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mp-text-muted">
                Torneos de vóley playa
              </span>
            </div>
          </Link>
          {refreshBtn}
        </div>
      </header>
    );
  }

  return (
    <header
      className="sticky top-0 z-20 border-b border-mp-border bg-mp-bg/95 backdrop-blur-sm"
      role="banner"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:max-w-[100rem] lg:px-8">
        <Link
          href="/"
          aria-label="Volver a torneos"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mp-border bg-mp-surface text-mp-text outline-none transition-colors hover:bg-mp-surface-light focus-visible:ring-2 focus-visible:ring-mp-yellow"
        >
          <IconArrowBack className="h-5 w-5" aria-hidden />
        </Link>
        <h1 className="min-w-0 flex-1 truncate font-display text-2xl font-extrabold uppercase italic leading-tight text-mp-text sm:text-3xl">
          {props.title}
        </h1>
        {refreshBtn}
      </div>
    </header>
  );
}
