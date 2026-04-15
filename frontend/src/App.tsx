import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CommandPalette } from "./features/command-palette/command-palette";
import { HomePage } from "./pages/home-page";
import { GamePage } from "./pages/game-page";
import { ImportSuccessPage } from "./pages/import-success-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfileDetailPage } from "./pages/profile-detail-page";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onOpenCommandPalette={() => setPaletteOpen(true)} />} />
        <Route path="/games/:slug" element={<GamePage onOpenCommandPalette={() => setPaletteOpen(true)} />} />
        <Route path="/profiles/:slug" element={<ProfileDetailPage onOpenCommandPalette={() => setPaletteOpen(true)} />} />
        <Route path="/import/success" element={<ImportSuccessPage onOpenCommandPalette={() => setPaletteOpen(true)} />} />
        <Route path="*" element={<NotFoundPage onOpenCommandPalette={() => setPaletteOpen(true)} />} />
      </Routes>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
