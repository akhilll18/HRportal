import React, { useRef, useState } from "react";
import {
  Box,
  MenuItem,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Delete,
  PlayArrow,
  School,
  UploadFile,
  Close as X,
  Image as ImageIcon,
  Movie as MovieIcon,
} from "@mui/icons-material";
import { Button, PageHeader, Panel } from "../components/PortalUI.jsx";

const categories = [
  "Getting started",
  "Tools & systems",
  "Safety & compliance",
  "Role training",
];

export default function LearningPage({ videos, onUpload, onDelete }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [preview, setPreview] = useState(null);

  const fileInput = useRef(null);

  function handleFileChange(event) {
    const picked = event.target.files?.[0] || null;
    setFile(picked);

    if (picked) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result);
      reader.readAsDataURL(picked);
    } else {
      setFilePreview("");
    }
  }

  function submitVideo(event) {
    event.preventDefault();
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      return;
    }

    onUpload(file, {
      title: title.trim(),
      description: description.trim(),
      category,
    });

    setTitle("");
    setDescription("");
    setCategory(categories[0]);
    setFile(null);
    setFilePreview("");
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <>
      <PageHeader
        eyebrow="EMPLOYEE DEVELOPMENT"
        title="Learning"
        description="Training videos and resources to help you grow in your role."
      />

      {/* ── 30% / 70% SIDE-BY-SIDE LAYOUT ── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }, // Stack on small screens, side-by-side on large
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT CONTAINER: 30% Admin Upload */}
        <Box sx={{ width: { xs: "100%", lg: "30%" }, flexShrink: 0 }}>
          <Panel
            title="Admin upload"
            subtitle="Add an image or video to the library"
          >
            <Box
              component="form"
              onSubmit={submitVideo}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
              }}
            >
              <TextField
                label="Title"
                required
                size="small"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                sx={{
                  "& .MuiInputBase-root, & .MuiInputLabel-root": {
                    fontSize: "0.75rem",
                  },
                }}
              />

              <TextField
                select
                label="Category"
                size="small"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                sx={{
                  "& .MuiInputBase-root, & .MuiInputLabel-root": {
                    fontSize: "0.75rem",
                  },
                }}
              >
                {categories.map((item) => (
                  <MenuItem key={item} value={item} sx={{ fontSize: "0.75rem" }}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Description"
                multiline
                minRows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                sx={{
                  "& .MuiInputBase-root, & .MuiInputLabel-root": {
                    fontSize: "0.75rem",
                  },
                }}
              />

              {/* File picker area */}
              <Stack spacing={1.5}>
                <input
                  ref={fileInput}
                  hidden
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
                <Typography
                  sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#4d594f" }}
                >
                  Upload image or video
                </Typography>
                
                {/* Preview Box */}
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    borderRadius: 1,
                    background: "#f0f4f0",
                    border: "1px dashed #c9d5ca",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {filePreview ? (
                    file?.type.startsWith("image/") ? (
                      <Box
                        component="img"
                        src={filePreview}
                        alt="Preview"
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <video
                        src={filePreview}
                        muted
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )
                  ) : (
                    <Stack alignItems="center" spacing={0.5}>
                      <ImageIcon sx={{ color: "#9daf9e", fontSize: 28 }} />
                      <MovieIcon sx={{ color: "#9daf9e", fontSize: 28 }} />
                    </Stack>
                  )}
                </Box>

                <Button
                  variant="secondary"
                  icon={UploadFile}
                  onClick={() => fileInput.current?.click()}
                  sx={{ justifyContent: "flex-start", width: "fit-content" }}
                >
                  {file ? file.name : "Choose a file"}
                </Button>
                
                <Typography
                  sx={{ color: "#89948c", fontSize: "0.6rem" }}
                >
                  JPG, PNG, WebP, MP4, WebM · Up to 2 MB in this demo.
                </Typography>
              </Stack>

              <Button
                type="submit"
                icon={School}
                disabled={!file}
                sx={{ mt: 1 }}
              >
                Upload to library
              </Button>
            </Box>
          </Panel>
        </Box>

        {/* RIGHT CONTAINER: 70% Training Library */}
        <Box sx={{ width: { xs: "100%", lg: "70%" }, flexGrow: 1 }}>
          <Panel
            title="Training library"
            subtitle={`${videos.length} item${videos.length === 1 ? "" : "s"} available`}
            sx={{ height: "100%" }}
          >
            {videos.length ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))", // 2 columns on tablet
                    xl: "repeat(3, minmax(0, 1fr))", // 3 columns on very wide screens
                  },
                  gap: 1.5,
                  p: 1.8,
                }}
              >
                {videos.map((video) => {
                  const isImage = video.type?.startsWith("image/");
                  const isVideo = video.type?.startsWith("video/");
                  return (
                    <Box
                      key={video.id}
                      sx={{
                        overflow: "hidden",
                        border: "1px solid #e7ece7",
                        borderRadius: 1.2,
                        background: "#fff",
                      }}
                    >
                      {/* Media area */}
                      <Box
                        onClick={() => setPreview(video)}
                        sx={{
                          position: "relative",
                          aspectRatio: "16 / 9",
                          background: "#18231c",
                          cursor: "pointer",
                          overflow: "hidden",
                        }}
                      >
                        {isImage ? (
                          <Box
                            component="img"
                            src={video.data}
                            alt={video.title}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : isVideo ? (
                          <video
                            src={video.data}
                            preload="metadata"
                            muted
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "grid",
                              placeItems: "center",
                              background:
                                "linear-gradient(135deg, #234d3d, #315f49)",
                            }}
                          >
                            <PlayArrow sx={{ fontSize: 45, color: "#c6dfaa" }} />
                          </Box>
                        )}

                        {/* Play overlay for videos */}
                        {isVideo && (
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              display: "grid",
                              placeItems: "center",
                              background: "rgba(0,0,0,0.25)",
                              opacity: 0,
                              transition: "opacity .18s",
                              "&:hover": { opacity: 1 },
                            }}
                          >
                            <Box
                              sx={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.9)",
                                display: "grid",
                                placeItems: "center",
                              }}
                            >
                              <PlayArrow
                                sx={{ fontSize: 30, color: "#27614e", ml: 0.3 }}
                              />
                            </Box>
                          </Box>
                        )}

                        {/* Media type badge */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            px: 0.9,
                            py: 0.4,
                            borderRadius: 0.6,
                            background: "rgba(0,0,0,0.55)",
                            color: "#fff",
                            fontSize: "0.55rem",
                            fontWeight: 700,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.4,
                          }}
                        >
                          {isImage ? (
                            <>
                              <ImageIcon sx={{ fontSize: 12 }} /> IMAGE
                            </>
                          ) : isVideo ? (
                            <>
                              <MovieIcon sx={{ fontSize: 12 }} /> VIDEO
                            </>
                          ) : null}
                        </Box>
                      </Box>

                      <Box sx={{ p: 1.5 }}>
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          spacing={1}
                        >
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                color: "#303b33",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                              }}
                            >
                              {video.title}
                            </Typography>
                            <Typography
                              sx={{
                                mt: 0.45,
                                color: "#65806b",
                                fontSize: "0.58rem",
                                fontWeight: 600,
                              }}
                            >
                              {video.category} · Added {video.uploaded}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            aria-label={`Delete ${video.title}`}
                            onClick={() => onDelete(video.id)}
                            sx={{
                              color: "#a54e45",
                              "&:hover": { background: "#f7eded" },
                            }}
                          >
                            <Delete sx={{ fontSize: 17 }} />
                          </IconButton>
                        </Stack>
                        {video.description && (
                          <Typography
                            sx={{
                              mt: 1,
                              color: "#78837b",
                              fontSize: "0.62rem",
                              lineHeight: 1.6,
                            }}
                          >
                            {video.description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  minHeight: 300,
                  placeItems: "center",
                  p: 3,
                  textAlign: "center",
                }}
              >
                <Box>
                  <PlayArrow sx={{ color: "#81a28a", fontSize: 45 }} />
                  <Typography
                    sx={{
                      mt: 1.2,
                      color: "#465249",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}
                  >
                    Your learning library is ready
                  </Typography>
                  <Typography
                    sx={{ mt: 0.8, color: "#89948c", fontSize: "0.65rem" }}
                  >
                    New training media uploaded by your admin will appear here.
                  </Typography>
                </Box>
              </Box>
            )}
          </Panel>
        </Box>
      </Box>

      {/* Full media preview dialog */}
      <MediaPreviewDialog item={preview} onClose={() => setPreview(null)} />
    </>
  );
}

function MediaPreviewDialog({ item, onClose }) {
  if (!item) return null;
  const isImage = item.type?.startsWith("image/");
  const isVideo = item.type?.startsWith("video/");

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        display: "grid",
        placeItems: "center",
        p: 2,
        background: "rgba(15,24,18,0.7)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: "min(900px, 100%)",
          background: "#fff",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 1.5, borderBottom: "1px solid #edf0ec" }}
        >
          <Typography
            sx={{ fontFamily: "Manrope", fontWeight: 700, fontSize: "0.85rem" }}
          >
            {item.title}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <X sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
        <Box sx={{ background: "#000" }}>
          {isImage ? (
            <Box
              component="img"
              src={item.data}
              alt={item.title}
              sx={{
                width: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                display: "block",
              }}
            />
          ) : isVideo ? (
            <Box sx={{ aspectRatio: "16 / 9" }}>
              <video
                src={item.data}
                controls
                autoPlay
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          ) : (
            <Box sx={{ p: 4, textAlign: "center", color: "#fff" }}>
              <Typography sx={{ fontSize: "0.75rem" }}>
                Preview not available.
              </Typography>
            </Box>
          )}
        </Box>
        {item.description && (
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontSize: "0.7rem", color: "#465249" }}>
              {item.description}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}