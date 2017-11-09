package repositories

import (
	"b2g/app"
	"b2g/app/models"
	"database/sql"
	"strings"

	"github.com/revel/revel"
)

// @TODO maybe can make use of the template engine to build sql queries
const (
	userSelectSQL = `
		SELECT 	u.ID, 
						u.UserName, 
						u.EmailAddress,
						u.PasswordHash,
						up.FirstName,
						up.LastName,
						up.MiddleName
	`
)

// UserRepository is the interface that all repositories must implement
type UserRepository interface {
	GetByID(id int) (*models.User, error)
	GetByUserName(username string) (*models.User, error)
	GetByEmailAddress(email string) (*models.User, error)
	CreateUser(user *models.User) (int64, error)
}

// UserMySQLRepository handles all user data storage requests for the MySQL data store
type UserMySQLRepository struct{}

// UserResponse is just there to grab the columns of the DB queries since UserModel props are private
type UserResponse struct {
	id           int
	username     string
	emailAddress string
	passwordHash string
	firstName    sql.NullString
	lastName     sql.NullString
	middleName   sql.NullString
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
// builds the sql to query for user based on username
func (db UserMySQLRepository) GetByUserName(username string) (*models.User, error) {
	var sqlParts []string
	sqlParts = append(sqlParts, userSelectSQL)
	sqlParts = append(sqlParts, `
		FROM tblUser u
		LEFT JOIN tblUserProfile up ON u.ID = up.UserID
		WHERE UserName=?;`)

	return db.processGetUserQuery(strings.Join(sqlParts, " "), username)
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
			&data.username,
			&data.emailAddress,
			&data.passwordHash,
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
func (db UserMySQLRepository) CreateUser(user *models.User) (int64, error) {
	var userID int64
	sqlString := `
		INSERT INTO tblUser (UserName, EmailAddress, PasswordHash) VALUES (?, ?, ?);
	`

	stmt, err := app.DB.Prepare(sqlString)
	if err != nil {
		revel.INFO.Println("Error preparing statement", err)
		return -1, err
	}
	defer stmt.Close()

	res, err := stmt.Exec(user.UserName(), user.EmailAddress(), user.PasswordHash())
	if err != nil {
		revel.INFO.Println("Error executing query", err)
		return -1, err
	}

	userID, err = res.LastInsertId()
	if err != nil {
		revel.INFO.Println("Failed creating user", err)
		return -1, err
	}

	return userID, nil
}

func mapDataToUser(data UserResponse) *models.User {
	u := models.User{}
	u.SetID(data.id)
	u.SetEmailAddress(data.emailAddress)
	u.SetUserName(data.username)
	u.SetPasswordHash(data.passwordHash)

	return &u
}
