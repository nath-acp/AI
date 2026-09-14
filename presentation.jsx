import React, { useState, useEffect, useCallback, useRef } from "react";

/* ------------------------------------------------------------------
   Saudi Arabia · 2034 FIFA World Cup — slide deck
   Palette: flag green + desert sand + engineering gold, alternating
   dark/light slides for rhythm. Single orchestrated reveal per slide
   (staggered by CSS transition-delay), no continuous ambient motion.
------------------------------------------------------------------- */

const COLORS = {
  ink: "#0A1710",
  green: "#0E6B3A",
  greenDeep: "#083621",
  sand: "#EFE6D3",
  sandLight: "#F8F3E8",
  gold: "#C69A3A",
  goldSoft: "#DCC488",
  white: "#FFFFFF",
  inkSoft: "rgba(10,23,16,0.62)",
  whiteSoft: "rgba(255,255,255,0.7)",
};

/* ---------- Reveal: staggered fade/rise wrapper ---------- */
function Reveal({ active, delay = 0, children, style = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0px)" : "translateY(16px)",
        transition: `opacity 0.65s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 0.65s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- small building blocks ---------- */
function Kicker({ children, dark }) {
  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 13,
        letterSpacing: "0.08em",
        color: dark ? COLORS.goldSoft : COLORS.green,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

function Stat({ value, label, dark, size = 44 }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1,
          color: dark ? COLORS.white : COLORS.ink,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 14,
          color: dark ? COLORS.whiteSoft : COLORS.inkSoft,
          maxWidth: 220,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function CapBar({ label, city, capacity, max, dark, active, delay }) {
  const pct = Math.round((capacity / max) * 100);
  return (
    <Reveal active={active} delay={delay} style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          color: dark ? COLORS.whiteSoft : COLORS.inkSoft,
          marginBottom: 6,
        }}
      >
        <span style={{ color: dark ? COLORS.white : COLORS.ink, fontWeight: 600 }}>
          {label}
        </span>
        <span>
          {city} · {capacity.toLocaleString()}
        </span>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 999,
          background: dark ? "rgba(255,255,255,0.14)" : "rgba(10,23,16,0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: active ? `${pct}%` : "0%",
            height: "100%",
            borderRadius: 999,
            background: dark
              ? `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldSoft})`
              : `linear-gradient(90deg, ${COLORS.green}, #1B8A50)`,
            transition: `width 1s cubic-bezier(.2,.7,.3,1) ${delay + 120}ms`,
          }}
        />
      </div>
    </Reveal>
  );
}

/* ---------- Slide shell ---------- */
function Slide({ dark, children }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: dark
          ? `radial-gradient(120% 140% at 10% 0%, ${COLORS.green} 0%, ${COLORS.greenDeep} 46%, ${COLORS.ink} 100%)`
          : COLORS.sand,
        color: dark ? COLORS.white : COLORS.ink,
        display: "flex",
        flexDirection: "column",
        padding: "clamp(28px, 5vw, 72px)",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/* ================= SLIDES ================= */

function TitleSlide({ active }) {
  return (
    <Slide dark>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Reveal active={active} delay={0}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              letterSpacing: "0.08em",
              color: COLORS.goldSoft,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            Kingdom of Saudi Arabia
          </div>
        </Reveal>
        <Reveal active={active} delay={100}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(72px, 15vw, 190px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: COLORS.white,
            }}
          >
            2034
          </div>
        </Reveal>
        <Reveal active={active} delay={220}>
          <div
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "clamp(20px, 2.6vw, 30px)",
              fontWeight: 500,
              marginTop: 10,
              color: COLORS.white,
            }}
          >
            FIFA World Cup, hosted by Saudi Arabia
          </div>
        </Reveal>
        <Reveal active={active} delay={340}>
          <div
            style={{
              marginTop: 22,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ width: 40, height: 1, background: COLORS.goldSoft }} />
            <div
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontStyle: "italic",
                fontSize: 16,
                color: COLORS.whiteSoft,
              }}
            >
              Bid slogan: "Growing. Together."
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal active={active} delay={460}>
        <div
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13,
            color: COLORS.whiteSoft,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 16,
          }}
        >
          Awarded by FIFA on 11 December 2024 — the highest-scoring hosting bid in tournament history.
        </div>
      </Reveal>
    </Slide>
  );
}

