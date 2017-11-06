package repositories

import (
	"b2g/app"
	"b2g/app/models"
	"strings"

	"github.com/revel/revel"
)

// @TODO maybe can make use of the template engine to build sql queries
const (
	userSelectSQL = `
		SELECT 	u.ID, 
						u.UserName, 
						u.EmailAddress,
						up.FirstName,
						up.LastName,
						up.MiddleName
	`
)

// UserRepository is the interface that all repositories must implement
type UserRepository interface {
	GetByID(id int) (*models.User, error)
	GetByUserName(userName string) (*models.User, error)
	GetByEmailAddress(email string) (*models.User, error)
	CreateUser(user *models.User) (int, error)
}

// UserMySQLRepository handles all user data storage requests for the MySQL data store
type UserMySQLRepository struct{}

// UserResponse is just there to grab the columns of the DB queries since UserModel props are private
type UserResponse struct {
	id           int
	userName     string
	emailAddress string
	firstName    string
	lastName     string
	middleName   string
}

// GetByID returns a user loaded from the MySQL data store
// builds the sql to query for user based on id
func (db UserMySQLRepository) GetByID(id int) (*models.User, error) {
	var sqlParts []string
	sqlParts = append(sqlParts, userSelectSQL)
	sqlParts = append(sqlParts, `
		FROM tblUser u
		LEFT JOIN tblUserProfile up ON u.ID = up.UserID
		WHERE ID=?;`)

	return db.processGetUserQuery(strings.Join(sqlParts, " "), id)
}

// GetByEmailAddress returns a user loaded from the MySQL data store
// builds the sql to query for user based on emailAddress
func (db UserMySQLRepository) GetByEmailAddress(emailAddress string) (*models.User, error) {
	var sqlParts []string
	sqlParts = append(sqlParts, userSelectSQL)
	sqlParts = append(sqlParts, `
		FROM tblUser u
		LEFT JOIN tblUserProfile up ON u.ID = up.UserID
		WHERE EmailAddress=?;`)

	return db.processGetUserQuery(strings.Join(sqlParts, " "), emailAddress)
}

// GetByUserName returns a user loaded from the MySQL data store
// builds the sql to query for user based on userName
func (db UserMySQLRepository) GetByUserName(userName string) (*models.User, error) {
	var sqlParts []string
	sqlParts = append(sqlParts, userSelectSQL)
	sqlParts = append(sqlParts, `
		FROM tblUser u
		LEFT JOIN tblUserProfile up ON u.ID = up.UserID
		WHERE UserName=?;`)

	return db.processGetUserQuery(strings.Join(sqlParts, " "), userName)
}

// GetByEmailAddress returns a user loaded from the MySQL data store
// this is the basic implementation of the data access to retrieve user
func (db UserMySQLRepository) processGetUserQuery(sql string, value interface{}) (*models.User, error) {
	data := UserResponse{}
	stmt, err := app.DB.Prepare(sql)
	if err != nil {
		revel.INFO.Println("Error preparing statement", err)
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(value)
	if err != nil {
		revel.INFO.Println("Error executing query", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(
			&data.id,
			&data.userName,
			&data.emailAddress,
			&data.firstName,
			&data.lastName,
			&data.middleName,
		)
		if err != nil {
			revel.INFO.Println("Error executing query", err)
			return nil, err
		}
	}

	return mapDataToUser(data), nil
}

// CreateUser attempts to save user data to the database
func (db UserMySQLRepository) CreateUser(user *models.User) (int, error) {
	var userID int
	sqlString := `
		INSERT INTO tblUser (UserName, EmailAddress, PasswordHash) VALUES (?, ?, ?);
		SELECT LAST_INSERT_ID();
	`

	stmt, err := app.DB.Prepare(sqlString)
	if err != nil {
		revel.INFO.Println("Error preparing statement", err)
		return -1, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(user.UserName(), user.EmailAddress(), user.PasswordHash())
	if err != nil {
		revel.INFO.Println("Error executing query", err)
		return -1, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&userID)
		if err != nil {
			revel.INFO.Println("Error executing query", err)
			return -1, err
		}
	}
	return userID, nil
}

func mapDataToUser(data UserResponse) *models.User {
	u := models.User{}
	u.SetID(data.id)
	u.SetEmailAddress(data.emailAddress)
	u.SetUserName(data.userName)

	return &u
}
