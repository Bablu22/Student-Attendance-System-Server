const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const adminAttendenceRoute = require("./admin-attendance");
const studentAttendenceRouter = require("./student-attendance");
const authenticate = require("../middleware/authenticate");

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/admin/attendance", authenticate, adminAttendenceRoute);
router.use("/api/v1/student/attendance", authenticate, studentAttendenceRouter);
module.exports = router;
