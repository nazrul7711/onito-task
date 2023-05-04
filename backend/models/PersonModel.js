const mongoose = require("mongoose");

let personModel = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  mobile: { type: Number },
  govtId: { type: String},
  guardian: { type: String },
  email: { type: String, unique: true,sparse:true },
  emergencyNo: { type: Number },
  address: { type: String},
  state: { type: String },
  city: { type: String },
  country: { type: String },
  pincode: { type: Number },
  occupation: { type: String},
  religion: { type: String},
  maritalStatus: { type: String },
  bloodGroup: { type: String },
  nationality: { type: String},
});

module.exports = mongoose.model("Person", personModel);
