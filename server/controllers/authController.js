const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  // ตรวจสอบ Username ซ้ำ
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, usernameResult) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (usernameResult.length > 0) {
        return res.status(409).json({
          message: "Username already exists",
        });
      }

      // ตรวจสอบ Email ซ้ำ
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, emailResult) => {
          if (err) {
            return res.status(500).json({
              message: "Database error",
            });
          }

          if (emailResult.length > 0) {
            return res.status(409).json({
              message: "Email already exists",
            });
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          const sql = `
                        INSERT INTO users
                        (username, email, password)
                        VALUES (?, ?, ?)
                    `;

          db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Register failed",
              });
            }

            res.status(201).json({
              message: "Register successful",
            });
          });
        },
      );
    },
  );
};

const login = async (req, res) => {
  console.log("LOGIN CONTROLLER CALLED");
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email and password",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const user = result[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );

      res.json({
        message: "Login successful",
        token,
      });
    },
  );
};

const getProfile = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, username, email, firstName, lastName FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.json(result[0]);
    },
  );
};

const updateProfile = (req, res) => {
  const userId = req.user.id;

  const { firstName, lastName } = req.body;

  db.query(
    `UPDATE users
         SET firstName = ?, lastName = ?
         WHERE id = ?`,
    [firstName, lastName, userId],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Update profile failed",
        });
      }

      res.json({
        message: "Profile updated successfully",
      });
    },
  );
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
