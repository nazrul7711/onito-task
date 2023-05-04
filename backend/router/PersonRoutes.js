let express = require("express");
let router = express.Router();
let { check, validationResult } = require("express-validator");
const Person = require("../models/PersonModel");

router.post(
  "/person",
  [
    check("name").not().isEmpty(),
    check("sex").not().isEmpty(),
    check("age").not().isEmpty(),
  ],
  async (req, res) => {
    let { name, age, sex, mobile } = req.body;


    if (age.length > 2) {
      let year = age.split("-")[0];
      age = 2023 - parseInt(year);
    } else {
      age = parseInt(age);
    }
    if (mobile) {
      mobile = parseInt(mobile);
    }
    const personCreated = new Person({
      name: req.body.name,
      age: age,
      sex: req.body.sex,
      mobile: req.body.mobile,
      govtId: req.body.govtId,
      guardian: req.body.guardian,
      email: req.body.email,
      emergencyNo: req.body.emergencyNo,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      country: req.body.country,
      pincode: req.body.pincode,
      occupation: req.body.occupation,
      religion: req.body.religion,
      maritalStatus: req.body.maritalStatus,
      bloodGroup: req.body.bloodGroup,
      nationality: "India",
    });
    let person = await personCreated.save();
    res.status(201).json(person);
  }
);

router.get("/getPersons",async(req,res)=>{
  let persons  = await Person.find()
  console.log(persons)
  res.status(201).json(persons)
})

module.exports = router;
