import config from "./config.mjs"
import express from 'express';
import mongoose from 'mongoose';

const createServer = () => {
  const app = express();
  const PORT = config.port || 6001;
  mongoose
    .connect(config.mongodbUri, {
    })
    .then(async () => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
    return app
};


export default createServer;

