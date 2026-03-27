import { useState } from "react";
import type { CSSProperties } from "react";

interface DayData {
  day: string;
  label: string;
  val: number;
  today?: boolean;
}

const data: DayData[] = [
  { day: "M", label: "Mon, Mar 20", val: 3 },
  { day: "T", label: "Tue, Mar 21", val: 5 },
  { day: "W", label: "Wed, Mar 22", val: 9 },
  { day: "T", label: "Thu, Mar 23", val: 6 },
  { day: "F", label: "Fri, Mar 24", val: 4 },
  { day: "S", label: "Sat, Mar 25", val: 2 },
  { day: "S", label: "Sun, Mar 26", val: 2, today: true },
];

const MAX_H = 120;
const MAX_VAL = Math.max(...data.map((d) => d.val));
const TOTAL = data.reduce((sum, d) => sum + d.val, 0);
const AVG = (TOTAL / data.length).toFixed(1);
const MOST_ACTIVE = data.reduce((a, b) => (a.val >= b.val ? a : b)).label.split(",")[0];

export default function ActivityThisWeek() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={s.card}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.title}>Activity this week</div>
          <div style={s.subtitle}>Notes edited · Mar 20 – 26</div>
        </div>
        <div style={s.totalBlock}>
          <div style={s.totalNum}>{TOTAL}</div>
          <div style={s.totalLabel}>total edits</div>
        </div>
      </div>

      {/* Bars */}
      <div style={s.barsRow}>
        {data.map((d, i) => {
          const h = Math.round((d.val / MAX_VAL) * MAX_H);
          const isToday = !!d.today;
          const isHovered = hovered === i;

          const barStyle: CSSProperties = {
            ...s.bar,
            height: h,
            background: isToday ? "#d8d6ff" : h > MAX_H * 0.6 ? "#2e2e2e" : "#1e1e1e",
            outline: isToday ? "1px solid rgba(208,207,248,0.3)" : "none",
            opacity: isHovered ? 0.8 : 1,
          };

          const dayLabelStyle: CSSProperties = {
            ...s.dayLabel,
            color: isToday ? "#e0e0e0" : "#444",
          };

          return (
            <div key={i} style={s.col}>
              <div
                style={{ ...s.barWrap, height: MAX_H }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {isHovered && (
                  <div style={s.tooltip}>
                    {d.label} · {d.val} edits
                  </div>
                )}
                <div style={barStyle} />
              </div>
              <span style={dayLabelStyle}>{d.day}</span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={s.footer}>
        <div style={s.stat}>
          <span style={s.statVal}>{AVG}</span>
          <span style={s.statLbl}>avg / day</span>
        </div>
        <div style={{ ...s.stat, textAlign: "center" }}>
          <span style={{ ...s.statVal, color: "#d0cff8" }}>{MOST_ACTIVE}</span>
          <span style={s.statLbl}>most active</span>
        </div>
        <div style={{ ...s.stat, textAlign: "right" }}>
          <span style={s.statVal}>+12%</span>
          <span style={s.statLbl}>vs last week</span>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  card: {
    background: "#141414",
    // borderRadius: 20,
    height: "100%",
    padding: "24px 28px 20px",
    maxWidth: 520,
    width: "100%",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: { fontSize: 17, fontWeight: 600, color: "#f0f0f0" },
  subtitle: { fontSize: 12, color: "#555", marginTop: 2 },
  totalBlock: { textAlign: "right" },
  totalNum: { fontSize: 22, fontWeight: 600, color: "#f0f0f0" },
  totalLabel: { fontSize: 11, color: "#555" },
  barsRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
    margin: "28px 0 12px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  barWrap: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    cursor: "default",
  },
  bar: {
    width: "100%",
    borderRadius: 999,
    transition: "opacity 0.15s",
  },
  tooltip: {
    position: "absolute",
    bottom: "calc(100% + 6px)",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#2a2a2a",
    color: "#f0f0f0",
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 6,
    whiteSpace: "nowrap",
    border: "0.5px solid #333",
    pointerEvents: "none",
    zIndex: 10,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: 500,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "0.5px solid #222",
    paddingTop: 14,
    marginTop: 4,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  statVal: { fontSize: 14, fontWeight: 600, color: "#e0e0e0" },
  statLbl: { fontSize: 11, color: "#555" },
};