import React from "react";
import { Box, Stack, Typography, Grid, Card, CardActionArea, Divider } from "@mui/material";
import { AccountTree, PersonAddAlt, Groups, Star } from "@mui/icons-material";
import { Avatar, Button, PageHeader } from "../components/PortalUI.jsx";

export default function OrganizationPage({ people, departments: departmentOptions = [], onAction }) {
  // Group people by department
  const teams = people.reduce((groups, person) => {
    const name = person.department || "Other";
    groups[name] = [...(groups[name] || []), person];
    return groups;
  }, {});

  const departments = [...new Set([...departmentOptions, ...Object.keys(teams)])]
    .map((name) => [name, teams[name] || []]);

  // Animation keyframes for the moving lines
  const lineAnimation = {
    background: "linear-gradient(90deg, #c8d9cb 0%, #5d9068 45%, #c8d9cb 100%)",
    backgroundSize: "200% 100%",
    animation: "railFlow 2.5s linear infinite",
    "@keyframes railFlow": { to: { backgroundPosition: "-200% 0" } }
  };

  const verticalLineAnimation = {
    background: "linear-gradient(#75a17d 0 50%, transparent 50%)",
    backgroundSize: "2px 10px",
    animation: "lineFlow 0.8s linear infinite",
    "@keyframes lineFlow": { to: { backgroundPosition: "0 10px" } }
  };

  return (
    <>
      <PageHeader
        eyebrow="PEOPLE & REPORTING LINES"
        title="Organization chart"
        description="Explore teams, managers and reporting groups."
        action={
          <Button icon={PersonAddAlt} onClick={() => onAction("employee")}>
            Onboard employee
          </Button>
        }
      />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pb: 6, pt: 2, overflowX: "auto" }}>
        
        {/* ── TOP LEVEL: LEADERSHIP ── */}
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            py: 1.5,
            border: "2px solid #4b8060",
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(38,78,54,0.12)",
            position: "relative",
            zIndex: 2,
            background: "#fff",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#eaf2ed",
              display: "grid",
              placeItems: "center",
            }}
          >
            <AccountTree sx={{ color: "#27614e", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "1rem", color: "#202922" }}>
              Leadership Team
            </Typography>
            <Typography sx={{ mt: 0.2, fontSize: "0.65rem", color: "#78827b", fontWeight: 500 }}>
              {people.length} employees · {departments.length} departments
            </Typography>
          </Box>
        </Card>

        {/* Vertical moving connector line from Leadership */}
        <Box
          sx={{
            width: 2,
            height: 40,
            ...verticalLineAnimation,
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Horizontal moving connector line (Desktop) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            height: 2,
            width: "80%",
            maxWidth: 1000,
            mb: 0,
            ...lineAnimation
          }}
        />

        {/* ── DEPARTMENT GRID ── */}
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: 1200,
            mt: 0,
            pt: { xs: 2, md: 0 },
          }}
        >
          {departments.map(([department, members]) => {
            const lead = members.find((p) => /\b(lead|manager|director|head)\b/i.test(p.role)) || members[0];
            const otherMembers = members.filter((p) => p.id !== lead?.id);

            return (
              <Grid item xs={12} sm={6} md={4} key={department}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  
                  {/* Vertical moving line connecting to department card */}
                  <Box
                    sx={{
                      width: 2,
                      height: 24,
                      display: { xs: "none", md: "block" },
                      ...verticalLineAnimation
                    }}
                  />

                  {/* Department Card */}
                  <Card sx={{ width: "100%", borderRadius: 2, overflow: "hidden", border: "1px solid #e5eae5" }}>
                    
                    {/* Department Header */}
                    <Box sx={{ background: "#fbfcfa", px: 2, py: 1.2, borderBottom: "1px solid #edf0ec" }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Groups sx={{ fontSize: 18, color: "#4b8060" }} />
                        <Typography sx={{ fontWeight: 700, fontSize: "0.75rem", color: "#303b33" }}>
                          {department}
                        </Typography>
                        <Box sx={{ ml: "auto", background: "#eaf2ed", px: 1, py: 0.2, borderRadius: 1 }}>
                          <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#27614e" }}>
                            {members.length}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    {/* Lead / Manager Section */}
                    {lead && (
                      <Box sx={{ p: 1.5 }}>
                        <Typography sx={{ fontSize: "0.55rem", fontWeight: 700, color: "#89948c", textTransform: "uppercase", mb: 1, letterSpacing: "0.5px" }}>
                          Team Lead
                        </Typography>
                        <CardActionArea
                          onClick={() => onAction("person", lead)}
                          sx={{ borderRadius: 1, p: 1, border: "1px solid #e5eae5", background: "#fff" }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Avatar name={lead.name} />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: "0.7rem", color: "#202922", noWrap: true }}>
                                {lead.name}
                              </Typography>
                              <Typography sx={{ fontSize: "0.6rem", color: "#4b8060", fontWeight: 500, noWrap: true }}>
                                {lead.role}
                              </Typography>
                            </Box>
                            <Star sx={{ fontSize: 16, color: "#d4a373" }} />
                          </Stack>
                        </CardActionArea>
                      </Box>
                    )}

                    {/* Other Members Section */}
                    {otherMembers.length > 0 && (
                      <>
                        <Divider />
                        <Box sx={{ px: 1.5, py: 1.2 }}>
                          <Typography sx={{ fontSize: "0.55rem", fontWeight: 700, color: "#89948c", textTransform: "uppercase", mb: 0.8, letterSpacing: "0.5px" }}>
                            Members
                          </Typography>
                          <Stack spacing={0.5}>
                            {otherMembers.map((person) => (
                              <Box
                                key={person.id}
                                onClick={() => onAction("person", person)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  p: 0.8,
                                  borderRadius: 1,
                                  cursor: "pointer",
                                  transition: "background 0.15s",
                                  "&:hover": { background: "#f5f8f4" },
                                }}
                              >
                                <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: "#9eb9a7", flexShrink: 0 }} />
                                <Typography sx={{ flex: 1, fontSize: "0.65rem", fontWeight: 500, color: "#465249", noWrap: true }}>
                                  {person.name}
                                </Typography>
                                <Typography sx={{ fontSize: "0.6rem", color: "#89948c", noWrap: true }}>
                                  {person.role}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </>
                    )}
                    
                    {/* Empty State fallback if no members */}
                    {members.length === 0 && (
                      <Box sx={{ p: 3, textAlign: "center" }}>
                        <Typography sx={{ fontSize: "0.65rem", color: "#89948c" }}>
                          No team members yet.
                        </Typography>
                      </Box>
                    )}
                  </Card>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}