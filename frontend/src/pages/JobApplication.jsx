import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

function JobApplication() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log("Submitted job interest:", text);
    // Optional: POST request an dein FastAPI-Backend
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job-Application.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Tell us what you are looking for.
      </Typography>
      <TextField
        label="Your job preferences"
        multiline
        rows={4}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        margin="normal"
      />
      <Box sx={{ textAlign: "right" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default JobApplication;
