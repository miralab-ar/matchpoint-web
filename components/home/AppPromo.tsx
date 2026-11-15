export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.miralab.matchpoint";

export function AppPromo() {
  return (
    <section
      aria-labelledby="app-promo-heading"
      className="mb-4 flex shrink-0 items-center gap-4 rounded-2xl border border-mp-violet/40 bg-mp-surface p-3 sm:p-4 lg:mb-3 lg:py-2"
    >
      <video
        className="aspect-[9/16] w-32 shrink-0 rounded-xl bg-black object-cover sm:w-36 lg:w-24"
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
      <div className="min-w-0">
        <h2
          id="app-promo-heading"
          className="text-base font-bold italic text-white sm:text-lg"
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
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-mp-yellow px-4 py-2 text-sm font-bold text-mp-bg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mp-yellow"
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
