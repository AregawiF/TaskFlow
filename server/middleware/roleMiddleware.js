const asyncHandler = require("express-async-handler");

const authorize = (roles) => {
  return asyncHandler(async (req, res, next) => {
    // roles should be an array of allowed roles
    if (roles.includes(req.user.role)) {
      return next();
    }

    res.status(403); // Forbidden
    throw new Error("Not authorized, insufficient role");
  });
};

module.exports = { authorize };
