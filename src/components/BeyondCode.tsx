"use client";

const MARQUEE_ITEMS = [
  { label: "Neural Network Viz" },
  { label: "Generative Art" },
  { label: "3D Data Sculpture" },
  { label: "Audio Reactive" },
  { label: "Shader Experiments" },
  { label: "Creative Coding" },
  { label: "AI Art Collab" },
  { label: "Motion Graphics" },
];

function MarqueeCard({ label, index }: { label: string; index: number }) {
  // Generating different subtle gradients for each card
  const hue = 30 + index * 5;
  const bg = `linear-gradient(${135 + index * 15}deg, hsl(${hue}, 8%, 10%) 0%, hsl(${hue}, 5%, 7%) 50%, hsl(${hue}, 10%, 11%) 100%)`;

  return (
    <div className="marquee-item">
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "rgba(200,169,126,0.3)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            userSelect: "none",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function BeyondCode() {
  // Duplicate items for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section id="beyond" className="beyond">
      <div className="beyond-header">
        <h2 className="beyond-title">Beyond Code</h2>
        <p className="beyond-sub">
          My digital lab. Experiments and explorations at the edge of tech and creativity.
        </p>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {items.map((item, i) => (
            <MarqueeCard key={`${item.label}-${i}`} label={item.label} index={i % MARQUEE_ITEMS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
