import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Close as X } from "@mui/icons-material";
import { Button } from "./PortalUI.jsx";
import { theme } from "../theme.js";

const NEW_DEPARTMENT = "__new_department__";
const EMPTY_DEPARTMENTS = [];

const configs = {
  employee: {
    title: "Add a teammate",
    description: "Create a people directory entry.",
    submit: "Add teammate",
    fields: [
      { name: "name", label: "Full name", required: true },
      { name: "email", label: "Work email", type: "email", required: true },
      {
        name: "department",
        label: "Department",
        type: "select",
        required: true,
      },
      { name: "role", label: "Job title", required: true },
      { name: "joined", label: "Date of joining", type: "date", required: true },
      {
        name: "employmentType",
        label: "Employment type",
        type: "select",
        options: ["Full-time", "Part-time", "Intern"],
      },
    ],
  },
  leave: {
    title: "Request leave",
    description: "Your manager will be notified when you submit.",
    submit: "Send request",
    fields: [
      {
        name: "type",
        label: "Leave type",
        type: "select",
        options: ["Casual leave", "Sick leave", "Annual leave", "Unpaid leave"],
      },
      { name: "start", label: "Start date", type: "date", required: true },
      { name: "end", label: "End date", type: "date", required: true },
      { name: "note", label: "Reason for your leave", type: "textarea", required: true },
    ],
  },
  ticket: {
    title: "Contact HR support",
    description: "Tell the People team what you need help with.",
    submit: "Create ticket",
    fields: [
      { name: "subject", label: "What do you need help with?", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Payroll", "Time off", "Personal details", "Benefits", "Other"],
      },
      { name: "description", label: "Details", type: "textarea", required: true },
    ],
  },
  "cancel-leave": {
    title: "Cancel leave request",
    description: "This request will be marked as cancelled.",
    submit: "Confirm cancellation",
    fields: [],
  },
};