function BidSlide({ active }) {
  return (
    <Slide>
      <Kicker>The Bid</Kicker>
      <Reveal active={active} delay={40}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 4.4vw, 54px)",
            letterSpacing: "-0.02em",
            margin: "10px 0 0",
            maxWidth: 720,
          }}
        >
          A record-scoring bid, awarded without contest
        </h2>
      </Reveal>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 28,
          alignContent: "center",
          marginTop: 30,
        }}
      >
        <Reveal active={active} delay={140}>
          <Stat value="419.8/500" label="FIFA's bid-evaluation score — the highest ever recorded" />
        </Reveal>
        <Reveal active={active} delay={220}>
          <Stat value="48" label="Teams competing, the tournament's expanded format" />
        </Reveal>
        <Reveal active={active} delay={300}>
          <Stat value="15" label="Stadiums, across five host cities" />
        </Reveal>
        <Reveal active={active} delay={380}>
          <Stat value="11 new" label="Stadiums built from scratch; four more renovated" />
        </Reveal>
      </div>
      <Reveal active={active} delay={480}>
        <div
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            color: COLORS.inkSoft,
            borderTop: "1px solid rgba(10,23,16,0.12)",
            paddingTop: 16,
            maxWidth: 640,
          }}
        >
          Saudi Arabia became the sole bidder for 2034 after Australia withdrew from contention in October 2024.
        </div>
      </Reveal>
    </Slide>
  );
}

