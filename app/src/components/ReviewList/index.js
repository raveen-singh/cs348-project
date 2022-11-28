import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReviewCard from "../ReviewCard";

const ReviewList = ({ reviews, address, names }) => {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        What do students have to say about {address}?
      </Typography>
      {reviews.length > 0 ? (
        <Stack spacing={3}>
          {reviews.map((review, index) => (
            <ReviewCard key={review.review_id} review={review} name={names[index]} />
          ))}
        </Stack>
      ) : (
        <Typography>No reviews yet. Be the first!</Typography>
      )}
    </Box>
  );
};

export default ReviewList;
