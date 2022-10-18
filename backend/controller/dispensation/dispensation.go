package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

/* --- ระบบสั่งจ่ายยา --- */
/* Dispensation */

// POST /dispensation/
func CreateDispensation(c *gin.Context) { // gin.Context มีรายละเอียดของ request, validates, จัดรูปแบบเป็น JSON
	var dispensation entity.Dispensation
	var patient entity.Patient
	var doctor entity.Employee

	if err := c.ShouldBindJSON(&dispensation); err != nil { // ตรวจสอบว่า JSON ที่ผ่านเข้ามามีรูปแบบตรงกับที่กำหนดไว้ในDBหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหาด้วย(Patient_Personal_ID)
	if tx := entity.DB().Where("id = ?", dispensation.Patient_ID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// ค้นหา doctor personal id (employee id)
	if tx := entity.DB().Where("id = ?", dispensation.Employee_ID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 11: สร้าง(Dispensation_ID, p, currentEmployee)
	d := entity.Dispensation{
		Patient:  patient, // โยงฐานข้อมูล
		Employee: doctor,  // โยงฐานข้อมูล
	}

	// 12: บันทึก_Dispensation
	if err := entity.DB().Create(&d).Error; err != nil { // สร้าง DB พร้อมเช็คว่าสร้างสำเร็จหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": d}) // respone ว่าผ่าน และส่งข้อมูลกลับไป
}

// GET /dispensation/:id
func GetDispensation(c *gin.Context) { // ดึงข้อมูลจาก dispensation id ที่กรอก
	var dispensation entity.Dispensation
	id := c.Param("id") // Dispensation ID

	if err := entity.DB().Raw("SELECT * FROM dispensations WHERE id = ?", id).Scan(&dispensation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dispensation})
}

/** START step 5 ดึงข้อมูลทั้งหมด() */
// GET /dispensations
func ListDispensations(c *gin.Context) { // ดึงข้อมูลทุกอย่างใน dispensation (เติม s เพราะดึงหลายตัว)
	var dispensations []entity.Dispensation

	if err := entity.DB().Raw("SELECT * FROM dispensations").Scan(&dispensations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dispensations})
}

/** END step 5 ดึงข้อมูลทั้งหมด() */

// DELETE /users/:id
func DeleteDispensation(c *gin.Context) { // ลบข้อมูล dispensation จาก id ที่กรอก
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM dispensations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateDispensation(c *gin.Context) { // update ข้อมูลใน dispensation นั้นๆ
	var dispensation entity.Dispensation

	// เทียบความตรงกันของประเภทข้อมูล
	if err := c.ShouldBindJSON(&dispensation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เช็คว่ามี ID ที่เราต้องการ updateอยู่จริงๆ
	if tx := entity.DB().Where("id = ?", dispensation.ID).First(&dispensation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// update ข้อมูล ด้วย .save
	if err := entity.DB().Save(&dispensation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dispensation})
}
