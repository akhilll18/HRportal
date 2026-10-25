import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import {
  SouthEast as ArrowDownRight,
  NorthEast as ArrowUpRight,
  CalendarMonth as CalendarDays,
  Check,
  AccessTime as Clock3,
  Description as FileText,
  AutoAwesome as Sparkles,
  Groups as UsersRound,
  AccountBalanceWallet as WalletCards,
  EventAvailable,
} from "@mui/icons-material";
import { attendanceDays, holidays } from "../data/peopleHubData.js";
import { theme } from "../theme.js";
import {
  Avatar,
  Button,
  ChevronAction,
  Panel,
  StatCard,
} from "../components/PortalUI.jsx";

const tasks = [
  {
    title: "Complete your profile",
    detail: "Add an emergency contact",
    icon: UsersRound,
    route: "people",
    status: "5 min",
  },
  {
    title: "Review your leave requests",
    detail: "Check the status of time away",
    icon: CalendarDays,
    route: "timeoff",
    status: "View requests",
  },
  {
    title: "Read the updated handbook",
    detail: "People policies · Updated Sep 12",
    icon: FileText,
    route: "documents",
    status: "New",
  },
];

function formatClockTime(value) {
  return value
    ? new Date(value).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
}

export default function OverviewPage({
  onNavigate,
  onAction,
  checkedIn,
  onToggle,
  employeeCount,
  pendingLeaves,
  departmentCount = 0,
  attendanceRecords = [],
}) {
  const hour = new Date().getHours();
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const upcomingHoliday = holidays
    .map((holiday) => ({ ...holiday, dateValue: new Date(`${holiday.date} 12:00:00`) }))
    .filter((holiday) => holiday.dateValue >= new Date())
    .sort((first, second) => first.dateValue - second.dateValue)[0];

  const todayEntries = attendanceRecords.filter(r => {
    const d = new Date(r.timestamp);
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <>
      {/* Welcome banner */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          minHeight: 198,
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          p: { xs: 3, md: "25px 35px" },
          border: "1px solid #244d3d",
          borderRadius: 1.5,
          background:
            "radial-gradient(ellipse at 78% 125%, rgba(113,151,108,0.42) 0, transparent 42%), linear-gradient(112deg, #234d3d 0%, #315f49 57%, #466d50 100%)",
          color: "#fff",
          boxShadow: "0 7px 20px rgba(36,77,61,0.12)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -102,
            right: 115,
            width: 300,
            height: 300,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "50%",
            boxShadow:
              "0 0 0 34px rgba(255,255,255,0.03), 0 0 0 70px rgba(255,255,255,0.03)",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <Box
              sx={{
                width: 22,
                height: 22,
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 1,
                color: "#d6e2c7",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Sparkles sx={{ fontSize: 14 }} />
            </Box>
            <Typography
              sx={{
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "1.1px",
                color: "#c4d7c9",
              }}
            >
              {todayLabel.toUpperCase()}
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: { xs: "1.55rem", md: "1.75rem" },
              lineHeight: 1.1,
              color: "#fff",
              mb: 0.6,
            }}
          >
            {greeting},
            <br />
            {theme.currentUser.shortName}
            <Box component="span" sx={{ color: "#f0a07e" }}>
              .
            </Box>
          </Typography>

          <Typography sx={{ fontSize: "0.7rem", color: "#d4e0d7", mb: 2.5 }}>
            Your workday, your people, all in one place.
          </Typography>

          {/* Today's Entries Chips in Banner */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.2)", borderRadius: 3 },
            }}
          >
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
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                      flexShrink: 0,
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
              <Typography sx={{ fontSize: "0.65rem", color: "#d4e0d7", fontStyle: "italic" }}>
                No entries yet today.
              </Typography>
            )}
          </Box>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={2}
          sx={{
            position: "relative",
            zIndex: 1,
            mt: { xs: 2, sm: 0 },
            ml: { sm: 2.5 },
            pl: { sm: 2.5 },
            pt: { xs: 1.5, sm: 0 },
            borderLeft: { sm: "1px solid rgba(255,255,255,0.24)" },
            borderTop: { xs: "1px solid rgba(255,255,255,0.24)", sm: "none" },
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "grid",
              width: 104,
              height: 104,
              placeItems: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 4,
                border: "1px solid rgba(223,239,226,0.38)",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 13,
                border: "1px dashed rgba(223,239,226,0.32)",
                borderRadius: "50%",
              }}
            />
            <Avatar name={theme.currentUser.name} size="large" />
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 10,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#f0a07e",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 18,
                left: 3,
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#c6dfaa",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                right: 10,
                bottom: 17,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#fff",
              }}
            />
          </Box>

          <Stack alignItems={{ xs: "center", sm: "flex-start" }} spacing={1.2}>
            <Stack direction="row" alignItems="center" spacing={0.8}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: checkedIn ? "#9fd7a7" : "#f1a17c",
                  boxShadow: checkedIn ? "0 0 0 3px rgba(159,215,167,0.17)" : "none",
                }}
              />
              <Typography sx={{ fontSize: "0.6rem", color: "#d6e0d8" }}>
                {checkedIn ? "You're checked in" : "Ready when you are"}
              </Typography>
            </Stack>
            
            {/* THE BUTTONS */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={0.7}>
              <Button 
                variant="light" 
                icon={Clock3} 
                disabled={checkedIn} 
                onClick={onToggle} 
                sx={{ 
                  whiteSpace: "nowrap", 
                  minWidth: "max-content",
                  // When Tap In is active (checkedOut), show green
                  background: !checkedIn ? "#2e7d32" : "transparent",
                  color: !checkedIn ? "#fff" : "rgba(255,255,255,0.4)",
                  "& .MuiSvgIcon-root": { color: !checkedIn ? "#fff" : "rgba(255,255,255,0.4)" },
                  "&:hover": { background: !checkedIn ? "#1b5e20" : "transparent" },
                  "&.Mui-disabled": {
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.4)",
                  }
                }}
              >
                Tap in
              </Button>
              
              <Button 
                variant="light" 
                icon={Check} 
                disabled={!checkedIn} 
                onClick={onToggle} 
                sx={{ 
                  whiteSpace: "nowrap", 
                  minWidth: "max-content",
                  // When Tap Out is active (checkedIn), show red
                  background: checkedIn ? "#d32f2f" : "transparent",
                  color: checkedIn ? "#fff" : "rgba(255,255,255,0.4)",
                  "& .MuiSvgIcon-root": { color: checkedIn ? "#fff" : "rgba(255,255,255,0.4)" },
                  "&:hover": { background: checkedIn ? "#b71c1c" : "transparent" },
                  "&.Mui-disabled": {
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.4)",
                  }
                }}
              >
                Tap out
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Section intro */}
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
        sx={{ mt: 3.5, mb: 1.4 }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "1.15px",
              color: "#89948c",
              mb: 0.4,
            }}
          >
            {todayLabel.split(",")[0].toUpperCase()} SNAPSHOT
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#202922",
            }}
          >
            Your overview
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#64a37a",
              boxShadow: "0 0 0 3px #e7f3e9",
            }}
          />
          <Typography sx={{ fontSize: "0.6rem", color: "#838e86" }}>
            Updated just now
          </Typography>
        </Stack>
      </Stack>

      {/* Stats grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(5, minmax(0, 1fr))",
          },
          gap: 1.5,
        }}
      >
        <StatCard
          label="Team members"
          value={employeeCount}
          note={`Across ${departmentCount || 0} departments`}
          icon={UsersRound}
          tone="green"
          onClick={() => onNavigate("people")}
        />
        <StatCard
          label="Request leave"
          value="8 days"
          note="Available balance"
          icon={CalendarDays}
          tone="orange"
          onClick={() => onNavigate("timeoff")}
        />
        <StatCard
          label="Next payday"
          value="Oct 30"
          note="October payroll"
          icon={WalletCards}
          tone="blue"
          onClick={() => onNavigate("pay")}
        />
        <StatCard
          label="Upcoming holiday"
          value={upcomingHoliday ? upcomingHoliday.dateValue.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "--"}
          note={upcomingHoliday ? upcomingHoliday.name : "No upcoming holidays"}
          icon={EventAvailable}
          tone="blue"
        />
        <StatCard
          label="Open requests"
          value={String(pendingLeaves).padStart(2, "0")}
          note="Leave awaiting review"
          icon={Clock3}
          tone="rose"
          onClick={() => onNavigate("timeoff")}
        />
      </Box>

      {/* Row 1 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
          gap: 1.6,
          mt: 1.6,
        }}
      >
        <Panel
          title="Your week"
          subtitle="Hours worked · Oct 05–09"
          action={
            <Box
              sx={{
                px: 1,
                py: 0.6,
                border: "1px solid #e8ece8",
                borderRadius: 0.6,
                background: "#fff",
                color: "#6d786f",
                fontSize: "0.6rem",
              }}
            >
              This week
            </Box>
          }
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: 2.2, pt: 1.5 }}
          >
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "#2c392f",
              }}
            >
              41.1{" "}
              <Box
                component="span"
                sx={{ fontWeight: 500, fontSize: "0.65rem", color: "#8d978f" }}
              >
                hrs
              </Box>
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.4}>
              <ArrowUpRight sx={{ fontSize: 14, color: "#498060" }} />
              <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#498060" }}>
                3.4%
              </Typography>
              <Typography sx={{ fontSize: "0.6rem", color: "#909a92" }}>
                vs last week
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-around"
            spacing={1}
            sx={{ height: 107, px: 2, pt: 1 }}
          >
            {attendanceDays.map((day, index) => {
              const isHighlighted = index === 4;
              const isFaded = index === 2;
              return (
                <Box
                  key={day.day}
                  sx={{
                    display: "grid",
                    width: 25,
                    height: "100%",
                    gridTemplateRows: "1fr 18px",
                    justifyItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: 15,
                      minHeight: 12,
                      alignSelf: "flex-end",
                      borderRadius: "4px 4px 2px 2px",
                      background: isHighlighted
                        ? "#4b8260"
                        : isFaded
                        ? "#d5e3d7"
                        : "#b7d1bc",
                      height: `${Math.round((day.hours / 9) * 100)}%`,
                      animation: "growUp 0.5s cubic-bezier(.2,.7,.3,1) both",
                      animationDelay: `${index * 60}ms`,
                      "@keyframes growUp": {
                        from: { transform: "scaleY(0.15)", transformOrigin: "bottom" },
                        to: { transform: "scaleY(1)", transformOrigin: "bottom" },
                      },
                    }}
                  >
                    {isHighlighted && (
                      <Typography
                        sx={{
                          position: "absolute",
                          top: -19,
                          left: "50%",
                          transform: "translateX(-50%)",
                          color: "#77827a",
                          fontSize: "0.55rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {day.label}
                      </Typography>
                    )}
                  </Box>
                  <Typography sx={{ fontSize: "0.55rem", color: "#98a19a" }}>
                    {day.day}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Panel>

        <Panel
          title="Coming up"
          subtitle="A few things on your radar"
          action={
            <ChevronAction onClick={() => onNavigate("timeoff")}>
              View requests
            </ChevronAction>
          }
        >
          <Box sx={{ px: 1.5, pb: 0.5 }}>
            {tasks.map((task, i) => {
              const Icon = task.icon;
              return (
                <Box
                  key={task.title}
                  onClick={() => onNavigate(task.route)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.1,
                    py: 1.2,
                    px: 0.2,
                    borderBottom: i < tasks.length - 1 ? "1px solid #f0f2ef" : "none",
                    cursor: "pointer",
                    "&:hover .task-title": { color: "primary.main" },
                    "&:hover .task-arrow": { color: "primary.main" },
                  }}
                >
                  <Box
                    sx={{
                      width: 29,
                      height: 29,
                      borderRadius: 1,
                      background: "#f2f5f1",
                      color: "#64806a",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 16 }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      className="task-title"
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        color: "#39443c",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        transition: "color 0.15s",
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.6rem",
                        color: "#929b94",
                        mt: 0.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {task.detail}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontSize: "0.6rem", color: "#8d978f", whiteSpace: "nowrap" }}
                  >
                    {task.status}
                  </Typography>
                  <ArrowUpRight
                    className="task-arrow"
                    sx={{
                      fontSize: 15,
                      color: "#b2bbb3",
                      flexShrink: 0,
                      transition: "color 0.15s",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Panel>
      </Box>

      {/* Row 2 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.92fr 1.08fr" },
          gap: 1.6,
          mt: 1.6,
        }}
      >
        <Panel title="Quick links" subtitle="The things you do most">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              p: 1.5,
            }}
          >
            {[
              {
                label: "Request time off",
                icon: CalendarDays,
                onClick: () => onAction("leave"),
                bg: "#ebf3ec",
                color: "#4a7a59",
              },
              {
                label: "View pay details",
                icon: WalletCards,
                onClick: () => onNavigate("pay"),
                bg: "#edf3f8",
                color: "#5b84a2",
              },
              {
                label: "Find a teammate",
                icon: UsersRound,
                onClick: () => onNavigate("people"),
                bg: "#fbf0e9",
                color: "#bf7955",
              },
              {
                label: "Contact HR",
                icon: FileText,
                onClick: () => onNavigate("support"),
                bg: "#f7eded",
                color: "#a9686d",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Box
                  key={item.label}
                  onClick={item.onClick}
                  sx={{
                    display: "flex",
                    minHeight: 55,
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                    border: "1px solid #edf0ec",
                    borderRadius: 1,
                    background: "#fff",
                    cursor: "pointer",
                    transition: "border-color 0.15s, background 0.15s",
                    "&:hover": { borderColor: "#c9d8cd", background: "#fbfdfb" },
                  }}
                >
                  <Box
                    sx={{
                      width: 31,
                      height: 31,
                      borderRadius: 1,
                      background: item.bg,
                      color: item.color,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 17 }} />
                  </Box>
                  <Typography
                    sx={{ flex: 1, fontSize: "0.6rem", fontWeight: 600, color: "#4c584f" }}
                  >
                    {item.label}
                  </Typography>
                  <ArrowUpRight sx={{ fontSize: 14, color: "#a3ada5" }} />
                </Box>
              );
            })}
          </Box>
        </Panel>

        <Panel
          title="From the People team"
          subtitle="Company notes for you"
          action={
            <ChevronAction onClick={() => onNavigate("documents")}>
              All updates
            </ChevronAction>
          }
        >
          {[
            {
              day: "12",
              month: "OCT",
              title: "October payroll calendar",
              detail: "Timesheets close Friday, October 23.",
              muted: false,
            },
            {
              day: "09",
              month: "OCT",
              title: "Mid-year check-in is open",
              detail: "Set aside a few minutes to reflect and plan.",
              muted: true,
            },
          ].map((a, i) => (
            <Box
              key={a.title}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                p: "11px 15px",
                borderBottom: i === 0 ? "1px solid #f0f2ef" : "none",
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 39,
                  border: "1px solid #e6ece5",
                  borderRadius: 0.6,
                  background: "#f8faf7",
                  color: a.muted ? "#8c9890" : "#416b4d",
                  display: "grid",
                  alignContent: "center",
                  justifyItems: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{ fontFamily: "Manrope", fontWeight: 700, fontSize: "0.85rem" }}
                >
                  {a.day}
                </Typography>
                <Typography sx={{ fontSize: "0.45rem", fontWeight: 700, mt: 0.1 }}>
                  {a.month}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: "0.65rem", fontWeight: 600 }}>
                  {a.title}
                </Typography>
                <Typography sx={{ fontSize: "0.6rem", color: "#8a948d", mt: 0.4 }}>
                  {a.detail}
                </Typography>
              </Box>
              <ArrowDownRight sx={{ fontSize: 16, color: "#a5aea7", flexShrink: 0 }} />
            </Box>
          ))}
        </Panel>
      </Box>
    </>
  );
}