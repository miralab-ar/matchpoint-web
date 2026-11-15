export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.miralab.matchpoint";

export function AppPromo() {
  return (
    <section
      aria-labelledby="app-promo-heading"
      className="mp-enter relative mb-6 flex shrink-0 items-center gap-4 overflow-hidden rounded-2xl border border-mp-border bg-mp-surface p-3 sm:gap-5 sm:p-4 lg:mb-4 lg:py-2.5"
    >
      <video
        className="aspect-[9/16] w-32 shrink-0 rounded-xl bg-black object-cover ring-1 ring-mp-border sm:w-36 lg:w-24"
        src="/video/matchpoint.mp4"
        poster="/video/matchpoint-poster.jpg"
        preload="none"
        muted
        playsInline
        controls
        aria-label="Video: cómo funciona la app Matchpoint"
      >
        Tu navegador no puede reproducir este video.
      </video>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-mp-yellow to-mp-violet"
      />
      <div className="min-w-0">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-mp-yellow">
          App para Android
        </p>
        <h2
          id="app-promo-heading"
          className="mt-1 text-xl font-extrabold uppercase italic leading-[1.05] text-mp-text sm:text-2xl"
        >
          Organizá y jugá torneos de vóley playa desde el celular
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-mp-text-secondary">
          Con la app Matchpoint creás torneos por invitación, armás tu equipo de
          a dos y seguís partidos y clasificación en vivo.
        </p>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-mp-yellow px-4 py-2 whitespace-nowrap font-display text-sm font-bold uppercase tracking-wide text-mp-bg sm:text-base transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mp-yellow"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
            <path d="M3.6 1.8a1.5 1.5 0 0 0-.6 1.2v18a1.5 1.5 0 0 0 .6 1.2L13.4 12 3.6 1.8Zm11.2 11.6 2.6 2.6-11.9 6.8 9.3-9.4Zm0-2.8L5.5 1.2l11.9 6.8-2.6 2.6Zm3.9-1.8 3 1.7a1.7 1.7 0 0 1 0 3l-3 1.7-2.9-3 2.9-3.4Z" />
          </svg>
          Disponible en Google Play
        </a>
      </div>
    </section>
  );
}
