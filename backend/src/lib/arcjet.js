// Arcjet completely disabled for development
// import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
// import { ENV } from "./env.js";

// Mock Arcjet that allows all requests without any blocking
const aj = {
  protect: async (req, res, next) => {
    if (typeof next === 'function') {
      return next();
    }
    return { decision: { isDenied: false } };
  }
};

export default aj;
