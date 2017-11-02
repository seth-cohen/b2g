package controllers

import (
	"b2g/app/services"
	"strconv"

	"github.com/revel/revel"
)

// Login is the main Application Controller
type Login struct {
	Base
}

// Index is the entry point for the application home page
func (c Login) Index() revel.Result {
	// Silly to take them here if they are already logged in - wait no it isn't
	if c.getUserLoginLevel() == FULL {
		c.Redirect(App.Index)
	}
	return c.Render()
}

// Post is there to process the login action for the user
// This should probably only handle post requests @TODO figure out a way to limit that
func (c Login) Post() revel.Result {
	name := c.Params.Get("username")
	password := c.Params.Get("password")
	c.Validation.Required(name).Message("Your name is require!")
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
