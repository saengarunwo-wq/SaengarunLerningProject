const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

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