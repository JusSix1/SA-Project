package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

/* --- ระบบบันทึข้อมูลบุคลากร --- */

// POST /employees

func CreateEmployees(c *gin.Context) {

	var employee entity.Employee
	var gender entity.Gender
	var bloodGrouds entity.BloodGroups
	var department entity.Department
	var position entity.Position

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร appointment
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if employee.First_Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "firstName invalid"})
		return
	}

	if employee.Last_Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "lastName invalid"})
		return
	}

	if employee.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password invalid"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// ค้นหา bloodGroups ด้วย id
	if tx := entity.DB().Where("id = ?", employee.BloodGroupsID).First(&bloodGrouds); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bloodGrouds not found"})
		return
	}

	// ค้นหา position ด้วย id
	if tx := entity.DB().Where("id = ?", employee.PositionID).First(&position); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "position not found"})
		return
	}

	// ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", employee.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	// 10: สร้าง Appointment
	emp := entity.Employee{
		Personal_ID:   employee.Personal_ID,
		First_Name:    employee.First_Name,
		Last_Name:     employee.Last_Name,
		GenderID:      employee.GenderID,
		BloodGroupsID: employee.BloodGroupsID,
		DepartmentID:  employee.DepartmentID,
		PositionID:    employee.PositionID,
		Password:      employee.Password,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(emp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&emp).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": employee})

}

// GET /employee/:id
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM employees WHERE id = ?", id).Scan(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /employee
func ListEmployees(c *gin.Context) {
	var employees []entity.Employee

	if err := entity.DB().Raw("SELECT * FROM employees").Scan(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employees})
}
