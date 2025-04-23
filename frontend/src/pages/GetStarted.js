import React from "react";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  TextField,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";

const GetStarted = () => {
  const formik = useFormik({
    initialValues: {
      university: "",
      files: [],
    },
    onSubmit: (values) => {
      console.log("Submitted:", values);
    },
  });

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.currentTarget.files);
    formik.setFieldValue("files", [...formik.values.files, ...selectedFiles]);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...formik.values.files];
    newFiles.splice(index, 1);
    formik.setFieldValue("files", newFiles);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Get started with StudyBuddy
      </Typography>
      <Typography variant="body1" gutterBottom>
        To set up your study plan, select your university and upload the
        relevant documents.
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          select
          fullWidth
          label="Select university"
          name="university"
          value={formik.values.university}
          onChange={formik.handleChange}
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
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="upload-file"
          />
          <label htmlFor="upload-file">
            <Button component="span">Drag and drop or click to upload</Button>
          </label>
        </Paper>

        {/* File list */}
        <List dense sx={{ mt: 2 }}>
          {formik.values.files.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleFileRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Button variant="contained" sx={{ mt: 4 }} type="submit">
          Continue
        </Button>
      </form>
    </Box>
  );
};

export default GetStarted;
