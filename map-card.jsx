// Card component — switches between "alive" (pink kawaii) and "dead" (gore crime scene)
// based on rating. 4 = masterpiece, 3 = hype, 2 = fine, 1 = murdered.

const RATING_LABELS = {
  4: { ru: "шедевр", en: "MASTERPIECE", tier: "alive" },
  3: { ru: "хайп", en: "HYPE", tier: "alive" },
  2: { ru: "норм", en: "FINE", tier: "mid" },
  1: { ru: "трупик", en: "DECEASED", tier: "dead" },
};

function Sparkle({ size = 14, top, left, right, bottom, delay = 0, color = "#fff" }) {
  return (
    <span
      className="sparkle"
      style={{
        top, left, right, bottom,
        width: size, height: size,
        animationDelay: `${delay}s`,
        color,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor"/>
      </svg>
    </span>
  );
}

function Flower({ size = 22, top, left, right, bottom, rotate = 0, color = "#ff5fa8", center = "#fff5b8" }) {
  // 5-petal daisy built from ellipses + center
  const petals = [0, 72, 144, 216, 288];
  return (
    <span
      className="flower-deco"
      style={{
        top, left, right, bottom,
        width: size, height: size,
        transform: `rotate(${rotate}deg)`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="-30 -30 60 60">
        {petals.map((deg, i) => (
          <ellipse
            key={i}
            cx="0" cy="-13" rx="7" ry="11"
            fill={color}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="5" fill={center}/>
      </svg>
    </span>
  );
}

function BloodDrip({ left, width = 24, height = 60, delay = 0 }) {
  return (
    <span
      className="blood-drip"
      style={{ left, width, height, animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 60" preserveAspectRatio="none">
        <path
          d="M 0 0 L 24 0 L 24 30 Q 22 38 18 40 Q 14 42 14 50 Q 14 56 12 58 Q 10 56 10 50 Q 10 44 6 42 Q 2 40 0 30 Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function Splatter({ top, left, right, bottom, size = 80, opacity = 0.8 }) {
  return (
    <span
      className="blood-splatter"
      style={{ top, left, right, bottom, width: size, height: size, opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="22" fill="currentColor"/>
        <circle cx="20" cy="30" r="6" fill="currentColor"/>
        <circle cx="80" cy="25" r="8" fill="currentColor"/>
        <circle cx="85" cy="70" r="5" fill="currentColor"/>
        <circle cx="18" cy="75" r="9" fill="currentColor"/>
        <circle cx="62" cy="12" r="3" fill="currentColor"/>
        <circle cx="35" cy="88" r="4" fill="currentColor"/>
        <circle cx="92" cy="48" r="3" fill="currentColor"/>
        <circle cx="6" cy="52" r="4" fill="currentColor"/>
        <path d="M 50 28 Q 56 18 60 8 L 56 6 Q 52 18 48 28 Z" fill="currentColor"/>
        <path d="M 72 50 Q 84 54 95 58 L 96 54 Q 84 50 72 46 Z" fill="currentColor"/>
        <path d="M 28 65 Q 18 72 8 80 L 10 84 Q 22 76 32 70 Z" fill="currentColor"/>
      </svg>
    </span>
  );
}

function Heart({ size = 18, top, left, right, bottom, rotate = 0, color = "#ff3d8a", delay = 0 }) {
  return (
    <span
      className="heart-deco"
      style={{
        top, left, right, bottom, width: size, height: size,
        transform: `rotate(${rotate}deg)`, color,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24">
        <path
          d="M12 21 C 4 14 2 9 4.5 6 C 7 3 11 4 12 7 C 13 4 17 3 19.5 6 C 22 9 20 14 12 21 Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function ModBadge({ mod, tier }) {
  return (
    <div className={`mod-badge mod-tier-${tier}`}>
      <span>{mod}</span>
    </div>
  );
}

function MapCard({ map, onRate }) {
  const tier = RATING_LABELS[map.rating].tier;
  const isDead = tier === "dead";
  const isMid = tier === "mid";
  const isAlive = tier === "alive";
  const isMasterpiece = map.rating === 4;
  const slotId = `banner-${map.id}`;

  return (
    <article className={`map-card tier-${tier} rating-${map.rating}`} data-screen-label={`map-${map.id}-${RATING_LABELS[map.rating].en}`}>
      {/* Banner */}
      <div className="banner-wrap">
        <image-slot
          id={slotId}
          shape="rect"
          placeholder={`drop banner: ${map.title}`}
        ></image-slot>
        {isDead && (
          <>
            <div className="police-tape police-tape-top">
              <span>CRIME ✿ SCENE ✿ DO NOT CROSS ✿ CRIME ✿ SCENE ✿ DO NOT CROSS ✿</span>
            </div>
            <Splatter top="-12px" right="8%" size={70} opacity={0.85}/>
            <Splatter bottom="-18px" left="12%" size={90} opacity={0.7}/>
            <BloodDrip left="22%" delay={0}/>
            <BloodDrip left="58%" width={18} height={48} delay={0.3}/>
            <BloodDrip left="78%" width={28} height={72} delay={0.6}/>
          </>
        )}
        {isMasterpiece && (
          <>
            <div className="sparkle-overlay">
              <Sparkle size={24} top="8%" left="6%" delay={0}/>
              <Sparkle size={16} top="20%" right="12%" delay={0.5}/>
              <Sparkle size={20} bottom="14%" left="18%" delay={1}/>
              <Sparkle size={14} bottom="22%" right="8%" delay={1.5}/>
            </div>
          </>
        )}
        <ModBadge mod={map.mod} tier={tier}/>
      </div>

      {/* Body */}
      <div className="card-body">
        {isAlive && (
          <>
            <Flower size={28} top="-14px" right="-10px" rotate={-15} color="#ff89c2" center="#fff5b8"/>
            <Flower size={20} bottom="40%" left="-12px" rotate={20} color="#ffafd6" center="#fff5b8"/>
            <Heart size={14} top="35%" right="14px" rotate={-12} color="#ff4d97"/>
          </>
        )}
        {isMasterpiece && (
          <>
            <Flower size={22} top="50%" right="-8px" rotate={45} color="#ffd86b" center="#fff"/>
            <Sparkle size={12} top="20px" left="50%" delay={0.2} color="#ffd86b"/>
          </>
        )}
        {isDead && (
          <>
            <Splatter top="20%" left="-30px" size={100} opacity={0.5}/>
            <Splatter bottom="10%" right="-20px" size={70} opacity={0.6}/>
          </>
        )}

        <div className="title-row">
          <h3 className={`map-title ${isDead ? "title-dead" : ""}`}>
            {map.title}
          </h3>
        </div>
        <div className="artist-row">
          <span className="by">by</span>
          <span className="artist">{map.artist}</span>
        </div>

        <div className="tournament-row">
          <span className="tag-label">{isDead ? "incident at:" : "tournament ♡"}</span>
          <span className="tournament-name">{map.tournament}</span>
        </div>

        <div className={`comment-bubble ${isDead ? "comment-dead" : ""}`}>
          <span className="quote-mark">{isDead ? "✗" : "❝"}</span>
          <p className="comment-text">{map.comment}</p>
        </div>

        {/* Rating + stamp */}
        <div className="rating-row">
          <div className="stars-row">
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                className={`star-btn ${n <= map.rating ? "filled" : "empty"} ${isDead ? "star-blood" : ""}`}
                onClick={() => onRate(map.id, n)}
                aria-label={`set rating ${n}`}
                title={`set rating ${n}`}
              >
                {isDead ? "✗" : "✿"}
              </button>
            ))}
          </div>
          <div className={`rating-stamp stamp-${tier} stamp-${map.rating}`}>
            <span className="stamp-ru">{RATING_LABELS[map.rating].ru}</span>
            <span className="stamp-en">{RATING_LABELS[map.rating].en}</span>
          </div>
        </div>

        {isDead && (
          <div className="cause-of-death">
            cause of death: <em>questionable mapping decisions</em>
          </div>
        )}
        {isMasterpiece && (
          <div className="cause-of-death cause-alive">
            certified pick-me ♡ would map again
          </div>
        )}
      </div>
    </article>
  );
}

Object.assign(window, { MapCard, RATING_LABELS });
