const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "Top secret";


// ROUTE 1: Create a user via post router /train/register
router.post('/register', [
    body('ownerEmail', 'Enter a valid email').isEmail(),
    body('accessCode', 'Enter Strong Password').isLength({ min: 5 }),
  
  ], async (req, res) => {
    let success = false;
    //if there are errors,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user already exist or not and handle error in try-cath block
    try {
      let user = await User.findOne({ ownerEmail: req.body.ownerEmail });
      if (user) {
        success = false;
        return res.status(400).json({ success, "error": "User with this email already exists." });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.accessCode, salt);
  
      //create a new user
      user = await User.create({
        companyName: req.body.companyName,
        ownerName: req.body.ownerName,
        rollNo: req.body.rollNo,
        ownerEmail: req.body.ownerEmail,
        accessCode: secPass,
      });
      const data = {
        user: {
          id: user.id,
        //   clientID:res.body.clientID,
        //   clientSecret:res.body.clientSecret
        }
      }
      
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error has occured");
    }
  });


//   /ROUTE 2: Authenticate a user via post router /train/auth

router.post('/auth', [
  body('ownerEmail', 'Enter a valid email').isEmail(),
  body('accessCode', 'password can not be blank').exists()
], async (req, res) => {
  let success = false;
  //if there are errors,return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  //collect email password from login page and compare with databse email & password
  const { ownerEmail, accessCode } = req.body;
  try {
    let user = await User.findOne({ ownerEmail });
    if (!user) {
      return res.status(400).json({ success, error: "Please login with valid credentials" });
    }
    const comparedPassword = await bcrypt.compare(accessCode, user.accessCode);
    if (!comparedPassword) {
      return res.status(400).json({ success, error: "Please login with valid credentials" });
    }
    //when both email and password is matched  
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error has occured");
  }
});

router.post('/getuser', fetchuser, async (req, res) => {
    try {
  
      const userId = req.user.id;
      const user = await User.findById(userId).select("-accessCode");
  
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error has occured");
    }
  
  });

module.exports = router;