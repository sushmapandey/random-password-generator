import React, { useState, useEffect } from "react";

const PasswordGenerator = ({ checkPassword }) => {
  const [password, setPassword] = useState("");
  const [previousPasswords, setPreviousPasswords] = useState([]);

  // Function to check if the password is valid
  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    checkPassword(password);
  }, [password]);

  useEffect(() => {
    const storedPasswords = localStorage.getItem("previousPasswords");
    if (storedPasswords) {
      setPreviousPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  const generatePassword = () => {
    // Generate the password based on user preferences
    // You can customize this function to suit your needs
    // const preferences = {
    //   numbers: true,
    //   alphabets: true,
    //   specialChars: true,
    // };

    // let charset = "";
    // if (preferences.numbers) {
    //   charset += "0123456789";
    // }
    // if (preferences.alphabets) {
    //   charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // }
    // if (preferences.specialChars) {
    //   charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    // }

    const length = 12; // Change this to set the desired password length
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+{}[]~-";
    const allChars = uppercase + lowercase + numbers + specialChars;
    let generatedPassword = "";
    // for (let i = 0; i < 10; i++) {
    //   generatedPassword += charset.charAt(
    //     Math.floor(Math.random() * charset.length)
    //   );
    // }
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    setPassword(generatedPassword);

    // Update previous passwords
    const updatedPreviousPasswords = [
      ...previousPasswords,
      generatedPassword,
    ].slice(-5);
    setPreviousPasswords(updatedPreviousPasswords);
    localStorage.setItem(
      "previousPasswords",
      JSON.stringify(updatedPreviousPasswords)
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    // setShowAlert(true);
    setCopiedMessage("Text copied successfully!");
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setCopiedMessage("");
    }, 1000);
  };

  const [copiedMessage, setCopiedMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  //   const handleButtonClick = () => {
  //     const desiredPassword = "password123"; // Replace with your desired password
  //     if (password === desiredPassword) {
  //       setCopiedMessage("Text copied successfully!");
  //     } else {
  //       setCopiedMessage("Incorrect password!");
  //     }

  //     setShowMessage(true);

  //     setTimeout(() => {
  //       setShowMessage(false);
  //       setCopiedMessage("");
  //     }, 1000);
  //   };

  return (
    <>
      <div className="w-[400px] min-h-[300px] p-5 rounded overflow-hidden shadow-lg hover:shadow-2xl relative">
        <button
          onClick={generatePassword}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Generate Password
        </button>
        {password && (
          <div className="bg-white rounded-lg shadow p-2 mt-3 w-[250px]">
            <input
              type="text"
              value={password}
              readOnly
              className="text-sm text-gray-600"
            />
            <button
              onClick={copyToClipboard}
              className="text-orange-600 font-bold"
            >
              Copy
            </button>
          </div>
        )}
        {showMessage && (
          <div
            id="toast-success"
            className="flex items-center w-[250px] max-w-xs p-2 mb-4 text-white bg-gray-500 rounded-lg shadow absolute"
            role="alert"
          >
            <div className="ml-3 text-sm font-normal">
              <p>{copiedMessage}</p>
            </div>
          </div>
        )}

        {previousPasswords.length > 0 && (
          <div>
            <h3 className="font-medium text-base text-gray-600">
              Previous Generated Passwords are:
            </h3>
            <ol>
              {previousPasswords.map((prevPassword, index) => (
                <li key={index} className="text-sm leading-7 text-gray-400">
                  {prevPassword}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      {/* <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button onClick={handleButtonClick}>Copy Text</button>
        {showMessage && <p>{copiedMessage}</p>}
      </div> */}
    </>
  );
};

export default PasswordGenerator;
