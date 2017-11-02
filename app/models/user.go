package models

import (
	"bytes"

	"golang.org/x/crypto/bcrypt"
)

// User is the basic user of our application - we care about this person. We want this person
// to do things on our site. We should build cool things for them
type User struct {
	id           int
	userName     string
	emailAddress string
	passwordHash string
	profile      UserProfile
}

// UserName getter
func (u User) UserName() string {
	return u.userName
}

// SetUserName setter
func (u *User) SetUserName(userName string) *User {
	u.userName = userName

	return u
}

// ID getter
func (u User) ID() int {
	return u.id
}

// SetID setter
func (u *User) SetID(id int) *User {
	u.id = id

	return u
}

// EmailAddress getter
func (u User) EmailAddress() string {
	return u.emailAddress
}

// SetEmailAddress setter
func (u *User) SetEmailAddress(emailAddress string) *User {
	u.emailAddress = emailAddress

	return u
}

// HashPassword uses bcrypt to generate the cryptofied version of the password that is safe to save in the DB
func HashPassword(pw string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(pw), 14)
	return string(bytes), err
}

// VerifyPassword checks the plain text password against the hashed password
func (u User) VerifyPassword(pw string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.passwordHash), []byte(pw))
	return err == nil
}

// UserProfile is the struct (let's call it what it is Folks) that houses all of the details about the User
type UserProfile struct {
	firstName  string
	lastName   string
	middleName string
	// - addresses []Adresses
	// - currentAddress Address // Should we keep this property or expose a way to get this from the Addresses slice/array
	// - We should probably have a quick way to retrieve the shipping/billing addresses - no we don't why do we care about
	//   that we aren't selling anything. Yet???
}

// FirstName getter
func (u UserProfile) FirstName() string {
	return u.firstName
}

// LastName getter
func (u UserProfile) LastName() string {
	return u.lastName
}

// MiddleName getter
func (u UserProfile) MiddleName(initialOnly bool) string {
	if initialOnly {
		return u.middleName[0:0]
	}

	return u.middleName
}

// FullName computed property (with or without the middle name)
func (u UserProfile) FullName(withMiddle bool) string {
	var name bytes.Buffer
	name.WriteString(u.firstName)
	name.WriteString(" ")
	if withMiddle {
		name.WriteString(u.middleName)
		name.WriteString(" ")
	}
	name.WriteString(u.lastName)

	return name.String()
}
