import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  TextField,
  Paper,
} from "@mui/material";

const GetStarted = () => {
  const [university, setUniversity] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle FastAPI here
    console.log("University:", university);
    console.log("File:", file);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Get started with StudyBuddy
      </Typography>
      <Typography variant="body1" gutterBottom>
        To set up your study plan, select your university and upload the
        relevant documents.
      </Typography>

      <TextField
        select
        fullWidth
        label="Select university"
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        sx={{ mt: 3 }}
      >
        <MenuItem value="Koblenz University">Universität Koblenz</MenuItem>
        <MenuItem value="Mannheim University">Universität Mannheim</MenuItem>
      </TextField>

      <Paper
        variant="outlined"
        sx={{
          mt: 3,
          p: 4,
          borderStyle: "dashed",
          textAlign: "center",
        }}
      >
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="upload-file"
        />
        <label htmlFor="upload-file">
          <Button component="span">Drag and drop or click to upload</Button>
        </label>
      </Paper>

      <Button variant="contained" sx={{ mt: 4 }} onClick={handleSubmit}>
        Continue
      </Button>
    </Box>
  );
};

export default GetStarted;
