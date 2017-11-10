package controllers

import (
	"b2g/app/models"
	"b2g/app/serializers"
	"b2g/app/services"

	"github.com/revel/revel"
)

// Users is the main Application Controller
type Users struct {
	Base
}

// Index is there to process the login action for the user
// This should probably only handle post requests @TODO figure out a way to limit that
func (c Users) Index() revel.Result {
	// Render the initial form to register for the site
	return c.Render()
}

// Create parses Post params, creates and persists a user if valid
func (c Users) Create() revel.Result {
	// [Section/Article page 1]
	// - username, email and email
	// - first, middle initial?,  last - do we care about these now in the flow? probably not.
	// - DOB, etc - again do we care at this point?
	// [Section/Aritcle page 2] At this point we really just want them to add games
	// - Add platforms/games? Probably games and then decipher platforms from there
	// -
	name := c.Params.Form.Get("username")
	email := c.Params.Form.Get("email")
	password := c.Params.Form.Get("password")
	c.Validation.Required(name).Message("Your name is required. Server")
	c.Validation.Required(email).Message("Your email is required. Server")
	c.Validation.Required(password).Message("Your password is required")

	u := &models.User{}
	if c.Validation.HasErrors() {
		c.Response.Status = 401

		registrationData := serializers.RegistrationData(u, int(NONE), c.Validation.ErrorMap())
		return c.RenderJSON(registrationData)
	}

	// @TODO Check if the password meets the requirements. If it is cool then create the user
	s := services.NewUserService(nil)
	if u, err := s.CreateUser(services.CreateUserOptions{
		UserName:     name,
		EmailAddress: email,
		Password:     password,
	}); err == nil {
		registrationData := serializers.RegistrationData(u, int(FULL), c.Validation.ErrorMap())

		return c.RenderJSON(registrationData)
	}

	c.Response.Status = 418
	c.Validation.Error("Failed to create user. Try Again").Key("registration")
	registrationData := serializers.RegistrationData(u, int(NONE), c.Validation.ErrorMap())

	return c.RenderJSON(registrationData)
}

// CheckUser checks if the username is valid and/or taken
func (c Users) CheckUsername() revel.Result {
	name := c.Params.Get("username")
	c.Validation.Required(name).Message("username is required")
	if c.Validation.HasErrors() {
		c.Response.Status = 422
		response := map[string]interface{}{
			"errors": c.Validation.ErrorMap(),
		}

		return c.RenderJSON(response)
	}

	users := services.NewUserService(nil)
	isUsernameTaken := users.IsUserNameTaken(name)
	if !isUsernameTaken {
		c.Response.Status = 404
		name = ""
	}

	return c.RenderJSON(map[string]string{"username": name})
}

// CreateUserProfile
func (c Users) CreateUserProfile() revel.Result {
	return c.Render()
}
