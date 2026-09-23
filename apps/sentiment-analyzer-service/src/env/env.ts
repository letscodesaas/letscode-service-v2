import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const _ENV = {
  MODE: process.env.MODE
    ? process.env.MODE
    : (() => {
        throw new Error("MODE is required");
      })(),

  PORT: process.env.PORT
    ? process.env.PORT
    : (() => {
        throw new Error("PORT is required");
      })(),

  SENTIMENT_MODEL: process.env.SENTIMENT_MODEL
    ? process.env.SENTIMENT_MODEL
    : (() => {
        throw new Error("SENTIMENT_MODEL is required");
      })(),
  EMBEDDING_MODEL: process.env.EMBEDDING_MODEL
    ? process.env.EMBEDDING_MODEL
    : (() => {
        throw new Error("EMBEDDING_MODEL is required");
      })(),
  TOKEN: process.env.TOKEN
    ? process.env.TOKEN
    : (() => {
        throw new Error("TOKEN is required");
      })(),
};

export const ENV = Object.freeze(_ENV);
