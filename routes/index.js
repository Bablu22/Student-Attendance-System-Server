const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", userRouter);
module.exports = router;
