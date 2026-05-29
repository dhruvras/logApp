import serverless from "serverless-http";
import express from "express";
import app from "./src/app.js";

export const handler = async (event, context) => {

  const server = serverless(app);

  return server(event, context);
};



