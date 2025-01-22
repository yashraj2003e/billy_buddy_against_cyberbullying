import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = ({ evidences }) => {
  return (
    <Box sx={{ padding: 4 }} className="bg-teal-100 min-h-[100vh]">
      <div className="flex items-center mb-4">
        <h1 className="text-4xl">Admin Panel - Evidence List</h1>
        <Link
          className="px-4 py-2 bg-yellow-400 rounded-md text-gray-800 ml-auto"
          to="/map"
        >
          Map View
        </Link>
      </div>
      <Grid container spacing={3} justifyContent="center">
        {evidences.map((evidence) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={evidence.id}
            className="min-h-[45rem]"
          >
            <Card sx={{ boxShadow: 3 }}>
              {evidence.image ? (
                <CardMedia
                  component="img"
                  className="h-[32rem]"
                  image={evidence.image}
                  alt={`Image for evidence ${evidence.id}`}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <Box
                  sx={{
                    height: 512,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    No Image Available
                  </Typography>
                </Box>
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  User ID: {evidence.userId}
                </Typography>
                {evidence.location && (
                  <Typography variant="body2" color="textSecondary">
                    Location: {evidence.location}
                  </Typography>
                )}
                {evidence.lat && evidence.lng && (
                  <Typography variant="body2" color="textSecondary">
                    Coordinates: {evidence.lat}, {evidence.lng}
                  </Typography>
                )}
                {evidence.detected && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="text-red-500"
                  >
                    <p className="text-white bg-yellow-500 w-fit p-2">
                      Cyberbullying Detected
                    </p>
                  </Typography>
                )}
                {evidence.link && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="text-red-500"
                  >
                    <p className="">Link : {evidence.link}</p>
                  </Typography>
                )}
                {evidence.link && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    // href={evidence.link}
                    // target="_blank"
                    sx={{ mt: 1 }}
                  >
                    View
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
