const router = require("express").Router();
const {
  getEnable,
  getdisable,
  getStatus,
} = require("../controller/admin-attendance");

router.get("/enable", getEnable);
router.get("/disable", getdisable);
router.get("/status", getStatus);
module.exports = router;
