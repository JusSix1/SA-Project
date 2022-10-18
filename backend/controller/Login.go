package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

/* --- ระบบ Login ---*/
// GET /login
func ListEmployeesLogin(c *gin.Context) {
	var employees []entity.Employee

	if err := entity.DB().Raw("SELECT * FROM employees").Scan(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employees})
}

// POST /login
func Authorize(c *gin.Context) { // gin.Context มีรายละเอียดของ request, validates, จัดรูปแบบเป็น JSON
	var dispensation entity.Dispensation

	// if err := c.ShouldBindJSON(&dispensation); err != nil { // ตรวจสอบว่า JSON ที่ผ่านเข้ามามีรูปแบบตรงกับที่กำหนดไว้ในDBหรือไม่
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// if err := entity.DB().Create(&dispensation).Error; err != nil { // สร้าง DB พร้อมเช็คว่าสร้างสำเร็จหรือไม่
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{"data": dispensation}) // respone ว่าผ่าน และส่งข้อมูลกลับไป
}
