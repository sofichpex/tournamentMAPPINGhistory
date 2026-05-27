// Main app — header, stats, filters, grid of cards
const { useState, useMemo } = React;

function StatCounter({ label, value, color, sub }) {
  return (
    <div className="stat-tile" style={{ "--stat-color": color }}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  // Override ratings from tweaks (each map id has a rating override key)
  const maps = useMemo(() => {
    return window.MAPS_DATA.map(m => ({
      ...m,
      rating: tweaks[`rating_${m.id}`] ?? m.rating,
    }));
  }, [tweaks]);

  const [filter, setFilter] = useState("all"); // all | alive | dead
  const [sort, setSort] = useState("default"); // default | best | worst

  const handleRate = (id, rating) => {
    setTweak(`rating_${id}`, rating);
  };

  const counts = useMemo(() => {
    const c = { 4: 0, 3: 0, 2: 0, 1: 0 };
    maps.forEach(m => { c[m.rating]++; });
    return c;
  }, [maps]);

  const filtered = useMemo(() => {
    let list = [...maps];
    if (filter === "alive") list = list.filter(m => m.rating >= 3);
    if (filter === "dead") list = list.filter(m => m.rating <= 2);
    if (filter === "murdered") list = list.filter(m => m.rating === 1);
    if (sort === "best") list.sort((a, b) => b.rating - a.rating || a.id - b.id);
    if (sort === "worst") list.sort((a, b) => a.rating - b.rating || a.id - b.id);
    return list;
  }, [maps, filter, sort]);

  const total = maps.length;
  const aliveCount = counts[4] + counts[3];
  const deadCount = counts[1];
  const survivalRate = Math.round(((total - deadCount) / total) * 100);

  return (
    <div className={`app-root vibe-${tweaks.vibe}`}>
      {/* Floating decorations on body */}
      <div className="page-deco" aria-hidden="true">
        <Flower size={48} top="120px" left="3%" rotate={-15} color="#ffafd6"/>
        <Flower size={36} top="380px" right="4%" rotate={20} color="#ff7eb6"/>
        <Flower size={28} top="640px" left="6%" rotate={45} color="#ffd1e5"/>
        <Heart size={22} top="220px" right="8%" color="#ff5fa8" rotate={15}/>
        <Heart size={16} top="500px" left="10%" color="#ffafd6" rotate={-25}/>
        <Sparkle size={20} top="80px" right="14%" color="#ffd86b"/>
        <Sparkle size={14} top="320px" left="14%" color="#ff89c2"/>
        <Sparkle size={18} top="560px" right="18%" color="#ffd86b"/>
      </div>

      <header className="site-header">
        <div className="header-row">
          <div className="title-stack">
            <div className="tiny-eyebrow">
              ✿ a tournament mapping diary by a pick-me girl ✿
            </div>
            <h1 className="site-title">
              <span className="title-script">tournament</span>
              <span className="title-fat">MAPPING</span>
              <span className="title-script">history ♡</span>
            </h1>
            <div className="subtitle">
              {total} maps total — {aliveCount} bangers, {deadCount} crime scenes
            </div>
          </div>
          <div className="bow-badge">
            <svg viewBox="0 0 100 70" width="120" height="84">
              <ellipse cx="20" cy="35" rx="20" ry="22" fill="#ff5fa8"/>
              <ellipse cx="80" cy="35" rx="20" ry="22" fill="#ff5fa8"/>
              <ellipse cx="20" cy="35" rx="14" ry="15" fill="#ff89c2"/>
              <ellipse cx="80" cy="35" rx="14" ry="15" fill="#ff89c2"/>
              <rect x="42" y="22" width="16" height="26" rx="4" fill="#e8147a"/>
              <circle cx="50" cy="35" r="5" fill="#fff5b8"/>
            </svg>
          </div>
        </div>

        <div className="stats-strip">
          <StatCounter label="masterpieces" value={counts[4]} color="#ffd86b" sub="✦ certified" />
          <StatCounter label="hype" value={counts[3]} color="#ff5fa8" sub="♡ slay" />
          <StatCounter label="fine" value={counts[2]} color="#ffafd6" sub="... whatever" />
          <StatCounter label="deceased" value={counts[1]} color="#c8141e" sub="☠ R.I.P." />
          <StatCounter label={`${survivalRate}%`} value="survival rate" color="#0d0203" sub={deadCount > 0 ? "they didn't all make it" : "everyone lives"}/>
        </div>

        <div className="controls-strip">
          <div className="filter-group">
            <span className="control-label">filter:</span>
            {[
              { id: "all",      label: "all maps",   emoji: "✿" },
              { id: "alive",    label: "the slayers", emoji: "♡" },
              { id: "dead",     label: "the trial",  emoji: "✗" },
              { id: "murdered", label: "the bodies", emoji: "☠" },
            ].map(f => (
              <button
                key={f.id}
                className={`filter-pill ${filter === f.id ? "active" : ""} ${f.id === "murdered" || f.id === "dead" ? "pill-dead" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                <span className="pill-emoji">{f.emoji}</span>
                {f.label}
              </button>
            ))}
          </div>
          <div className="sort-group">
            <span className="control-label">sort:</span>
            {[
              { id: "default", label: "chronological" },
              { id: "best",    label: "best first ♡" },
              { id: "worst",   label: "the autopsy" },
            ].map(s => (
              <button
                key={s.id}
                className={`sort-pill ${sort === s.id ? "active" : ""} ${s.id === "worst" ? "pill-dead" : ""}`}
                onClick={() => setSort(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="maps-grid">
        {filtered.map(m => (
          <MapCard key={m.id} map={m} onRate={handleRate}/>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            nothing here ♡ everyone survived this round
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-flowers" aria-hidden="true">
          <Flower size={20} color="#ffafd6"/>
          <Flower size={28} color="#ff5fa8"/>
          <Flower size={20} color="#ffafd6"/>
        </div>
        <p>compiled with ♡ + a lil bit of blood</p>
        <p className="footer-fine">drag your banner images onto the placeholders — they stick on refresh</p>
      </footer>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks ♡">
        <TweakSection label="vibe">
          <TweakRadio
            label="overall mood"
            value={tweaks.vibe}
            options={[
              { value: "soft",  label: "soft pink" },
              { value: "loud",  label: "hyper pink" },
            ]}
            onChange={v => setTweak("vibe", v)}
          />
          <TweakToggle
            label="extra blood on dead maps"
            value={tweaks.extraBlood}
            onChange={v => setTweak("extraBlood", v)}
          />
          <TweakToggle
            label="floating page decorations"
            value={tweaks.pageDeco}
            onChange={v => setTweak("pageDeco", v)}
          />
          <TweakToggle
            label="card hover wobble"
            value={tweaks.wobble}
            onChange={v => setTweak("wobble", v)}
          />
        </TweakSection>

        <TweakSection label="ratings (1 = murdered, 4 = masterpiece)">
          {window.MAPS_DATA.map(m => {
            const current = tweaks[`rating_${m.id}`] ?? m.rating;
            return (
              <div key={m.id} className="tweak-rating-row">
                <div className="tweak-rating-info">
                  <div className="tweak-rating-title">{m.title}</div>
                  <div className="tweak-rating-meta">{m.mod} · {m.tournament}</div>
                </div>
                <div className="tweak-rating-buttons">
                  {[1, 2, 3, 4].map(n => (
                    <button
                      key={n}
                      className={`tweak-star ${current === n ? "active" : ""} ${n === 1 ? "kill" : ""}`}
                      onClick={() => setTweak(`rating_${m.id}`, n)}
                    >
                      {n === 1 ? "✗" : n === 4 ? "✦" : "♡"}
                      <span className="tweak-num">{n}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </TweakSection>
      </TweaksPanel>

      {/* Apply tweak side-effects via attributes on root */}
      <style>{`
        .app-root[data-extra-blood="false"] .blood-drip { display: none; }
        .app-root[data-page-deco="false"] .page-deco { display: none; }
        .app-root[data-wobble="false"] .map-card:hover { transform: none; }
      `}</style>
      <span data-attr-applier ref={() => {
        const root = document.querySelector(".app-root");
        if (!root) return;
        root.dataset.extraBlood = tweaks.extraBlood ? "true" : "false";
        root.dataset.pageDeco = tweaks.pageDeco ? "true" : "false";
        root.dataset.wobble = tweaks.wobble ? "true" : "false";
      }}/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App/>);
