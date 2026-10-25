
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Chip,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowForward,
  SupportAgent,
  LockOutlined,
  AlternateEmail,
} from "@mui/icons-material";

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo credentials — replace with your authentication API.
  const DEMO_EMAIL = "akhilreddy@onaspeoplehub.com";
  const DEMO_PASSWORD = "ashok2909";

  const handleDemoFill = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    // Simulate an API call.
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem("peoplehub-auth", "true");
        navigate("/", { replace: true });
      } else {
        setError(
          "Invalid credentials. Use the demo fill button to autofill."
        );
      }

      setLoading(false);
    }, 800);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
        p: 0,
        m: 0,
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <Card
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: "none",
          minHeight: "100vh",
          minHeight: "100dvh",
          m: 0,
          p: 0,
          borderRadius: 0,
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {/* LEFT: IMAGE / BRAND PANEL */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1.1,
              minWidth: 0,
              minHeight: "100%",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              p: { md: 4, lg: 5 },
              color: "white",
              backgroundImage: `radial-gradient(ellipse at 78% 125%, rgba(113,151,108,0.42) 0, transparent 42%), linear-gradient(112deg, #234d3d 0%, #315f49 57%, #466d50 100%)`,
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(18,47,35,0.12) 0%, rgba(20,55,39,0.58) 100%)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: "8%",
                right: "-6%",
                width: 420,
                height: 420,
                borderRadius: "50%",
                border: "1.5px solid rgba(223,239,226,0.2)",
                boxShadow:
                  "0 0 0 50px rgba(255,255,255,0.035), 0 0 0 100px rgba(255,255,255,0.025)",
                pointerEvents: "none",
              },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2, maxWidth: 520 }}>
              <Chip
                icon={
                  <LockOutlined
                    sx={{
                      fontSize: 14,
                      color: "#d6e2c7 !important",
                    }}
                  />
                }
                label="ENTERPRISE PLATFORM"
                sx={{
                  mb: 3,
                  px: 1.5,
                  py: 0.5,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#d4e0d7",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  "& .MuiChip-label": { px: 1 },
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#fff",
                  mb: 2.5,
                  fontSize: { md: "2.8rem", lg: "3.6rem" },
                  textShadow: "0 2px 15px rgba(0,0,0,0.4)",
                }}
              >
             
                <br />
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to right, #dce9d5, #a9c9ad)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Future-Ready  Human Capital Management
                </Box>
                <br />
                Workforces
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.78)",
                  maxWidth: 420,
                  mb: 3,
                  textShadow: "0 1px 8px rgba(0,0,0,0.3)",
                }}
              >
                Unified workforce management, intelligent verification, and
                enterprise-grade career operations.
              </Typography>

              <Divider
                sx={{
                  borderColor: "rgba(255,255,255,0.1)",
                  mb: 2,
                }}
              />

              <Stack direction="row" alignItems="center" spacing={1.2}>
                <SupportAgent sx={{ color: "#c6dfaa", fontSize: 20 }} />
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  PeopleHub · ONAS product workspace
                </Typography>
              </Stack>
            </Box>
          </Box>
        )}

        {/* RIGHT: LOGIN FORM */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, sm: 4, md: 5, lg: 6 },
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#202922",
                  mb: 0.5,
                  fontSize: { xs: "1.8rem", sm: "2.1rem" },
                }}
              >
                Welcome Back
              </Typography>

              <Typography sx={{ color: "#6b6b6b", fontSize: "0.95rem" }}>
                Access to your PeopleHub account
              </Typography>
            </Box>

            {/* Organization Account Sign In */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                backgroundColor: "#f3f7f3",
                border: "1px solid #dce8de",
                borderRadius: 1,
                p: 1.5,
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#355b43",
                  }}
                >
                  Organization Account Sign In
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#718276",
                    mt: 0.3,
                  }}
                >
                  Enter credentials provisioned by Master Admin
                </Typography>
              </Box>

              <Button
                size="small"
                onClick={handleDemoFill}
                sx={{
                  color: "#27614e",
                  borderColor: "#cbdccc",
                  backgroundColor: "#fff",
                  border: "1px solid #cbdccc",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  px: 1.6,
                  py: 0.6,
                  borderRadius: 1,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  "&:hover": {
                    backgroundColor: "#edf4ed",
                    borderColor: "#9eb9a7",
                  },
                }}
              >
                Demo Fill
              </Button>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 2.5,
                  borderRadius: 2,
                  fontSize: "0.8rem",
                  alignItems: "center",
                }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#8a8a8a",
                  mb: 0.8,
                  ml: 0.5,
                }}
              >
                E-MAIL ADDRESS
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error && !email}
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    backgroundColor: "#fff",
                    "& fieldset": { borderColor: "#e0e6e0" },
                    "&:hover fieldset": { borderColor: "#9eb9a7" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4d795a",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.9rem",
                    py: 1.6,
                    px: 1.8,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmail
                          sx={{ color: "#b0b0b0", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#8a8a8a",
                  mb: 0.8,
                  ml: 0.5,
                }}
              >
                PASSWORD
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error && !password}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    backgroundColor: "#fff",
                    "& fieldset": { borderColor: "#e0e6e0" },
                    "&:hover fieldset": { borderColor: "#9eb9a7" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4d795a",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.9rem",
                    py: 1.6,
                    px: 1.8,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined
                          sx={{ color: "#b0b0b0", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                          size="small"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ fontSize: 20 }} />
                          ) : (
                            <Visibility sx={{ fontSize: 20 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  mb: 3,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={keepLoggedIn}
                      onChange={(e) => setKeepLoggedIn(e.target.checked)}
                      size="small"
                      sx={{
                        color: "#c0c0c0",
                        "&.Mui-checked": { color: "#27614e" },
                        p: 0.5,
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: "0.8rem", color: "#5a5a5a" }}
                    >
                      Keep me logged in
                    </Typography>
                  }
                />

                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#27614e",
                    whiteSpace: "nowrap",
                    "&:hover": { color: "#1e493a" },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                endIcon={!loading && <ArrowForward />}
                sx={{
                  py: 1.7,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  background:
                    "linear-gradient(112deg, #315f49 0%, #27614e 100%)",
                  boxShadow: "0 6px 20px rgba(36,77,61,0.18)",
                  "&:hover": {
                    background:
                      "linear-gradient(112deg, #234d3d 0%, #1e493a 100%)",
                    boxShadow: "0 8px 24px rgba(36,77,61,0.22)",
                  },
                  "&:disabled": { opacity: 0.7 },
                }}
              >
                {loading ? "Signing In…" : "Sign In"}
              </Button>
            </form>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "#8a8a8a",
                mt: 3,
              }}
            >
              Having trouble signing in?{" "}
              <Link
                href="#"
                underline="hover"
                sx={{ fontWeight: 600, color: "#27614e" }}
              >
                Contact support
              </Link>
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: "0.7rem",
                color: "#b0b0b0",
                mt: 2,
              }}
            >
              Demo credentials: akhilreddy@onaspeoplehub.com / ashok2909
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
