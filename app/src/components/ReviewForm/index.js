import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ user, building_id }) => {
  const [cleanliness, setCleanliness] = useState(0);
  const [adminHelpfulness, setAdminHelpfulness] = useState(0);
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (err) {
      toast.error(err);
    }
  }, [err]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/review/create", {
      cleanliness,
      adminHelpfulness,
      comment,
      building_id,
      reviewHelpfulness: 0,
    });
    setAdminHelpfulness(0);
    setCleanliness(0);
    setComment("");

    if (res.data.success) {
      navigate(0);
      toast.success("Added Review!");
    } else {
      setErr(res.data.message);
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      border="1px solid #Dde6ea"
      p={2}
      borderRadius={2}
    >
      <Toaster />
      <Typography mb={2} variant="h5">
        Leave a Review
      </Typography>
      {user ? (
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Typography>Cleanliness</Typography>
            <Rating
              precision={0.5}
              value={cleanliness}
              onChange={(e) => setCleanliness(e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>Admin Helpfulness</Typography>
            <Rating
              precision={0.5}
              value={adminHelpfulness}
              onChange={(e) => setAdminHelpfulness(e.target.value)}
            />
          </Stack>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add any comments about this property..."
          />
          <Button
            sx={{ display: "inline-block" }}
            type="submit"
            variant="contained"
          >
            Add Review
          </Button>
        </Stack>
      ) : (
        <Typography mt={2}>
          Please <Link to="/login">Login</Link> or{" "}
          <Link to="/register">Sign Up</Link> to leave a review.
        </Typography>
      )}
    </Box>
  );
};

export default ReviewForm;
