// Arcjet completely disabled for development
export const arcjetProtection = async (req, res, next) => {
  next();
};
