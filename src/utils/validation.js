// utils/validation.js

const validationSignUp = (req) => {
  const { firstName, lastName, age, emailId ,password} = req.body;

  const errors = [];

  // 🔹 Validate first name
  if (!firstName || typeof firstName !== "string") {
    errors.push("First name is required and must be a string.");
  } else if (firstName.length < 4 || firstName.length > 30) {
    errors.push("First name must be between 4 and 30 characters.");
  }

  // 🔹 Validate last name (optional)
  if (lastName && (lastName.length < 1 || lastName.length > 30)) {
    errors.push("Last name must be between 1 and 30 characters if provided.");
  }

  // 🔹 Validate age (optional but must be >= 18)
  if (age !== undefined) {
    if (typeof age !== "number" || isNaN(age)) {
      errors.push("Age must be a number.");
    } else if (age < 18) {
      errors.push("Age must be at least 18.");
    }
  }

  // 🔹 Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailId || !emailRegex.test(emailId)) {
    errors.push("A valid email address is required.");
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required and must be a string.");
  } else if (password.length < 6 || password.length > 30) {
    errors.push("Password must be between 6 and 30 characters.");
  } else {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; 
    if (!strongPasswordRegex.test(password)) {
      errors.push("Password must be strong, including uppercase, lowercase, number, and special character.");
    }   
    }

  // ✅ Return final result
  if (errors.length > 0) {
    return { valid: false, errors };
  } else {
    return { valid: true };
  }
};

module.exports = { validationSignUp };
