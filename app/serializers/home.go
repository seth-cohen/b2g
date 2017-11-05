package serializers

import (
	"b2g/app/models"
	"encoding/json"
)

func BootstrapData(currentUser *models.User, loginStatus int) string {
	data, _ := json.Marshal(
		map[string]interface{}{
			"login": map[string]interface{}{
				"currentUser": getUserData(currentUser),
				"loginStatus": loginStatus,
			},
		},
	)

	return string(data)
}

func getUserData(u *models.User) map[string]interface{} {
	return map[string]interface{}{
		"userName":     u.UserName(),
		"emailAddress": u.EmailAddress(),
		"id":           u.ID(),
	}
}
