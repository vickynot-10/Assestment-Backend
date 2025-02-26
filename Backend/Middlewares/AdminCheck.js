export const AdminUserCheck = (req, res, next) => {

    if (!req.user) {
      return res.status(400).json({
        isLoggedInobj: false,
        userdata: null,
      });
    }
    if(req.user.role !== "admin" ){
      return res.status(400).json({
          isLoggedInobj: false,
          userdata: null
      })
    }
    next();
  };
  