function CitiesSlide({ active }) {
  const cities = [
    { name: "Riyadh", stadiums: 8 },
    { name: "Jeddah", stadiums: 4 },
    { name: "Al Khobar", stadiums: 1 },
    { name: "Abha", stadiums: 1 },
    { name: "NEOM", stadiums: 1 },
  ];
  return (
    <Slide dark>
      <Kicker dark>Five Cities</Kicker>
      <Reveal active={active} delay={40}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 4.4vw, 54px)",
            letterSpacing: "-0.02em",
            margin: "10px 0 0",
            color: COLORS.white,
          }}
        >
          Fifteen stadiums, spread coast to mountain
        </h2>
      </Reveal>

      <div style={{ flex: 1, display: "flex", alignItems: "center", marginTop: 20 }}>
        <div style={{ width: "100%" }}>
          <div style={{ position: "relative", height: 2, background: "rgba(255,255,255,0.18)", margin: "0 4px" }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cities.length}, 1fr)`,
              marginTop: -1,
            }}
          >
            {cities.map((c, i) => (
              <Reveal key={c.name} active={active} delay={160 + i * 110}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 0 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: COLORS.gold,
                      marginTop: -6,
                      boxShadow: "0 0 0 4px rgba(198,154,58,0.22)",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(28px, 4vw, 44px)",
                      color: COLORS.white,
                      marginTop: 20,
                    }}
                  >
                    {c.stadiums}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: 14,
                      color: COLORS.whiteSoft,
                      marginTop: 4,
                    }}
                  >
                    {c.name}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal active={active} delay={780}>
        <div
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            color: COLORS.whiteSoft,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 16,
          }}
        >
          NEOM's venue will rise within The Line — a still-unbuilt, 170-kilometre linear city on the Red Sea coast.
        </div>
      </Reveal>
    </Slide>
  );
}

function CenterpieceSlide({ active }) {
  return (
    <Slide>
      <Kicker>The Centerpiece</Kicker>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 40,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <div>
          <Reveal active={active} delay={80}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.6vw, 46px)",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              King Salman International Stadium
            </h2>
          </Reveal>
          <Reveal active={active} delay={180}>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.6,
                color: COLORS.inkSoft,
                maxWidth: 480,
                marginTop: 16,
              }}
            >
              Rising north of Riyadh and due for completion in 2029, it becomes the national
              team's permanent home — and the stage for both the opening match and the final.
            </p>
          </Reveal>
        </div>
        <Reveal active={active} delay={280}>
          <div
            style={{
              background: COLORS.ink,
              borderRadius: 4,
              padding: "36px 30px",
              color: COLORS.white,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(48px, 7vw, 76px)",
                lineHeight: 1,
              }}
            >
              92,000+
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                color: COLORS.whiteSoft,
                marginTop: 10,
              }}
            >
              Seats — among the largest stadium capacities in world football
            </div>
            <div style={{ display: "flex", gap: 22, marginTop: 28 }}>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: COLORS.gold }}>
                  Opening
                </div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: COLORS.whiteSoft }}>match</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: COLORS.gold }}>
                  Final
                </div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: COLORS.whiteSoft }}>match</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  );
}

function StadiumsSlide({ active }) {
  return (
    <Slide dark>
      <Kicker dark>Stadiums as Statements</Kicker>
      <Reveal active={active} delay={40}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.8vw, 46px)",
            letterSpacing: "-0.02em",
            margin: "10px 0 0",
            color: COLORS.white,
          }}
        >
          Architecture built to signal ambition
        </h2>
      </Reveal>

      <div style={{ flex: 1, marginTop: 8 }}>
        <CapBar label="New Murabba Stadium" city="Riyadh" capacity={46010} max={92000} dark active={active} delay={180} />
        <CapBar label="Roshn Stadium" city="Riyadh" capacity={46000} max={92000} dark active={active} delay={280} />
        <Reveal active={active} delay={380} style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginTop: 6,
            }}
          >
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 4,
                padding: 16,
              }}
            >
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 14, color: COLORS.white }}>
                Prince Mohammed bin Salman Stadium
              </div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: COLORS.whiteSoft, marginTop: 6, lineHeight: 1.5 }}>
                Qiddiya · a three-tier design overlooking the Tuwaiq mountain range.
              </div>
            </div>
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 4,
                padding: 16,
              }}
            >
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 14, color: COLORS.white }}>
                NEOM Stadium
              </div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: COLORS.whiteSoft, marginTop: 6, lineHeight: 1.5 }}>
                Set 350 metres up within The Line, powered by wind and solar energy.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  );
}

function LegacySlide({ active }) {
  return (
    <Slide>
      <Kicker>Beyond the Stadiums</Kicker>
      <Reveal active={active} delay={40}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.8vw, 46px)",
            letterSpacing: "-0.02em",
            margin: "10px 0 0",
            maxWidth: 700,
          }}
        >
          The infrastructure built to receive the world
        </h2>
      </Reveal>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 28,
          alignContent: "center",
          marginTop: 24,
        }}
      >
        <Reveal active={active} delay={160}>
          <Stat value="132" label="Training facilities planned across 15 cities" size={38} />
        </Reveal>
        <Reveal active={active} delay={240}>
          <Stat value="230,000+" label="Hotel rooms planned for delegations, media and fans" size={38} />
        </Reveal>
        <Reveal active={active} delay={320}>
          <Stat value="3" label="Signature fan festivals: Jeddah Waterfront, Abha's Sea Square, and Riyadh's King Salman Park" size={38} />
        </Reveal>
      </div>
      <Reveal active={active} delay={440}>
        <div
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            color: COLORS.inkSoft,
            borderTop: "1px solid rgba(10,23,16,0.12)",
            paddingTop: 16,
          }}
        >
          King Salman Park is planned to become the world's largest urban park.
        </div>
      </Reveal>
    </Slide>
  );
}

function ContextSlide({ active }) {
  return (
    <Slide dark>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker dark>Context</Kicker>
        <Reveal active={active} delay={100}>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(26px, 3.6vw, 42px)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: COLORS.white,
              maxWidth: 820,
              margin: "14px 0 0",
            }}
          >
            The Gulf's second World Cup arrives at a larger scale than its first —
            a single nation staging all 48 teams, twelve years after Qatar
            brought the tournament to the Middle East.
          </p>
        </Reveal>
        <Reveal active={active} delay={300}>
          <div style={{ display: "flex", gap: 40, marginTop: 40, flexWrap: "wrap" }}>
            <Stat value="2022" label="Qatar hosted the Middle East's first World Cup" dark size={30} />
            <Stat value="2034" label="Saudi Arabia hosts as the sole bidder, single country" dark size={30} />
          </div>
        </Reveal>
      </div>
    </Slide>
  );
}

function ClosingSlide({ active }) {
  return (
    <Slide dark>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Reveal active={active} delay={0}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(56px, 11vw, 140px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: COLORS.white,
            }}
          >
            Growing.
            <br />
            Together.
          </div>
        </Reveal>
        <Reveal active={active} delay={220}>
          <div
            style={{
              marginTop: 24,
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 18,
              color: COLORS.whiteSoft,
            }}
          >
            Riyadh · Jeddah · Al Khobar · Abha · NEOM — 2034
          </div>
        </Reveal>
      </div>
    </Slide>
  );
}

/* ================= DECK SHELL ================= */

const SLIDES = [
  { Comp: TitleSlide, dark: true, label: "Cover" },
  { Comp: BidSlide, dark: false, label: "The Bid" },
  { Comp: CitiesSlide, dark: true, label: "Host Cities" },
  { Comp: CenterpieceSlide, dark: false, label: "Centerpiece" },
  { Comp: StadiumsSlide, dark: true, label: "Stadiums" },
  { Comp: LegacySlide, dark: false, label: "Legacy" },
  { Comp: ContextSlide, dark: true, label: "Context" },
  { Comp: ClosingSlide, dark: true, label: "Closing" },
];

export default function Presentation() {
  const [index, setIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setEntered(false);
    timeoutRef.current = setTimeout(() => setEntered(true), 40);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const go = useCallback((next) => {
    setIndex((i) => Math.min(Math.max(i + next, 0), SLIDES.length - 1));
  }, []);

  const goTo = useCallback((i) => setIndex(i), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const Current = SLIDES[index].Comp;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 30px 60px -20px rgba(10,23,16,0.35)",
          background: COLORS.ink,
        }}
      >
        <div key={index} style={{ position: "absolute", inset: 0 }}>
          <Current active={entered} />
        </div>

        {/* progress bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(0,0,0,0.15)" }}>
          <div
            style={{
              height: "100%",
              width: `${((index + 1) / SLIDES.length) * 100}%`,
              background: COLORS.gold,
              transition: "width 0.5s cubic-bezier(.2,.7,.3,1)",
            }}
          />
        </div>
      </div>

      {/* controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 18,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}: ${s.label}`}
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: i === index ? COLORS.green : "rgba(10,23,16,0.25)",
                transition: "width 0.35s ease, background 0.35s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: COLORS.inkSoft }}>
            {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")} — {SLIDES[index].label}
          </div>
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            style={navBtnStyle(index === 0)}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={() => go(1)}
            disabled={index === SLIDES.length - 1}
            style={navBtnStyle(index === SLIDES.length - 1)}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

function navBtnStyle(disabled) {
  return {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: `1px solid ${disabled ? "rgba(10,23,16,0.15)" : COLORS.ink}`,
    background: "transparent",
    color: disabled ? "rgba(10,23,16,0.3)" : COLORS.ink,
    cursor: disabled ? "default" : "pointer",
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s ease, color 0.2s ease",
  };
}
