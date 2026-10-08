import type { ReactNode } from "react";
import type { Plant } from "./types";

type PlateProps = {
  plant: Plant;
  activeId: string | null;
  onSelect: (id: string) => void;
};

const ink = "#2a2118";
const leaf = "#2f6a45";
const leafDeep = "#1d4630";
const gold = "#a6843d";

function Frame({
  children,
  plant,
}: {
  children: ReactNode;
  plant: Plant;
}) {
  return (
    <svg viewBox="0 0 360 460" role="img" aria-label={`${plant.khmer}, ${plant.latin}`}>
      <defs>
        <linearGradient id="parchment" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7f0e2" />
          <stop offset="1" stopColor="#eadcbf" />
        </linearGradient>
        <pattern id="fiber" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 8 L8 0" stroke="#d9c8a4" strokeWidth="0.4" opacity="0.45" />
        </pattern>
        <filter id="soft">
          <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#2a2118" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect x="8" y="8" width="344" height="444" rx="6" fill="url(#parchment)" />
      <rect x="8" y="8" width="344" height="444" rx="6" fill="url(#fiber)" />
      <rect x="18" y="18" width="324" height="424" rx="2" fill="none" stroke={gold} strokeWidth="1.2" />
      <rect x="24" y="24" width="312" height="412" rx="1" fill="none" stroke="#8f2d2a" strokeWidth="0.6" />
      <text x="36" y="48" fill="#8f2d2a" fontFamily="Fraunces, serif" fontSize="13" letterSpacing="1.5">
        PLATE {plant.plate}
      </text>
      <text x="324" y="48" textAnchor="end" fill={ink} fontFamily="Noto Serif Khmer, serif" fontSize="14">
        {plant.khmer}
      </text>
      {children}
      <text x="180" y="402" textAnchor="middle" fill={ink} fontFamily="Fraunces, serif" fontStyle="italic" fontSize="15">
        {plant.latin}
      </text>
      <text x="180" y="420" textAnchor="middle" fill="#6d5b45" fontFamily="Noto Sans Khmer, sans-serif" fontSize="11">
        {plant.family}
      </text>
    </svg>
  );
}

