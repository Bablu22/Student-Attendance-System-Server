const router = require("express").Router();
const userController = require("../controller/users");

// Get user by Id
router.get("/:id", userController.getUserById);

// Update user by Id
router.put("/:id", () => {});

// Update user by Id
router.patch("/:id", () => {});

// Delete user by Id
router.delete("/:id", () => {});

// Get all user
router.get("/", userController.getUser);

// Create a new user
router.post("/", () => {});

module.exports = router;
