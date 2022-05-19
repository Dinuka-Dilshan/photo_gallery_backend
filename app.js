import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

import { createApi } from "unsplash-js"; 
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: process.env.API_KEY,
  fetch: nodeFetch,
});

app.get("/:query/:page", (req, res, next) => {
  const query = req.params.query;
  const page = req.params.page;

  unsplash.search
    .getPhotos({ query, page, perPage: 10 })
    .then((result) => {
      
      const photos = result.response.results.map((photo) => photo.urls.regular);
      res.json({ photos });
    })
    .catch((err) => res.json(err.message));
});

app.listen(process.env.PORT || 5000, (err) => {
  !err ? console.log("Started") : console.log("error");
});