function Habit({ plant }: { plant: Plant }) {
  switch (plant.id) {
    case "slok-bas":
      return (
        <g>
          <path d="M78 338 C120 260 140 210 168 176" fill="none" stroke={leafDeep} strokeWidth="3" />
          <path d="M188 188 C230 170 250 198 270 176" fill="none" stroke={leafDeep} strokeWidth="1.4" />
          <path d="M268 178 C286 158 294 180 304 162" fill="none" stroke={leafDeep} strokeWidth="1.2" />
          <g transform="translate(168 168)">
            {[-78, -40, 0, 40, 78].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-34"
                rx="15"
                ry="34"
                fill={angle === 0 ? "#3e8a56" : leaf}
                stroke={leafDeep}
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="7" fill={leafDeep} />
            <path d="M0 0 L0 -62 M0 -20 L-28 -48 M0 -20 L28 -48" stroke="#e7f2df" strokeWidth="0.8" />
          </g>
          <circle cx="228" cy="214" r="11" fill="#f7f6ef" stroke={gold} />
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="228"
              y1="214"
              x2={228 + Math.cos((i / 5) * Math.PI * 2 - Math.PI / 2) * 9}
              y2={214 + Math.sin((i / 5) * Math.PI * 2 - Math.PI / 2) * 9}
              stroke={gold}
            />
          ))}
          <ellipse cx="268" cy="300" rx="14" ry="38" fill="#b4232c" stroke="#6e1218" />
          <path d="M268 268 C276 292 276 320 268 334" fill="none" stroke="#7a1820" />
        </g>
      );
    case "khnhei-prey":
      return (
        <g>
          <path d="M180 330 C160 240 150 160 168 80" fill="none" stroke="#6a8f3a" strokeWidth="8" />
          <path d="M168 150 C100 120 70 170 90 210 C120 230 160 190 168 150 Z" fill="#7aaa3e" stroke={leafDeep} />
          <path d="M168 120 C240 80 300 130 280 190 C250 220 190 180 168 120 Z" fill="#8fbf45" stroke={leafDeep} />
          <path d="M168 150 L110 180 M168 120 L250 140" stroke="#edf6d4" strokeWidth="0.8" />
          <path d="M120 300 C140 250 150 250 160 300 C170 250 190 248 200 304 C210 250 230 260 236 310" fill="#c4542a" stroke="#7a2e12" />
          <ellipse cx="178" cy="348" rx="70" ry="18" fill="#e0b100" stroke="#8a6a10" />
          <ellipse cx="178" cy="348" rx="28" ry="8" fill="#f4d34a" />
        </g>
      );
    case "romiet":
      return (
        <g>
          <path d="M180 340 L180 90" stroke="#2f7d3a" strokeWidth="4" />
          <path d="M180 150 C90 90 60 170 100 220 C140 250 180 190 180 150 Z" fill="#1f8a42" stroke={leafDeep} />
          <path d="M180 130 C270 70 320 160 270 220 C230 250 180 180 180 130 Z" fill="#27a352" stroke={leafDeep} />
          <path d="M180 150 L120 190 M180 130 L250 180" stroke="#d9f5cf" strokeWidth="1" />
          <ellipse cx="150" cy="350" rx="46" ry="22" fill="#d85a12" stroke="#8a3208" transform="rotate(-18 150 350)" />
          <ellipse cx="214" cy="344" rx="40" ry="20" fill="#ef7a22" stroke="#8a3208" transform="rotate(16 214 344)" />
          <circle cx="196" cy="338" r="10" fill="#ffb057" />
        </g>
      );
    case "khnhei":
      return (
        <g>
          <path d="M186 336 C170 250 160 170 176 86" stroke="#7da14a" strokeWidth="7" fill="none" />
          <path d="M176 150 C100 110 78 190 112 220 C146 236 176 190 176 150 Z" fill="#9cba55" stroke={leafDeep} />
          <path d="M176 124 C250 78 310 150 286 204 C250 230 190 176 176 124 Z" fill="#b5cc68" stroke={leafDeep} />
          <path d="M120 330 C150 300 160 312 170 338 C190 300 210 308 220 344 C236 308 260 318 270 346" fill="none" stroke="#c9a15a" strokeWidth="10" strokeLinecap="round" />
          <ellipse cx="188" cy="352" rx="62" ry="16" fill="#e6c86a" stroke="#9a7a30" />
        </g>
      );
    case "sdav":
      return (
        <g>
          <path d="M180 360 L180 70" stroke="#5c4632" strokeWidth="4" />
          {[-70, -40, -10, 20, 50, 80].map((dy, i) => (
            <g key={dy}>
              <path
                d={`M180 ${150 + dy} C${150 - i * 4} ${138 + dy} ${120} ${150 + dy} ${108} ${168 + dy}`}
                fill="#2f6b3c"
                stroke={leafDeep}
              />
              <path
                d={`M180 ${150 + dy} C${210 + i * 4} ${136 + dy} ${246} ${148 + dy} ${258} ${166 + dy}`}
                fill="#3d8250"
                stroke={leafDeep}
              />
            </g>
          ))}
          <circle cx="118" cy="300" r="7" fill="#d8c56a" stroke="#6d5a28" />
          <circle cx="246" cy="286" r="7" fill="#e2d07a" stroke="#6d5a28" />
        </g>
      );
    case "smau-maha":
      return (
        <g>
          <path d="M180 360 L180 90" stroke="#3f6b32" strokeWidth="3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <ellipse cx={130} cy={140 + i * 42} rx="46" ry="12" fill="#4e8d3d" stroke={leafDeep} transform={`rotate(-16 ${130} ${140 + i * 42})`} />
              <ellipse cx={230} cy={140 + i * 42} rx="46" ry="12" fill="#63a24a" stroke={leafDeep} transform={`rotate(16 ${230} ${140 + i * 42})`} />
            </g>
          ))}
          <g>
            <circle cx="180" cy="108" r="5" fill="#f7f4ea" stroke="#7a5ea8" />
            <circle cx="180" cy="92" r="4" fill="#f7f4ea" stroke="#7a5ea8" />
            <path d="M176 108 H184" stroke="#6a4c93" strokeWidth="1" />
          </g>
        </g>
      );
    case "romdeng":
      return (
        <g>
          <path d="M180 340 L180 78" stroke="#2f7a3e" strokeWidth="6" />
          <path d="M180 140 C80 80 60 190 120 230 C160 250 180 180 180 140 Z" fill="#218a48" stroke={leafDeep} />
          <path d="M180 120 C280 60 320 180 250 230 C210 252 180 170 180 120 Z" fill="#34a35c" stroke={leafDeep} />
          <ellipse cx="176" cy="350" rx="74" ry="18" fill="#f3e2d2" stroke="#c48b9a" />
          <ellipse cx="176" cy="350" rx="24" ry="7" fill="#fff5ee" />
          <path d="M120 338 H232" stroke="#e7b7c4" strokeWidth="2" />
        </g>
      );
    case "slok-krey":
      return (
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M${150 + i * 12} 360 C${140 + i * 14} 220 ${120 + i * 18} 120 ${150 + i * 10} 70`}
              fill="none"
              stroke={i % 2 ? "#8fbf45" : "#5f9a32"}
              strokeWidth="7"
              strokeLinecap="round"
            />
          ))}
          <path d="M168 360 C160 320 200 320 196 360" fill="#f4efe2" stroke="#b7a47a" />
        </g>
      );
    case "trachiak":
      return (
        <g>
          <path d="M40 300 C120 280 200 330 320 270" fill="none" stroke="#6a8f4a" strokeWidth="3" />
          <circle cx="90" cy="292" r="4" fill="#5c4632" />
          <circle cx="210" cy="304" r="4" fill="#5c4632" />
          {[
            [100, 230],
            [190, 200],
            [250, 250],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <path d={`M${x} ${y + 70} L${x} ${y}`} stroke="#6a8f4a" strokeWidth="2" />
              <ellipse cx={x} cy={y} rx="38" ry="28" fill="#3f9a52" stroke={leafDeep} />
              <path d={`M${x - 20} ${y} Q${x} ${y - 16} ${x + 22} ${y + 6}`} fill="none" stroke="#e5f6d8" />
              <circle cx={x} cy={y + 4} r="3" fill="#dcecc4" />
            </g>
          ))}
        </g>
      );
    case "mreah":
      return (
        <g>
          <path d="M70 250 C140 180 200 200 300 120" fill="none" stroke={leafDeep} strokeWidth="3" />
          <path d="M180 190 C140 120 90 140 100 190 C110 230 160 220 180 190 Z" fill={leaf} stroke={leafDeep} />
          <path d="M180 190 C210 110 270 130 260 190 C250 230 200 220 180 190 Z" fill="#3e8a56" stroke={leafDeep} />
          <path d="M180 190 C150 160 150 230 180 230 C210 230 210 160 180 190 Z" fill="#2f6a45" />
          <path d="M250 210 C280 180 290 210 276 214" fill="none" stroke={leafDeep} strokeWidth="1.4" />
          <ellipse cx="196" cy="310" rx="36" ry="58" fill="#7fbf3f" stroke="#3d6b12" />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx={176 + (i % 3) * 16} cy={270 + i * 16} rx="7" ry="5" fill="#9ad24a" />
          ))}
          <circle cx="230" cy="150" r="10" fill="#f2c94c" stroke="#a07a12" />
        </g>
      );
    case "chi-angkam":
      return (
        <g>
          <path d="M180 360 L180 100" stroke="#6d3d86" strokeWidth="4" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <ellipse cx={130} cy={150 + i * 46} rx="40" ry="16" fill="#4d8f46" stroke={leafDeep} transform={`rotate(-24 ${130} ${150 + i * 46})`} />
              <ellipse cx={228} cy={150 + i * 46} rx="40" ry="16" fill="#62a356" stroke={leafDeep} transform={`rotate(24 ${228} ${150 + i * 46})`} />
            </g>
          ))}
          <path d="M180 100 C180 70 180 70 180 60" stroke="#6d3d86" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx="180" cy={70 + i * 8} r="3.2" fill={i % 2 ? "#f4efe8" : "#c9a6d8"} />
          ))}
        </g>
      );
    case "mrech":
      return (
        <g>
          <path d="M80 340 C140 240 160 180 150 90" fill="none" stroke="#5c4632" strokeWidth="4" />
          <path d="M150 150 C90 90 70 150 100 190 C130 214 160 180 150 150 Z" fill="#2f7a3c" stroke={leafDeep} />
          <path d="M150 140 C220 70 280 130 250 190 C220 220 160 180 150 140 Z" fill="#3d9450" stroke={leafDeep} />
          <path d="M150 150 Q120 160 110 190 M150 145 Q200 150 230 188" fill="none" stroke="#e7f3d4" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={210 + (i % 2) * 16} cy={240 + i * 16} r="7" fill={i > 3 ? "#2a241c" : "#6fa03a"} />
          ))}
        </g>
      );
    case "krouch":
      return (
        <g>
          <path d="M180 360 L180 200" stroke="#5c4632" strokeWidth="4" />
          <path d="M180 210 C120 160 90 190 110 230 C130 260 170 240 180 210 Z" fill="#1f7a32" stroke={leafDeep} />
          <path d="M180 188 C230 120 300 150 286 204 C270 246 200 230 180 188 Z" fill="#2e9a48" stroke={leafDeep} />
          <path d="M168 206 H192" stroke="#d8efc4" strokeWidth="2" />
          <circle cx="130" cy="300" r="34" fill="#67a832" stroke="#3e6a14" />
          <circle cx="118" cy="292" r="6" fill="#8fd055" />
          <path d="M150 286 L168 270" stroke="#6b5018" strokeWidth="2" />
        </g>
      );
    case "nhor":
      return (
        <g>
          <path d="M180 360 L180 120" stroke="#6a5034" strokeWidth="6" />
          <ellipse cx="112" cy="180" rx="58" ry="28" fill="#1f7d40" stroke={leafDeep} transform="rotate(-20 112 180)" />
          <ellipse cx="248" cy="168" rx="58" ry="28" fill="#2c9450" stroke={leafDeep} transform="rotate(18 248 168)" />
          <path d="M112 180 L168 196 M248 168 L196 190" stroke="#d9f2c8" />
          <ellipse cx="180" cy="300" rx="48" ry="58" fill="#e7e2c8" stroke="#8d8a6a" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx={156 + (i % 3) * 22} cy={268 + Math.floor(i / 3) * 26} r="8" fill="#f7f4e4" stroke="#b3ad8c" />
          ))}
        </g>
      );
    case "vansuy":
      return (
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const angle = -70 + i * 22;
            return (
              <ellipse
                key={i}
                cx="180"
                cy="250"
                rx="26"
                ry="110"
                fill={i % 2 ? "#7dba6a" : "#5aa356"}
                stroke="#2d6a38"
                transform={`rotate(${angle} 180 300)`}
                opacity="0.95"
              />
            );
          })}
          <ellipse cx="180" cy="300" rx="30" ry="16" fill="#d8efc4" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={150 + i * 18} cy={230 + (i % 2) * 20} r="3" fill="#eef6df" />
          ))}
        </g>
      );
    default:
      return null;
  }
}

function RhizomeFace({
  skin,
  ring,
  flesh,
  core,
  dot,
}: {
  skin: string;
  ring: string;
  flesh: string;
  core: string;
  dot: string;
}) {
  return (
    <g>
      <ellipse cx="180" cy="230" rx="112" ry="76" fill={skin} stroke="#5c4632" strokeWidth="7" />
      <ellipse cx="180" cy="230" rx="90" ry="58" fill={ring} />
      <ellipse cx="180" cy="230" rx="58" ry="36" fill={flesh} />
      <ellipse cx="180" cy="230" rx="18" ry="11" fill={core} />
      {[
        [132, 206],
        [214, 196],
        [228, 248],
        [146, 258],
        [176, 214],
        [198, 252],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill={dot} />
      ))}
    </g>
  );
}

function SectionArt({ plant }: { plant: Plant }) {
  if (plant.id === "romiet") {
    return <RhizomeFace skin="#c46a28" ring="#e07a22" flesh="#ff8a1e" core="#ffd19a" dot="#b45309" />;
  }
  if (plant.id === "khnhei-prey") {
    return <RhizomeFace skin="#c9a15a" ring="#e2b423" flesh="#f6d34a" core="#fff1a8" dot="#b8860b" />;
  }
  if (plant.id === "khnhei") {
    return <RhizomeFace skin="#d7c4a0" ring="#ecd48a" flesh="#f3e2a8" core="#fff8e4" dot="#b08948" />;
  }
  if (plant.id === "romdeng") {
    return <RhizomeFace skin="#f0d2cc" ring="#f7e4dc" flesh="#fff6f2" core="#f8d5df" dot="#c48b9a" />;
  }
  if (plant.id === "vansuy") {
    return (
      <g>
        <ellipse cx="180" cy="230" rx="118" ry="72" fill="#3f8f4a" stroke="#1d4630" strokeWidth="8" />
        <ellipse cx="180" cy="230" rx="102" ry="58" fill="#e1c84a" />
        <ellipse cx="180" cy="230" rx="88" ry="46" fill="#f4fbf2" stroke="#d5e6c8" />
        <path d="M78 206 Q180 226 282 198" fill="none" stroke="#d6b423" strokeWidth="5" />
      </g>
    );
  }
  if (plant.id === "mreah") {
    return (
      <g>
        <ellipse cx="180" cy="228" rx="78" ry="100" fill="#8fbf3f" stroke="#3d6b12" strokeWidth="6" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse key={i} cx={150 + (i % 3) * 28} cy={180 + Math.floor(i / 3) * 50} rx="9" ry="7" fill="#b6de62" stroke="#4e7a18" />
        ))}
        <ellipse cx="180" cy="228" rx="28" ry="46" fill="#f4f7e8" />
        <ellipse cx="172" cy="214" rx="6" ry="10" fill="#f2f2f2" stroke="#888" />
        <ellipse cx="190" cy="242" rx="6" ry="10" fill="#f2f2f2" stroke="#888" />
      </g>
    );
  }
  if (plant.id === "mrech") {
    return (
      <g>
        <circle cx="180" cy="226" r="88" fill="#2a241c" stroke="#5c4632" strokeWidth="8" />
        <path d="M120 190 Q180 230 250 170" fill="none" stroke="#6b5344" strokeWidth="3" />
        <path d="M116 250 Q180 210 246 260" fill="none" stroke="#6b5344" strokeWidth="3" />
        <circle cx="180" cy="226" r="36" fill="#6d6256" />
        <circle cx="180" cy="226" r="8" fill="#d9cbb6" />
      </g>
    );
  }
  if (plant.id === "nhor") {
    return (
      <g>
        <circle cx="180" cy="226" r="90" fill="#efe8cc" stroke="#8d8a6a" strokeWidth="6" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle
            key={i}
            cx={180 + Math.cos((i / 8) * Math.PI * 2) * 48}
            cy={226 + Math.sin((i / 8) * Math.PI * 2) * 48}
            r="16"
            fill="#f7f3e2"
            stroke="#b3ad8c"
          />
        ))}
        <circle cx="180" cy="226" r="18" fill="#f3edd4" stroke="#c8c0a0" />
      </g>
    );
  }
  if (plant.section === "succulent" || plant.section === "fruit" || plant.section === "rhizome") {
    return <RhizomeFace skin="#e6d2a8" ring="#f0e0b8" flesh="#f7edd4" core="#fff" dot="#c4a15a" />;
  }
  return (
    <g>
      <ellipse cx="180" cy="230" rx="122" ry="34" fill="#2f7a40" stroke={leafDeep} strokeWidth="3" />
      <ellipse cx="180" cy="230" rx="122" ry="16" fill="#7fbf68" />
      <rect x="170" y="198" width="20" height="64" rx="3" fill="#e7f0cf" stroke="#7ea36a" />
      <path d="M68 218 H292" stroke="#e7f6d8" strokeWidth="1.1" />
      <path d="M68 242 H292" stroke="#1d4630" strokeWidth="1.1" />
      {[104, 146, 214, 256].map((x) => (
        <ellipse key={x} cx={x} cy="220" rx="8" ry="4" fill="#d8f0a8" stroke="#2f6a34" />
      ))}
    </g>
  );
}

export function HabitPlate({ plant }: { plant: Plant }) {
  return (
    <Frame plant={plant}>
      <Habit plant={plant} />
      <line x1="36" y1="372" x2="96" y2="372" stroke={ink} strokeWidth="1" />
      <line x1="36" y1="368" x2="36" y2="376" stroke={ink} />
      <line x1="96" y1="368" x2="96" y2="376" stroke={ink} />
      <text x="66" y="366" textAnchor="middle" fontSize="9" fill="#6d5b45" fontFamily="Fraunces, serif">
        5 cm
      </text>
    </Frame>
  );
}

export function SectionPlate({ plant, activeId, onSelect }: PlateProps) {
  return (
    <Frame plant={plant}>
      <SectionArt plant={plant} />
      {plant.anatomy.map((mark) => {
        const active = mark.id === activeId;
        const cx = 40 + (mark.x / 100) * 280;
        const cy = 90 + (mark.y / 100) * 250;
        return (
          <g key={mark.id} onClick={() => onSelect(mark.id)} style={{ cursor: "pointer" }}>
            <circle cx={cx} cy={cy} r={active ? 16 : 11} fill={active ? "#8f2d2a" : "#fffaf1"} stroke="#8f2d2a" strokeWidth="1.4" />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill={active ? "#fffaf1" : "#8f2d2a"} fontFamily="Fraunces, serif">
              {plant.anatomy.indexOf(mark) + 1}
            </text>
          </g>
        );
      })}
      <text x="180" y="372" textAnchor="middle" fontSize="11" fill="#6d5b45" fontFamily="Noto Sans Khmer, sans-serif">
        កាត់ផ្តេក · cross section
      </text>
    </Frame>
  );
}