export default function PortalDialog({ dialog, onClose, onSubmit, departments = EMPTY_DEPARTMENTS, onDeleteEmployee }) {
  const [values, setValues] = useState({});

  // Reset values whenever a new dialog opens
  useEffect(() => {
    if (dialog && configs[dialog.type]) {
      const init = {};
      configs[dialog.type].fields.forEach((f) => {
        init[f.name] =
          f.name === "type" && dialog.data?.type
            ? dialog.data.type
            : f.type === "select"
              ? (f.name === "department" ? departments[0] || "" : f.options[0])
              : f.name === "joined"
                ? new Date().toISOString().slice(0, 10)
                : "";
      });
      setValues(init);
    }
  }, [dialog, departments]);

  if (!dialog) return null;

  // ── Profile / person view ────────────────────────────────
  if (dialog.type === "profile" || dialog.type === "person") {
    // If it's the "profile" tab, show current user. If it's a specific "person", show their data.
    const person =
      dialog.type === "person" && dialog.data
        ? dialog.data
        : {
            ...theme.currentUser,
            id: theme.currentUser.employeeId,
            status: "Active",
          };

    const initials = person.name
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();

    return (
      <Dialog
        open
        onClose={onClose}
        PaperProps={{ sx: { width: 460, maxWidth: "100%", borderRadius: 1.5 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            p: 2.5,
            pb: 1.8,
            borderBottom: "1px solid #edf0ec",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#2c382f",
              }}
            >
              {dialog.type === "profile" ? "Your profile" : person.name}
            </Typography>
            <Typography sx={{ mt: 0.5, color: "#879188", fontSize: "0.65rem" }}>
              People directory details.
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <X sx={{ fontSize: 18 }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 2.5 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ pb: 2, borderBottom: "1px solid #edf0ec" }}
          >
            <Box
              sx={{
                width: 43,
                height: 43,
                borderRadius: "50%",
                background: "#eaf2ec",
                color: "#3c7155",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            >
              {initials}
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#344037" }}>
                {person.name}
              </Typography>
              <Typography sx={{ fontSize: "0.65rem", color: "#838e86", mt: 0.4 }}>
                {person.role}
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "105px 1fr",
              gap: "12px 10px",
              pt: 2,
              pb: 1.5,
            }}
          >
            <Typography sx={{ fontSize: "0.65rem", color: "#89948c" }}>
              Work email
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#465249", fontWeight: 600 }}>
              {person.email}
            </Typography>

            <Typography sx={{ fontSize: "0.65rem", color: "#89948c" }}>
              Employee ID
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#465249", fontWeight: 600 }}>
              {person.id}
            </Typography>

            <Typography sx={{ fontSize: "0.65rem", color: "#89948c" }}>
              Department
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#465249", fontWeight: 600 }}>
              {person.department}
            </Typography>

            <Typography sx={{ fontSize: "0.65rem", color: "#89948c" }}>Date of joining</Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#465249", fontWeight: 600 }}>
              {person.joined || "Not provided"}
            </Typography>

            <Typography sx={{ fontSize: "0.65rem", color: "#89948c" }}>Employment type</Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#465249", fontWeight: 600 }}>
              {person.employmentType || "Full-time"}
            </Typography>

            <Typography sx={{ fontSize: "0.65rem", color: "#89948c" }}>Status</Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#465249", fontWeight: 600 }}>
              {person.status || "Active"}
            </Typography>
          </Box>

          <Typography sx={{ mt: 0.5, color: "#959e97", fontSize: "0.6rem" }}>
            Profile information is sample data for this local demo.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: "0 20px 16px" }}>
          {dialog.type === "person" && (
            <Button variant="secondary" onClick={() => onDeleteEmployee(person)} sx={{ mr: "auto", color: "#a54e45", borderColor: "#efd8d4" }}>
              Delete employee
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (dialog.type === "delete-employee") {
    return (
      <Dialog open onClose={onClose} PaperProps={{ sx: { width: 420, maxWidth: "100%", borderRadius: 1.5 } }}>
        <DialogTitle sx={{ fontFamily: "Manrope", fontWeight: 700, fontSize: "0.95rem", color: "#2c382f" }}>
          Delete employee?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#78837b", fontSize: "0.7rem" }}>
            This will permanently remove {dialog.data?.name} from the employee directory and organization chart.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: "0 20px 16px" }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit("delete-employee")} sx={{ background: "#a54e45", "&:hover": { background: "#873d36" } }}>Delete employee</Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (dialog.type === "leave-detail") {
    const leave = dialog.data;
    return (
      <Dialog open onClose={onClose} PaperProps={{ sx: { width: 460, maxWidth: "100%", borderRadius: 1.5 } }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", p: 2.5, pb: 1.8, borderBottom: "1px solid #edf0ec" }}>
          <Box>
            <Typography sx={{ fontFamily: "Manrope", fontWeight: 700, fontSize: "0.95rem", color: "#2c382f" }}>{leave?.type || "Leave request"}</Typography>
            <Typography sx={{ mt: 0.5, color: "#879188", fontSize: "0.65rem" }}>Request {leave?.id}</Typography>
          </Box>
          <IconButton onClick={onClose} size="small"><X sx={{ fontSize: 18 }} /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 2.5 }}>
          <Stack spacing={1.5}>
            {[["Dates", `${leave?.start}${leave?.start !== leave?.end ? ` – ${leave?.end}` : ""}`], ["Duration", `${leave?.days} ${leave?.days === 1 ? "day" : "days"}`], ["Status", leave?.status], ["Requested", leave?.requested], ["Reason", leave?.note || "No reason provided."]].map(([label, value]) => (
              <Box key={label} sx={{ display: "grid", gridTemplateColumns: "95px 1fr", gap: 1 }}>
                <Typography sx={{ color: "#89948c", fontSize: "0.65rem" }}>{label}</Typography>
                <Typography sx={{ color: "#465249", fontSize: "0.68rem", whiteSpace: label === "Reason" ? "pre-wrap" : "normal" }}>{value}</Typography>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "0 20px 16px" }}><Button variant="secondary" onClick={onClose}>Close</Button></DialogActions>
      </Dialog>
    );
  }

  // ── Form dialog (employee / leave / ticket) ─
  const config = configs[dialog.type];
  if (!config) return null;

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(dialog.type, values);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 460,
          maxWidth: "100%",
          borderRadius: 1.5,
          border: "1px solid #e3e8e2",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          p: 2.5,
          pb: 1.8,
          borderBottom: "1px solid #edf0ec",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#2c382f",
            }}
          >
            {config.title}
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#879188", fontSize: "0.65rem" }}>
            {config.description}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 2.5 }}>
          <Stack spacing={1.6}>
            {dialog.type === "cancel-leave" && (
              <Box sx={{ p: 1.4, border: "1px solid #edf0ec", borderRadius: 1, background: "#fbfcfa" }}>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#354138" }}>
                  {dialog.data?.type} · {dialog.data?.days} {dialog.data?.days === 1 ? "day" : "days"}
                </Typography>
                <Typography sx={{ mt: 0.5, fontSize: "0.65rem", color: "#78837b" }}>
                  {dialog.data?.start}{dialog.data?.start !== dialog.data?.end ? ` – ${dialog.data?.end}` : ""}
                </Typography>
              </Box>
            )}
            {config.fields.map((field) => (
              <Box key={field.name}>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "#4d594f",
                    mb: 0.6,
                  }}
                >
                  {field.label}
                  {field.required && (
                    <Box component="span" sx={{ color: "#c66f54" }}>
                      {" "}
                      *
                    </Box>
                  )}
                </Typography>

                {field.type === "select" ? (
                  <>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      required={field.required}
                      value={values[field.name] || ""}
                      onChange={(e) => setField(field.name, e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: "0.7rem",
                          borderRadius: 1,
                          "& fieldset": { borderColor: "#e0e6e0" },
                          "&:hover fieldset": { borderColor: "#9eb9a7" },
                          "&.Mui-focused fieldset": { borderColor: "#9eb9a7" },
                        },
                        "& .MuiInputBase-input": { py: 1, px: 1.2 },
                      }}
                    >
                      {(field.name === "department" ? departments : field.options).map((opt) => (
                        <MenuItem key={opt} value={opt} sx={{ fontSize: "0.7rem" }}>
                          {opt}
                        </MenuItem>
                      ))}
                      {field.name === "department" && (
                        <MenuItem value={NEW_DEPARTMENT} sx={{ fontSize: "0.7rem", color: "#47765a", fontWeight: 700 }}>
                          Add new department...
                        </MenuItem>
                      )}
                    </TextField>
                    {field.name === "department" && values.department === NEW_DEPARTMENT && (
                      <TextField
                        fullWidth
                        size="small"
                        label="New department name"
                        required
                        value={values.newDepartment || ""}
                        onChange={(event) => setField("newDepartment", event.target.value)}
                        sx={{ mt: 1, "& .MuiInputBase-root, & .MuiInputLabel-root": { fontSize: "0.7rem" } }}
                      />
                    )}
                  </>
                ) : field.type === "textarea" ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={(e) => setField(field.name, e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: "0.7rem",
                        borderRadius: 1,
                        "& fieldset": { borderColor: "#e0e6e0" },
                        "&:hover fieldset": { borderColor: "#9eb9a7" },
                        "&.Mui-focused fieldset": { borderColor: "#9eb9a7" },
                      },
                      "& .MuiInputBase-input": { py: 1, px: 1.2 },
                    }}
                  />
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    type={field.type || "text"}
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={(e) => setField(field.name, e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: "0.7rem",
                        borderRadius: 1,
                        "& fieldset": { borderColor: "#e0e6e0" },
                        "&:hover fieldset": { borderColor: "#9eb9a7" },
                        "&.Mui-focused fieldset": { borderColor: "#9eb9a7" },
                      },
                      "& .MuiInputBase-input": { py: 1, px: 1.2 },
                    }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "flex-end",
            gap: 1,
            p: "13px 20px 17px",
            borderTop: "1px solid #edf0ec",
          }}
        >
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{config.submit}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}