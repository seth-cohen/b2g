package serializers

import (
	"b2g/app/models"

	"github.com/revel/revel"
)

func BootstrapData(currentUser *models.User, loginStatus int) map[string]interface{} {
	data := map[string]interface{}{
		"login": map[string]interface{}{
			"currentUser": getUserData(currentUser),
			"loginStatus": loginStatus,
		},
	}

	return data
}

func RegistrationData(currentUser *models.User, loginStatus int, errors map[string]*revel.ValidationError) map[string]interface{} {
	data := map[string]interface{}{
		"currentUser": getUserData(currentUser),
		"loginStatus": loginStatus,
		"errors":      errors,
	}

	return data
}

func getUserData(u *models.User) map[string]interface{} {
	return map[string]interface{}{
		"userName":     u.UserName(),
		"emailAddress": u.EmailAddress(),
		"id":           u.ID(),
	}
}
