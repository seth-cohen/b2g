package controllers

import (
	"b2g/app/models"
	"b2g/app/serializers"
	"b2g/app/services"
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/revel/revel"
)

// App is the main Application Controller
type App struct {
	Base
}

// Index is the entry point for the application home page
func (c App) Index() revel.Result {
	u := &models.User{}
	var err error

	if c.getUserLoginLevel() > NONE {
		s := services.NewUserService(nil)
		userName := c.Session["userName"]
		if u, err = s.GetUser(services.GetUserOptions{UserName: &userName}); err != nil {
			u = &models.User{}
		}
	}

	initial := serializers.BootstrapData(u, int(c.getUserLoginLevel()))
	moreScripts := []string{"index_bundle.js"}
	return c.Render(initial, moreScripts)
}

// Hello is the endpoint respond to user form entry
func (c App) Hello() revel.Result {
	name := c.Params.Get("name")
	c.Validation.Required(name).Message("Your name is require!")
	c.Validation.MinSize(name, 3).Message("Your name is not long enough!")

	if c.Validation.HasErrors() {
		c.Validation.Keep()
		c.FlashParams()
		return c.Redirect(App.Index)
	}
	return c.Render(name)
}

// GetUser displays user information
func (c App) GetUser() revel.Result {
	s := services.NewUserService(nil)
	id := 1
	u, err := s.GetUser(services.GetUserOptions{ID: &id})
	if err != nil {
		return c.RenderError(errors.New("Couldn't load user"))
	}

	data := map[string]interface{}{
		"id":       u.ID(),
		"name":     u.UserName(),
		"password": u.EmailAddress(),
	}
	return c.RenderJSON(data)
}

// GetGame hits the IGDB api and returns JSON data. This is really just to be deleted stuff
// here as example of how to make webrequests in GO
func (c App) GetGame() revel.Result {
	client := &http.Client{
		Timeout: time.Second * 10,
	}
	req, err := http.NewRequest("GET", "https://api-2445582011268.apicast.io/games/", nil)
	req.Header.Add("user-key", "5f1091120b69ceda37efbcebc1581930")
	req.Header.Add("Accept", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		revel.INFO.Println("Error requesting data from IGDB")
	}
	defer resp.Body.Close()

	var data interface{}
	json.NewDecoder(resp.Body).Decode(&data)
	return c.RenderJSON(data)
}
