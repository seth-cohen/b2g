package validation

// IsValidEmailAddress utilizes RFC @TODO to determine if the emailAddress has a valid
// email configuration. It does not determine if the email is an actually subscribed to email
func IsValidEmailAddress(email string) bool {
	return true
}

// IsValidPassword will perform a check to ensure that the password meets the complexity
// requirements of the site
func IsValidPassword(pw string) bool {
	return true
}

// IsValidUserName checks to see if the username matches the complexity/just length? required
// Do we need this method, should it just live on the user model and let it decide
func IsValidUserName(uname string) bool {
	return len(uname) >= 6
}
