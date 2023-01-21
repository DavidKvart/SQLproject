const express = require("express");
const db = require("../model/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateJWT(id) {
  const token = jwt.sign({ _id: id }, "just you wait");
  return token;
}
////////FIND USER BY EMAIL////////
router.post("/login", async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
    if (rows.length) {
      const valiedPassword = await bcrypt.compare(req.body.password, rows[0].password);
      console.log(valiedPassword);
      if (valiedPassword) {
        res.status(201).header("x-auth-token", generateJWT(rows[0].user_id)).header("access-control-expose-headers", "x-auth-token").send(rows[0]);
        return;
      } else res.status(500).send("Username or password incorrect");
    } else {
      res.status(404).send("user does not exist");
    }
  } catch (error) {
    res.status(500).send("Username or password incorrect");
  }
});

/////////FIND USER BY ID/////////
router.post("/getById", async (req, res) => {
  try {
    let userData = "";
    let userCourses = "";
    const { rows } = await db.query(`SELECT  name, email, user_id FROM users WHERE user_id = $1`, [req.body._id]);
    if (rows.length) {
      let userData = rows[0];
      const userCourses = await db.query(`SELECT  * FROM courses WHERE user_id = $1`, [req.body._id]);
      res.status(200).send({ userData: userData, userCourses: userCourses.rows });
    } else {
      return res.status(404).send("user does not exist");
    }
  } catch (error) {
    res.status(500).send("Failed to fetch user");
  }
});

router.get("/courses", async (req, res) => {
  try {
  } catch (err) {}
});
router.post("/changePassword", async (req, res) => {
  try {
    const email = req.body.email;
    let result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    console.log(result);
    if (!result.rows.length) {
      res.status(401).send("email does not exist");
      return;
    }
    const validatePassword = req.body.password1 == req.body.password2;
    if (!validatePassword) {
      res.status(401).send("password does not match!");
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password1, 10);

    let query = `UPDATE users
    set password = $1
    WHERE email = $2
    RETURNING * `;
    let values = [hashedPassword, email];
    result = await db.query(query, values);
    // res.send(result);
    res.status(200).header("x-auth-token", generateJWT(result.rows[0].user_id)).header("access-control-expose-headers", "x-auth-token").send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
