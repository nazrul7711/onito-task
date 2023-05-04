import React from "react";
import style from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import states from "../data/StatesAndCities";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  age: Yup.lazy((value) => {
    if (value.length > 2) {
      return Yup.string()
        .required()
        .matches(
          /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
          "Enter date in yyyy-mm-dd format"
        );
    } else {
      return Yup.string().required();
    }
  }),
  sex: Yup.string().required(),
  email: Yup.lazy((value) => {
    if (value) {
      return Yup.string().email();
    }
    return Yup.string().notRequired();
  }),
  mobile: Yup.lazy((value) => {
    if (value) {
      return Yup.string().matches(
        /^[6789]\d{9}$/,
        "invalid indian mobile number should either start with 6,7,8 9"
      );
    }
    return Yup.string().notRequired();
  }),
  emergencyNo: Yup.lazy((value) => {
    if (value) {
      return Yup.string().matches(
        /^[6789]\d{9}$/,
        "invalid indian mobile number should either start with 6,7,8 9"
      );
    }
    return Yup.string().notRequired();
  }),
  govtIdType: Yup.string(),
  govtId: Yup.string().when("govtIdType", {
    is: "aadhar",
    then: () =>
      Yup.string()
        .length(12, "aadhar should be 12 digit long")
        .matches(/^[0-9]{12}$/, "Invalid Aadhar number should be only numeric"),

    otherwise: () =>
      Yup.string()
        .length(10, "pan no should 10 digit long")
        .matches(
          /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
          "Invalid PAN number it should be alpha numric"
        ),
  }),
});

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedState, setState] = useState("Andhra Pradesh");

  let availableCities = Object.values(
    states.filter((state) => Object.keys(state)[0] === selectedState)[0]
  );

  return (
    <div>
      <form
        className={style.form}
        onSubmit={handleSubmit(async (data) => {
          try {
            const response = await fetch("http://localhost:3002/person", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            const responseData = await response.json();
            console.log(responseData);
            reset();
          } catch (err) {
            console.log(err);
          }
        })}
      >
        <h3 className={style.personalDetails}>Personal Details</h3>
        <label htmlFor="name" className={style.nameLabel}>
          Name
        </label>
        <input
          {...register("name")}
          className={style.name}
          type="text"
          placeholder="Enter Name"
          id="name"
        />
        <p className={style.nameError}>{errors.name?.message}</p>
        <label htmlFor="" className={style.dateOfBirthLabel}>
          Date Of Birth
        </label>
        <input
          {...register("age")}
          type="text"
          className={style.dateOfBirth}
          placeholder="Enter DOB or age yy or yyyy-mm-dd"
        />
        <p className={style.ageError}>{errors.age?.message}</p>
        <label htmlFor="sex" className={style.sexLabel}>
          Sex
        </label>
        <select
          {...register("sex")}
          name=""
          id="sex"
          className={style.sexDropdown}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p className={style.sexError}>{errors.sex?.message}</p>
        <label htmlFor="mobile" className={style.mobileLabel}>
          Mobile
        </label>
        <input
          type="text"
          className={style.mobile}
          placeholder="Enter Mobile"
          {...register("mobile")}
        />
        <p className={style.mobileError}>{errors.mobile?.message}</p>
        <label htmlFor="govtId" className={style.govtIssueIdLabel}>
          Govt Issued ID
        </label>
        <select {...register("govtIdType")} className={style.govtIdDropdown}>
          <option value="aadhar">Aadhar</option>
          <option value="pan">Pan Card</option>
        </select>
        <input
          type="text"
          {...register("govtId")}
          className={style.govtIssueId}
          placeholder="govt issue id"
        />
        <p className={style.idError}>{errors.govtId?.message}</p>
        <h3 className={style.contactDetails}>Contact Details</h3>
        <label htmlFor="guardian" className={style.guardianLabel}>
          Guardian Details
        </label>
        <select
          {...register("label")}
          name=""
          id="guardian"
          className={style.guardianDropdown}
        >
          <option value="select">Enter Label</option>
          <option value="mr">Mr</option>
          <option value="mrs">Mrs</option>
        </select>
        <input
          {...register("guardian")}
          type="text"
          className={style.guardian}
          placeholder="Guardian Details"
        />
        <label htmlFor="email" className={style.emailLabel}>
          Email
        </label>
        <input
          {...register("email")}
          type="text"
          placeholder="Enter Email"
          className={style.email}
        />
        <p className={style.emailError}>{errors.email?.message}</p>
        <label
          htmlFor="emergencyContact"
          className={style.emergencyContactLabel}
        >
          Emergency Contact Number
        </label>
        <input
          {...register("emergencyNo")}
          type="text"
          placeholder="Enter Emergency No"
          className={style.emergencyContact}
        />
        <p className={style.emergencyError}>{errors.emergencyNo?.message}</p>
        <h3 className={style.addressDetails}>Address Details</h3>
        <label htmlFor="address" className={style.addressLabel}>
          Address
        </label>
        <input
          {...register("address")}
          type="text"
          placeholder="Enter Address"
          className={style.address}
        />
        <label htmlFor="state" className={style.stateLabel}>
          State
        </label>
        <select
          {...register("state")}
          name=""
          id="state"
          className={style.stateDropdown}
          onChange={(e) => {
            setState(e.target.value);
          }}
        >
          {states
            .map((a) => Object.keys(a)[0])
            .map((state, index) => {
              return (
                <option value={state} key={index}>
                  {state}
                </option>
              );
            })}
        </select>
        <label htmlFor="city" className={style.cityLabel}>
          City
        </label>
        <select
          {...register("city")}
          name=""
          id="city"
          className={style.cityDropdown}
        >
          {availableCities[0].map((city, index) => {
            return (
              <option value={city} key={index}>
                {city}
              </option>
            );
          })}
        </select>
        <label htmlFor="country" className={style.countryLabel}>
          Country
        </label>
        <input
          {...register("country")}
          type="text"
          placeholder="India"
          className={style.country}
        />
        <label htmlFor="pincode" className={style.pincodeLabel}>
          Pincode
        </label>
        <input
          {...register("pincode")}
          type="text"
          placeholder="Enter Pincode"
          className={style.pincode}
        />
        <h3 className={style.otherDetails}>Other Details</h3>
        <label htmlFor="occupation" className={style.occupationLabel}>
          Occupation
        </label>
        <input
          {...register("occupation")}
          type="text"
          placeholder="Enter Occupation"
          className={style.occupation}
        />
        <label htmlFor="religion" className={style.religionLabel}>
          Religion
        </label>
        <select
          {...register("religion")}
          id="religion"
          className={style.religionDropdown}
        >
          <option value="hindu">Hindu</option>
          <option value="sikh">Sikh</option>
          <option value="christian">Chritian</option>
          <option value="muslim">Muslim</option>
        </select>
        <label htmlFor="maritalStatus" className={style.maritalStatusLabel}>
          Marital Status
        </label>
        <select
          {...register("maritalStatus")}
          id="maritalStatus"
          className={style.maritalStatusDropdown}
        >
          <option value="status">Enter Marital Status</option>
          <option value="married">Married</option>
          <option value="unmarried">Unmarried</option>
        </select>
        <label htmlFor="bloodGroup" className={style.bloodGroupLabel}>
          Blood Group
        </label>
        <select
          {...register("bloodGroup")}
          id="bloodGroup"
          className={style.bloodGroupDropdown}
        >
          <option value="o+">O+</option>
          <option value="o-">O-</option>
          <option value="a+">A+</option>
          <option value="a-">A-</option>
          <option value="b+">B+</option>
          <option value="b-">B-</option>
          <option value="ab+">AB+</option>
          <option value="ab-">AB-</option>
        </select>
        <label htmlFor="nationality" className={style.nationalityLabel}>
          Nationality
        </label>
        <input
          type="text"
          {...register("nationality")}
          className={style.nationality}
          placeholder="Nationality"
        />
        <button className={style.cancelButton}>Cancel</button>

        <button className={style.submitButton}>Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
