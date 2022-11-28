import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const ReviewCard = ({ review, name }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.review_helpfulness);
  const { user } = useAuth();

  const handleLike = async () => {
    const { data } = await axios.put(
      `/api/reviews/update?id=${review.review_id}&like=yes`
    );
    if (data.success) {
      setLikeCount(data.review_helpfulness);
      setLiked(true);
    }
  };

  const handleDislike = async () => {
    const { data } = await axios.put(
      `/api/reviews/update?id=${review.review_id}&like=no`
    );
    if (data.success) {
      setLikeCount(data.review_helpfulness);
      setLiked(false);
    }
  };
  return (
    <Stack
      key={review.review_id}
      p={2}
      border="2px solid #Dde6ea"
      borderRadius={2}
      spacing={1}
      position="relative"
    >
      <Stack className="reviews" direction="row" spacing={2} mb={1}>
        <Box display="flex" alignContent="center">
          <Typography mr={1}>Cleanliness</Typography>
          <Rating size="small" readOnly value={review.cleanliness_rating} />
        </Box>
        <Box display="flex" alignContent="center">
          <Typography mr={1}>Admin Helpfulness</Typography>
          <Rating
            size="small"
            readOnly
            value={review.admin_helpfulness_rating}
          />
        </Box>
      </Stack>
      <Typography>"{review.comment}"</Typography>
      <Typography>— {name}</Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{ position: "absolute", bottom: 4, right: 10 }}
      >
        <IconButton
          color={liked ? "primary" : undefined}
          disabled={!user}
          sx={{ mr: "2px" }}
          onClick={liked ? handleDislike : handleLike}
        >
          <ThumbUpIcon />
        </IconButton>
        <Typography>{likeCount}</Typography>
      </Box>
    </Stack>
  );
};

export default ReviewCard;
