package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

/* --- ระบบบันทึกข้อมูลคนไข้ ---*/
/* Patient */

/** START step 6 ดึงข้อมูลทั้งหมด() */ // ระบบสั่งจ่ายยา
// GET /patients/:id
func ListPetients(c *gin.Context) {
	var patients []entity.Patient

	if err := entity.DB().Raw("SELECT * FROM patients").Scan(&patients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patients})
}

/** START step 6 ดึงข้อมูลทั้งหมด() */ // ระบบสั่งจ่ายยา
