import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const ReviewList = ({ reviews, address }) => {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        What do students have to say about {address}?
      </Typography>
      {reviews ? (
        <Stack spacing={3}>
          {reviews.map((review) => (
            <Stack
              key={review.review_id}
              p={2}
              border="1px solid #Dde6ea"
              borderRadius={2}
              spacing={1}
              position="relative"
            >
              <Stack className="reviews" direction="row" spacing={2}>
                <Box display="flex" alignContent="center">
                  <Typography mr={1}>Cleanliness</Typography>
                  <Rating
                    size="small"
                    readOnly
                    value={review.cleanliness_rating}
                  />
                </Box>
                <Box display="flex" alignContent="center">
                  <Typography mr={1}>Admin Helpfulness</Typography>
                  <Rating
                    size="small"
                    readOnly
                    value={review.admin_helpfulness}
                  />
                </Box>
              </Stack>
              <Typography>"{review.comment}"</Typography>
              <Typography>- Happy Hippo</Typography>
              <IconButton
                color="primary"
                sx={{ position: "absolute", bottom: 4, right: 4 }}
              >
                <ThumbUpIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography>No reviews yet.</Typography>
      )}
    </Box>
  );
};

export default ReviewList;
