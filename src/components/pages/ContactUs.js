import React, { useState } from "react";
import { Container, Typography, Paper, Box, Button, TextField } from "@mui/material";
import { Youtube, X, Facebook, Instagram } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataJSON = JSON.stringify(formData);

    fetch("/submitContactUsQuerries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJSON,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not OK");
        }
      })
      .then((data) => {
        console.log("Form data sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>

      <Paper elevation={3} mt={3} style={{ backgroundColor: "#100f12", color: "white", padding: "16px", borderRadius: "15px" }}>
        <Typography variant="body1">
          Have a question or feedback for us? We'd love to hear from you!
        </Typography>
        <Typography variant="body1" mt={2}>
          You can reach out to us through the following methods:
        </Typography>
        <Typography variant="body1" mt={2}>
          Email: contact@example.com
        </Typography>
        <Typography variant="body1" mt={2}>
          Phone: +1 (123) 456-7890
        </Typography>
        <Typography variant="body1" mt={2}>
          Address: 123 Movie Street, Cinematown, Movieville
        </Typography>
      </Paper>

      <Box mt={3} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "8px" }}
          />
          <TextField
            label="Your Email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "8px" }}
          />
          <TextField
            label="Your Message"
            fullWidth
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleFormChange}
            style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "8px" }}
          />
          <Button type="submit" variant="contained" color="primary" mt={2}>
            Send Message
          </Button>
        </form>

        {/* Centered Icons */}
        <Box mt={2} style={{ display: "flex", justifyContent: "center" }}>
          {/* YouTube Icon */}
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <Youtube size={32} style={{ color: "red", margin: "5px", cursor: "pointer" }} />
          </a>

          {/* X Icon */}
          <a href="https://X.com/" target="_blank" rel="noopener noreferrer">
            <X size={32} style={{ color: "skyblue", margin: "5px", cursor: "pointer" }} />
          </a>

          {/* Facebook Icon */}
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <Facebook size={32} style={{ color: "blue", margin: "5px", cursor: "pointer" }} />
          </a>

          {/* Instagram Icon */}
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <Instagram size={32} style={{ color: "purple", margin: "5px", cursor: "pointer" }} />
          </a>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactUs;
