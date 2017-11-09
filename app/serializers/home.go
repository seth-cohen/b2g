package serializers

import (
	"b2g/app/models"

	"github.com/revel/revel"
)

func BootstrapData(currentUser *models.User, loginStatus int) map[string]interface{} {
	data := map[string]interface{}{
		"loginStatus": loginStatus,
		"currentUser": currentUser.ID(),
		"users": map[string]interface{}{
			"byID": map[string]interface{}{
				string(currentUser.ID()): getUserData(currentUser),
			},
			"allIDs": []int{currentUser.ID()},
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

func LoginData(currentUser *models.User, loginStatus int, errors map[string]*revel.ValidationError) map[string]interface{} {
	data := map[string]interface{}{
		"currentUser": getUserData(currentUser),
		"loginStatus": loginStatus,
		"errors":      errors,
	}

	return data
}

func getUserData(u *models.User) map[string]interface{} {
	userData := map[string]interface{}{}

	if u != nil {
		userData["username"] = u.UserName()
		userData["emailAddress"] = u.EmailAddress()
		userData["id"] = u.ID()
	}

	return userData

}
