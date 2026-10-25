import React, { useState, useMemo } from "react";
import { Box, Typography, Stack, TextField, MenuItem, Card } from "@mui/material";
import { AccessTime as Clock3, CalendarMonth, Check } from "@mui/icons-material";
import { attendanceDays } from "../data/peopleHubData.js";
import { Button, PageHeader, Panel, StatCard } from "../components/PortalUI.jsx";

// Helper to format time exactly like the real portal (e.g. "17:13")
function formatClockTime(value) {
  return value
    ? new Date(value).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
}

// Helper to format date for the card header (e.g. "Thursday 22/10/2026")
function formatFullDate() {
  const today = new Date();
  return today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function AttendancePage({
  checkedIn,
  clockInAt,
  clockOutAt,
  attendanceRecords = [],
  onToggle,
}) {
  const [range, setRange] = useState("This week");

  const days =
    range === "This week"
      ? attendanceDays
      : attendanceDays.map((day, index) => ({
          ...day,
          date: ["Sep 28", "Sep 29", "Sep 30", "Oct 01", "Oct 02"][index],
          hours: [7.8, 8.4, 8.1, 7.5, 8.7][index],
          label: ["7h 48m", "8h 24m", "8h 06m", "7h 30m", "8h 42m"][index],
        }));

  // Filter ONLY today's records once to reuse in totals, chips, and bottom list
  const todayEntries = useMemo(() => {
    return attendanceRecords.filter((r) => {
      const d = new Date(r.timestamp);
      const today = new Date();
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    }).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [attendanceRecords]);

  // Calculate total hours worked today based on today's records
  const totalWorkMs = useMemo(() => {
    let totalMs = 0;
    let lastIn = null;
    for (const record of todayEntries) {
      if (record.type === "Tap in") lastIn = new Date(record.timestamp);
      else if (record.type === "Tap out" && lastIn) {
        totalMs += new Date(record.timestamp) - lastIn;
        lastIn = null;
      }
    }
    // If currently checked in, add time up to now
    if (lastIn && checkedIn) totalMs += new Date() - lastIn;
    return totalMs;
  }, [todayEntries, checkedIn]);

  const totalHours = Math.floor(totalWorkMs / 3600000);
  const totalMins = Math.floor((totalWorkMs % 3600000) / 60000);

  return (
    <>
      <PageHeader
        eyebrow="TIME & ATTENDANCE"
        title="Attendance"
        description="Your hours, your rhythm. Keep track of your work week."
      />

      {/* ── Real-time Top Dashboard Card ── */}
      <Card sx={{ p: 2.5, mb: 2, borderRadius: 2, border: "1px solid #e5eae5" }}>
        {/* Header row: Date, Total Work, Total Break, Action Buttons */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          {/* Left side: Clock & Totals */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#f0f4f0",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Clock3 sx={{ fontSize: 30, color: "#27614e" }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.7rem", color: "#78827b", fontWeight: 500 }}>
                {formatFullDate()}
              </Typography>
              <Stack direction="row" spacing={4} sx={{ mt: 0.5 }}>
                <Box>
                  <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: "#202922" }}>
                    {totalHours}h {totalMins}m
                  </Typography>
                  <Typography sx={{ fontSize: "0.6rem", color: "#5689b3", fontWeight: 600 }}>
                    Total Work Time
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: "#202922" }}>
                    0h 0m
                  </Typography>
                  <Typography sx={{ fontSize: "0.6rem", color: "#5689b3", fontWeight: 600 }}>
                    Total Break Time
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>

          {/* Right side: Tap In / Tap Out Buttons */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Tap In Column */}
            <Stack alignItems="center" spacing={0.5}>
              <Button
                icon={Clock3}
                disabled={checkedIn}
                onClick={onToggle}
                sx={{
                  // ACTIVE GREEN if not checked in
                  background: !checkedIn ? "#2e7d32" : "#f5f5f5",
                  color: !checkedIn ? "#fff" : "#a0a8a2",
                  border: "1px solid transparent",
                  "&:hover": { background: !checkedIn ? "#1b5e20" : "#f5f5f5" },
                  "& .MuiSvgIcon-root": { color: !checkedIn ? "#fff" : "#a0a8a2" },
                  minWidth: 90,
                  fontWeight: 700,
                  boxShadow: "none"
                }}
              >
                Tap In
              </Button>
              <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#27614e" }}>
                {formatClockTime(clockInAt)}
              </Typography>
            </Stack>

            {/* Tap Out Column */}
            <Stack alignItems="center" spacing={0.5}>
              <Button
                icon={Check}
                disabled={!checkedIn}
                onClick={onToggle}
                sx={{
                  // ACTIVE RED if checked in
                  background: checkedIn ? "#d32f2f" : "#f5f5f5",
                  color: checkedIn ? "#fff" : "#a0a8a2",
                  border: "1px solid transparent",
                  "&:hover": { background: checkedIn ? "#b71c1c" : "#f5f5f5" },
                  "& .MuiSvgIcon-component": { color: checkedIn ? "#fff" : "#a0a8a2" },
                  "& .MuiSvgIcon-root": { color: checkedIn ? "#fff" : "#a0a8a2" },
                  minWidth: 90,
                  fontWeight: 700,
                  boxShadow: "none"
                }}
              >
                Tap Out
              </Button>
              <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#27614e" }}>
                {formatClockTime(clockOutAt)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Divider line */}
        <Box sx={{ borderTop: "1px solid #edf0ec", pt: 2 }}>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#4d594f", mb: 1.5 }}>
            Today's Entries
          </Typography>

          {/* Chips Row */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {todayEntries.length > 0 ? (
              todayEntries.map((record) => {
                const isIn = record.type.toLowerCase().includes("in");
                return (
                  <Box
                    key={record.id}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.8,
                      px: 1.2,
                      py: 0.5,
                      borderRadius: 1,
                      background: "#fff",
                      border: `1px solid ${isIn ? "#c8e6c9" : "#ffcdd2"}`,
                      color: isIn ? "#2e7d32" : "#c62828",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: isIn ? "#4caf50" : "#f44336",
                      }}
                    />
                    {formatClockTime(record.timestamp)}
                  </Box>
                );
              })
            ) : (
              <Typography sx={{ fontSize: "0.65rem", color: "#89948c", fontStyle: "italic" }}>
                No entries yet today.
              </Typography>
            )}
          </Stack>
        </Box>
      </Card>

      {/* ── Stats Grid ── */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: 1.5, mb: 2 }}>
        <StatCard label="Today's status" value={checkedIn ? "Working" : "Not started"} note={checkedIn ? `Clocked in at ${formatClockTime(clockInAt)}` : "Your workday has not started"} icon={Clock3} tone="green" />
        <StatCard label="Hours this week" value="41h 06m" note="Target is 40 hours" icon={CalendarMonth} tone="blue" />
        <StatCard label="On-time days" value="18 / 20" note="This month" icon={Check} tone="orange" />
      </Box>

      {/* ── Weekly Chart ── */}
      <Panel
        title="Hours worked"
        subtitle={`${range} · ${range === "This week" ? "Oct 05–09" : "Sep 28–Oct 02"}`}
        action={
          <TextField select size="small" value={range} onChange={(event) => setRange(event.target.value)} sx={{ minWidth: 120, "& .MuiOutlinedInput-root": { fontSize: "0.65rem", borderRadius: 1 }, "& .MuiInputBase-input": { py: 0.8, px: 1 } }}>
            <MenuItem value="This week" sx={{ fontSize: "0.65rem" }}>This week</MenuItem>
            <MenuItem value="Last week" sx={{ fontSize: "0.65rem" }}>Last week</MenuItem>
          </TextField>
        }
        sx={{ mb: 1.6 }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: { xs: 1.2, md: 2.5 }, height: 221, px: { xs: 1.5, md: 6.5 }, pt: 2.5 }}>
          {days.map((day, index) => (
            <Box key={day.day} sx={{ display: "grid", gridTemplateRows: "1fr 18px 15px", justifyItems: "center", minWidth: 0 }}>
              <Box sx={{ position: "relative", display: "flex", width: { xs: "100%", sm: "min(100%, 66px)" }, maxWidth: 66, height: "100%", alignItems: "flex-end", justifyContent: "center", borderBottom: "1px solid #e5ebe5", background: "repeating-linear-gradient(to top, transparent 0, transparent 41px, #f2f4f1 42px)" }}>
                <Box sx={{ width: 30, minHeight: 20, borderRadius: "5px 5px 0 0", background: index === 4 ? "#4b805c" : index === 2 ? "#d2dfd1" : "#a6c3aa", height: `${Math.round((day.hours / 9) * 100)}%`, animation: "growUp .5s ease both", "@keyframes growUp": { from: { transform: "scaleY(.15)", transformOrigin: "bottom" }, to: { transform: "scaleY(1)", transformOrigin: "bottom" } } }} />
                {index === 4 && <Typography sx={{ position: "absolute", top: 3, color: "#8c968e", fontSize: "0.55rem" }}>{day.label}</Typography>}
              </Box>
              <Typography sx={{ pt: 0.5, color: "#69756c", fontSize: "0.6rem", fontWeight: 600 }}>{day.day}</Typography>
              <Typography sx={{ color: "#9ba49d", fontSize: "0.55rem" }}>{day.date}</Typography>
            </Box>
          ))}
        </Box>
      </Panel>

      {/* ── Bottom details ── */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" }, gap: 1.6 }}>
        <Panel title="Today's Tap History" subtitle="All tap records for today">
          {/* Using todayEntries here so it only shows today's records */}
          {todayEntries.length ? (
            <Box sx={{ maxHeight: 340, overflowY: "auto" }}>
              {todayEntries.map((record) => (
                <Stack key={record.id} direction="row" alignItems="center" spacing={1.2} sx={{ px: 2, py: 1.25, borderBottom: "1px solid #f0f2ef" }}>
                  <Box sx={{ width: 22, height: 22, borderRadius: "50%", background: record.type.toLowerCase().includes("in") ? "#eaf3eb" : "#f7eded", display: "grid", placeItems: "center" }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: "50%", background: record.type.toLowerCase().includes("in") ? "#5f9668" : "#c62828" }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#465249" }}>{record.type}</Typography>
                    <Typography sx={{ fontSize: "0.6rem", color: "#89948c", mt: 0.35 }}>
                      {new Date(record.timestamp).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#54665a" }}>{formatClockTime(record.timestamp)}</Typography>
                </Stack>
              ))}
            </Box>
          ) : (
            <Typography sx={{ p: 2, color: "#89948c", fontSize: "0.65rem" }}>Your tap records for today will appear here.</Typography>
          )}
        </Panel>
        <Panel title="Attendance policy" subtitle="A quick reminder">
          <Typography sx={{ p: "15px 15px 8px", color: "#768179", fontSize: "0.65rem", lineHeight: 1.7 }}>Our standard working day is 8 hours, with flexible start times between 8:00 and 10:00 AM. Need to correct a time entry? Reach out to HR support.</Typography>
          <Box component="button" onClick={() => window.dispatchEvent(new CustomEvent("open-support"))} sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 2, pb: 1.8, pt: 0.8, border: 0, background: "transparent", color: "#50745a", fontSize: "0.6rem", fontWeight: 600, cursor: "pointer" }}>Ask HR support ↗</Box>
        </Panel>
      </Box>
    </>
  );
}