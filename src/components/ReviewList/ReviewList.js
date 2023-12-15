import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [newReview, setNewReview] = useState({
    title: "",
    rating: 1,
    description: "",
  });
  const { movieId } = useParams();

  useEffect(() => {
    // Fetch reviews for a specific movie
    fetch(`https://moviesearch-api.onrender.com/reviews?movieId=${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedReviews = data.reviews || [];
        setReviews(fetchedReviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [movieId]);

  const handleAddReview = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSaveReview = () => {
    // Implement logic to save the new review (send a request to your API)
    console.log("Saving new review:", newReview);
    // Reset the form and close the dialog
    setNewReview({ title: "", rating: 1, description: "" });
    setOpenForm(false);
  };

  return (
    <div>
      <Typography variant="h4" mb={2}>
        Reviews List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddReview}>
        Add Review
      </Button>

      {/* New Review Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Add a New Review</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={newReview.title}
            onChange={(e) =>
              setNewReview({ ...newReview, title: e.target.value })
            }
          />
          <TextField
            label="Rating"
            type="number"
            fullWidth
            margin="normal"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({
                ...newReview,
                rating: parseInt(e.target.value, 10),
              })
            }
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={newReview.description}
            onChange={(e) =>
              setNewReview({ ...newReview, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveReview} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <List>
        {reviews.map((review) => (
          <div key={review._id} style={{}}>
            <ListItem alignItems="flex-start">
              <Avatar
                alt={review.createdBy.username}
                src={`https://www.gravatar.com/avatar/${review.createdBy.email}?s=64`}
              />
              <ListItemText
                primary={review.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`Rating: ${review.rating}`}
                    </Typography>
                    <br />
                    {review.description}
                    <br />
                    {`By: ${review.createdBy.username}`}
                    <br />
                    {`Created At: ${new Date(
                      review.createdAt
                    ).toLocaleString()}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default ReviewList;
