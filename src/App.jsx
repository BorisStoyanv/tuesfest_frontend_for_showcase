import { useMemo, useState } from "react";

const highlightItems = [
  {
    title: "Traditional Frontend Stack",
    description:
      "Built with React + Vite to prove that modern web frameworks deploy smoothly on ICP through A3.",
  },
  {
    title: "Image Delivery Reliability",
    description:
      "Local assets and externally hosted images both render cleanly, showing full compatibility in real usage.",
  },
  {
    title: "Fast API Calls",
    description:
      "Live fetch demo measures response time from a public API to demonstrate real-world speed.",
  },
];

function App() {
  const [apiState, setApiState] = useState({
    status: "idle",
    latency: null,
    title: "",
    error: "",
  });

  const statusLabel = useMemo(() => {
    if (apiState.status === "loading") return "Testing API speed...";
    if (apiState.status === "success")
      return `Success in ${apiState.latency} ms`;
    if (apiState.status === "error") return "Request failed";
    return "Run the test";
  }, [apiState]);

  const runSpeedCheck = async () => {
    setApiState({ status: "loading", latency: null, title: "", error: "" });

    const start = performance.now();
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const latency = Math.round(performance.now() - start);
      setApiState({
        status: "success",
        latency,
        title: data.title,
        error: "",
      });
    } catch (error) {
      setApiState({
        status: "error",
        latency: null,
        title: "",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">A3 x ICP Deployment Showcase</p>
        <h1>TuesFest 2026</h1>
        <p className="subtitle">
          A beautiful, production-style website proving that ICP deployment on A3
          supports modern frameworks, flawless image rendering, and low-latency
          external API requests.
        </p>
        <button type="button" onClick={runSpeedCheck} className="primary-btn">
          Check External API Speed
        </button>
        <p className="status">{statusLabel}</p>
      </header>

      <main className="content">
        <section className="highlights">
          {highlightItems.map((item) => (
            <article key={item.title} className="card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="images">
          <article className="image-card">
            <h3>Local Image on ICP</h3>
            <p>
              This SVG is served directly from the app bundle, proving static assets
              are delivered correctly.
            </p>
            <img src="/tuesfest-hero.svg" alt="TuesFest local showcase visual" />
          </article>

          <article className="image-card">
            <h3>Remote CDN Image</h3>
            <p>
              This external image confirms smooth rendering of third-party assets in
              the same deployed app.
            </p>
            <img
              src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80"
              alt="Festival crowd lights showcase"
              loading="lazy"
            />
          </article>
        </section>

        <section className="api-result">
          <h3>Live API Response</h3>
          {apiState.status === "success" ? (
            <p>
              Received title from external API: <strong>{apiState.title}</strong>
            </p>
          ) : (
            <p>
              Trigger the speed test to fetch live data from an external API and
              display it here.
            </p>
          )}
          {apiState.status === "error" && (
            <p className="error">Error detail: {apiState.error}</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
