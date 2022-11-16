import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";

const ReviewList = ({ reviews, address }) => {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        What do students have to say about {address}?
      </Typography>
      {reviews ? (
        <Stack spacing={3}>
          {reviews.map((review) => (
            <Box
              key={review.review_id}
              p={2}
              border="1px solid #Dde6ea"
              borderRadius={2}
            >
              <Typography>{review.comment}</Typography>
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography>No reviews yet.</Typography>
      )}
    </Box>
  );
};

export default ReviewList;
