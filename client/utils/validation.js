export const MIN_USERNAME = 5;
export const IsValidUsername = username => {
  const re = /^[a-zA-Z0-9_-]{5,32}$/;

  return re.test(username);
};

export const IsValidEmail = email => {
  const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return re.test(email);
};

export const PASSWORD_STRONG = 100;
export const PASSWORD_MEDIUM = 66;
export const PASSWORD_WEAK = 33;
export const PASSWORD_NONE = 0;
export const MIN_PASSWORD = 6;
export const MAX_PASSWORD = 128;

export const PasswordStrength = pw => {
  var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,128})/;
  var mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

  switch (true) {
    case strongRegex.test(pw):
      return PASSWORD_STRONG;
    case mediumRegex.test(pw):
      return PASSWORD_MEDIUM;
    case pw.length > 0:
      return PASSWORD_WEAK;
    default:
      return PASSWORD_NONE;
  }
};
