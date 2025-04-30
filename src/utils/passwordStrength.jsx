const getPasswordStrength = (password) => {
  if (!password) return { level: "", color: "" };
  if (password.length < 6) return { level: "Weak", color: "#ff4d4f" };

  const strengthChecks = [
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*(),.?":{}|<>]/.test(password),
  ];

  const passedChecks = strengthChecks.filter(Boolean).length;

  if (passedChecks <= 1) return { level: "Weak", color: "#ff4d4f" };
  if (passedChecks === 2 || passedChecks === 3)
    return { level: "Medium", color: "#faad14" };
  return { level: "Strong", color: "#52c41a" };
};

export const PasswordStrengthIndicator = ({ password }) => {
  const strength = getPasswordStrength(password);

  return password ? (
    <div className="password-strength" style={{ color: strength.color }}>
      Strength: {strength.level}
    </div>
  ) : null;
};
