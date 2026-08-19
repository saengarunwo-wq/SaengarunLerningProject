const express = require("express");

const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);

module.exports = router;

//TEST
// const express = require("express");

// const router = express.Router();

// router.post("/register", (req, res) => {
//     console.log("REGISTER ROUTE CALLED");

//     res.json({
//         message: "Register route works"
//     });
// });

// router.post("/login", (req, res) => {
//     res.json({
//         message: "Login route works"
//     });
// });

// module.exports = router;