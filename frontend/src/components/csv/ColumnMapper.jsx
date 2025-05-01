import React from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  Paper,
  Grid,
} from "@mui/material";

const internalFields = [
  "First Name", "Last Name", "Job Title", "Company", "Company URL/Domain",
  "Email", "Mobile Phone", "Office Phone", "LinkedIn URL",
  "Country", "State", "City", "Company HQ Location"
];

const ColumnMapper = ({ headers, onConfirm }) => {
  const [mappings, setMappings] = React.useState({});

  const handleChange = (csvHeader, mappedField) => {
    setMappings((prev) => ({ ...prev, [csvHeader]: mappedField }));
  };

  const handleConfirm = () => {
    onConfirm(mappings);
  };

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        🗂️ Map CSV Columns to Contact Fields
      </Typography>

      <Grid container spacing={2}>
        {headers.map((header, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Typography sx={{ mb: 1 }}>{header}</Typography>
            <Select
              fullWidth
              value={mappings[header] || ""}
              onChange={(e) => handleChange(header, e.target.value)}
              displayEmpty
            >
              <MenuItem value="">— Skip this column —</MenuItem>
              {internalFields.map((field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          disabled={Object.keys(mappings).length === 0}
          onClick={handleConfirm}
        >
          Confirm Mapping
        </Button>
      </Box>
    </Paper>
  );
};

export default ColumnMapper;
