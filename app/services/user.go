package services

import (
	"b2g/app/models"
	repos "b2g/app/repositories"
	"errors"
)

// UserService is the class responsible for executing extensive application logic surrounding
// the User model/entity
type UserService struct {
	repo repos.UserRepository
}

// NewUserService is the service constructor
func NewUserService(repo repos.UserRepository) *UserService {
	if repo == nil {
		repo = repos.UserMySQLRepository{}
	}

	return &UserService{
		repo: repo,
	}
}

// GetUserOptions is the input param value type for loading a single user
type GetUserOptions struct {
	ID           *int
	UserName     *string
	EmailAddress *string
}

// GetUser is the main method that we will use to load a user from the datasource
func (s UserService) GetUser(input GetUserOptions) (*models.User, error) {
	if input.ID != nil {
		return s.getByID(*input.ID)
	} else if input.EmailAddress != nil {
		return s.getByEmail(*input.EmailAddress)
	} else if input.UserName != nil {
		return s.getByUserName(*input.UserName)
	}

	return &models.User{}, errors.New("No input value given to load by")
}

// CreateUserOptions is the input param value type for loading a single user
type CreateUserOptions struct {
	UserName     string
	EmailAddress string
	Password     string
}

// CreateUser is the main method that we will use to load a user from the datasource
func (s UserService) CreateUser(input CreateUserOptions) (*models.User, error) {
	u := models.User{}
	u.SetEmailAddress(input.EmailAddress).
		SetUserName(input.UserName).
		SetPassword(input.Password)

	userID, err := s.repo.CreateUser(&u)
	if err != nil {
		return &u, errors.New("Error saving new user")
	}

	u.SetID(int(userID))

	return &u, nil
}

// VerifyEmailAndPassword checks to see if the password matches that of the username
func (s UserService) VerifyEmailAndPassword(email, password string) bool {
	return true
}

// VerifyUserNameAndPassword checks to see if the password matches that of the username
func (s UserService) VerifyUserNameAndPassword(email, password string) bool {
	return true
}

// IsUserNameTaken checks to see if the username is currently taken
func (s UserService) IsUserNameTaken(username string) bool {
	return true
}

func (s UserService) getByID(id int) (*models.User, error) {
	user, err := s.repo.GetByID(id)
	if err != nil {
		return nil, errors.New("Unable to get user by ID")
	}

	return user, nil
}

func (s UserService) getByEmail(email string) (*models.User, error) {
	user, err := s.repo.GetByEmailAddress(email)
	if err != nil {
		return nil, errors.New("Unable to get user by email")
	}

	return user, nil
}

func (s UserService) getByUserName(username string) (*models.User, error) {
	user, err := s.repo.GetByUserName(username)
	if err != nil {
		return nil, errors.New("Unable to get user by username")
	}

	return user, nil
}
