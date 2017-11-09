package controllers

import (
	"b2g/app/serializers"
	"b2g/app/services"
	"strconv"

	"github.com/revel/revel"
)

// Login is the main Application Controller
type Login struct {
	Base
}

// LoginSubmit is there to process the login action for the user
// This should probably only handle post requests @TODO figure out a way to limit that
func (c *Login) LoginSubmit() revel.Result {
	username := c.Params.Form.Get("username")
	password := c.Params.Form.Get("password")
	c.Validation.Required(username).Message("Your username is required")
	c.Validation.Required(password).Message("Your password is required")

	if c.Validation.HasErrors() {
		c.Response.Status = 401
		loginData := serializers.LoginData(nil, int(NONE), c.Validation.ErrorMap())

		return c.RenderJSON(loginData)
	}

	// Load the user data
	users := services.NewUserService(nil)
	u, err := users.GetUser(services.GetUserOptions{UserName: &username})
	if err != nil {
		c.Response.Status = 404
		c.Validation.Error("Error loading user").Key("userLoad")
		loginData := serializers.LoginData(nil, int(NONE), c.Validation.ErrorMap())

		return c.RenderJSON(loginData)
	}

	// Check if the password combination is acceptable
	if !u.VerifyPassword(password) {
		c.Response.Status = 401
		c.Validation.Error("Invalid Username/Password Combination").Key("login")
		loginData := serializers.LoginData(nil, int(NONE), c.Validation.ErrorMap())

		return c.RenderJSON(loginData)
	}

	c.Session["username"] = username
	c.Session["loginStatus"] = strconv.Itoa(int(FULL))
	loginData := serializers.LoginData(u, int(FULL), nil)
	loginData["sessionUser"] = c.Session["username"]

	return c.RenderJSON(loginData)
}

// LogoutSubmit is here to process the logout action for the user
func (c *Login) LogoutSubmit() revel.Result {
	c.Session["username"] = ""
	c.Session["loginStatus"] = strconv.Itoa(int(NONE))

	return c.RenderJSON(map[string]bool{"success": true})
}
