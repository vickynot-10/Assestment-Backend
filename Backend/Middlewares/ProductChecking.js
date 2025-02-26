export const productCheckUser = (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({
      isLoggedInobj: false,
      userdata: null,
    });
  }
  if(req.user.role === "user" || !req.user.role || req.user.role === '' || req.user.role === null ){
    return res.status(400).json({
        isLoggedInobj: false,
        userdata: null
    })
  }
  next();
};
