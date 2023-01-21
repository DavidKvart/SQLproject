const express = require("express");
const db = require("../model/db");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

function generateJWT(id) {
  const token = jwt.sign({ _id: id }, "just you wait");
  return token;
}
////////////ADD NEW USER//////////
router.post("/", async (req, res) => {
  try {
    const emailExist = await db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
    if (emailExist.rowCount) {
      return res.status(400).send("user with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const body = req.body;
    const query = `INSERT INTO users (name, password, email)
                      VALUES ($1, $2, $3)
                      RETURNING user_id, name, email;`;
    const values = [body.name, hashedPassword, body.email];
    const { rows } = await db.query(query, values);
    res.status(201).header("x-auth-token", generateJWT(rows[0].user_id)).header("access-control-expose-headers", "x-auth-token").send(rows[0]);
  } catch (error) {
    res.status(500).send("Failed to create user");
  }
});

module.exports = router;
