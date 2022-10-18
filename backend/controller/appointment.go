package controller

import (
	"net/http"

	"github.com/JusSix1/sa-project/entity"
	"github.com/asaskevich/govalidator"

	"github.com/gin-gonic/gin"
)

// POST
func CraeteAppointment(c *gin.Context) {

	var appointment entity.Appointment
	var patinent entity.Patient
	var department entity.Department

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร appointment
	if err := c.ShouldBindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.Patient_ID).First(&patinent); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	// ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	// 10: สร้าง Appointment
	app := entity.Appointment{
		Employee_ID:  appointment.Employee_ID,
		Patient_ID:   appointment.Patient_ID,
		App_Out:      appointment.App_Out.Local(),
		App_In:       appointment.App_In.Local(),
		App_Note:     appointment.App_Note,
		DepartmentID: appointment.DepartmentID,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(app); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 11: บันทึก
	if err := entity.DB().Create(&app).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": appointment})
}

// GET /Appoinment/:id
func GetAppointment(c *gin.Context) {
	var appointment []entity.Appointment
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&appointment); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "appointment not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": appointment})
}

// GET /Appoinment
func ListAppointment(c *gin.Context) {
	var appointment []entity.Appointment
	if err := entity.DB().Preload("Employee").Preload("Patient").Preload("Department").Raw("SELECT * FROM appointments").Find(&appointment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": appointment})
}

// GET /Patient
func Patient(c *gin.Context) {
	var patinent []entity.Patient
	if err := entity.DB().Raw("SELECT * FROM patients").Scan(&patinent).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": patinent})
}

// GET /Department
func Department(c *gin.Context) {
	var department []entity.Department
	if err := entity.DB().Raw("SELECT * FROM departments").Scan(&department).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": department})
}
