import { render, screen } from "@testing-library/react";
import { AppPromo, PLAY_STORE_URL } from "@/components/home/AppPromo";
import { SiteFooter } from "@/components/layout/SiteFooter";

describe("AppPromo", () => {
  it("muestra el video liviano y el enlace a Google Play", () => {
    const { container } = render(<AppPromo />);
    const video = container.querySelector("video")!;
    expect(video.getAttribute("preload")).toBe("none");
    expect(video.getAttribute("poster")).toBe("/video/matchpoint-poster.jpg");
    expect(video.muted).toBe(true);
    expect(video.hasAttribute("controls")).toBe(true);
    expect(screen.getByRole("link", { name: /Disponible en Google Play/ })).toHaveAttribute(
      "href",
      PLAY_STORE_URL,
    );
  });

  it("el pie dice que es un producto de Miralab", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/Matchpoint es un producto de/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Miralab" })).toHaveAttribute("href", "https://miralab.ar");
  });
});
