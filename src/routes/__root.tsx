import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-display text-foreground">This page is in the dark.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-[color:var(--color-ember)] px-5 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember-foreground)] transition-colors hover:opacity-90"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Darley — Ghanaian Singer & Songwriter" },
      {
        name: "description",
        content:
          "Darley (Isabella Narh) — Ghanaian singer, songwriter, and music & dance educator. Cinematic, emotional, genre-blending music rooted in Ghanaian culture.",
      },
      { name: "author", content: "Darley" },
      { property: "og:title", content: "Darley — Ghanaian Singer & Songwriter" },
      { property: "og:description", content: "Darley's Echoes is a website for Ghanaian singer/songwriter Darley, showcasing her music and educational work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Darley — Ghanaian Singer & Songwriter" },
      { name: "description", content: "Darley's Echoes is a website for Ghanaian singer/songwriter Darley, showcasing her music and educational work." },
      { name: "twitter:description", content: "Darley's Echoes is a website for Ghanaian singer/songwriter Darley, showcasing her music and educational work." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90f235ae-2111-4c37-a795-8953256bc87b/id-preview-cad6d787--b50d9f53-b6d6-44a9-bb11-21abc884d155.lovable.app-1777645268339.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90f235ae-2111-4c37-a795-8953256bc87b/id-preview-cad6d787--b50d9f53-b6d6-44a9-bb11-21abc884d155.lovable.app-1777645268339.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
