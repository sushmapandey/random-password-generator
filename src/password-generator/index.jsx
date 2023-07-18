import React, { useState } from "react";
import PasswordGenerator from "./PasswordGenerator";

function RandomPasswordGenreator() {
  const [checkData, setCheckData] = useState("");
  function isPasswordValid(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  const password = `${checkData}`;
  const isValid = isPasswordValid(password);

  if (isValid) {
    console.log("Password is valid.");
  } else {
    console.log("Password is not valid.");
  }
  return (
    <>
      <PasswordGenerator checkPassword={setCheckData} />
    </>
  );
}

export default RandomPasswordGenreator;
