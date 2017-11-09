package controllers

import (
	"strconv"

	"github.com/revel/revel"
)

// Base is the main Application Controller
type Base struct {
	*revel.Controller
}

// LoginStatus represents the login level of the current site user
type LoginStatus int

// LoginStatus consts
const (
	NONE       LoginStatus = 0
	RECOGNIZED LoginStatus = 10
	SOFT       LoginStatus = 20
	FULL       LoginStatus = 30
)

// getUserLoginLevel will return the current sessioned user or nil if no userid is found in session
func (c Base) getUserLoginLevel() LoginStatus {
	// Check session to see if we have a user
	if _, ok := c.Session["username"]; ok {
		if status, err := strconv.ParseInt(c.Session["loginStatus"], 10, 0); err == nil {
			return LoginStatus(status)
		}
	}

	return NONE
}
