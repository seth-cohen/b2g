package controllers

import (
	"b2g/app/services"
	"b2g/app/utils/validation"
	"strconv"

	"github.com/revel/revel"
)

// Registration is the main Application Controller
type Registration struct {
	Base
}

// Index is there to process the login action for the user
// This should probably only handle post requests @TODO figure out a way to limit that
func (c Registration) Index() revel.Result {
	// Render the initial form to register for the site
	return c.Render()
}

// Submit parses Post params, creates and persists a user if valid
func (c Registration) Submit() revel.Result {
	// [Section/Article page 1]
	// - username, email and email
	// - first, middle initial?,  last - do we care about these now in the flow? probably not.
	// - DOB, etc - again do we care at this point?
	// [Section/Aritcle page 2] At this point we really just want them to add games
	// - Add platforms/games? Probably games and then decipher platforms from there
	// -
	name := c.Params.Get("username")
	email := c.Params.Get("email")
	password := c.Params.Get("password")
	c.Validation.Required(name).Message("Your name is require!")
	c.Validation.Required(email).Message("Your email is require!")
	c.Validation.Required(password).Message("Your password is required")

	if c.Validation.HasErrors() {
		c.Validation.Keep()
		c.FlashParams()
		return c.Redirect(Login.Index)
	}

	// Check if the password combination is acceptable
	users := services.NewUserService(nil)
	if users.VerifyUserNameAndPassword(name, password) {
		c.Session["userName"] = name
		c.Session["loginStatus"] = strconv.Itoa(int(FULL))
	}

	return c.RenderJSON(c.Session)
}

// CheckUser checks if the username is valid and/or taken
func (c Registration) CheckUser() revel.Result {
	name := c.Params.Get("username")
	c.Validation.Required(name).Message("username is required")
	if c.Validation.HasErrors() {
		c.Response.Status = 401
		response := map[string]interface{}{
			"errors": c.Validation.ErrorMap(),
		}

		return c.RenderJSON(response)
	}

	users := services.NewUserService(nil)
	var isUserNameTaken bool
	if validation.IsValidUserName(name) {
		isUserNameTaken = users.IsUserNameTaken(name)
	}
	return c.RenderJSON(map[string]bool{"userNameTaken": isUserNameTaken})
}

// CreateUserProfile
func (c Registration) CreateUserProfile() revel.Result {
	return c.Render()
}
