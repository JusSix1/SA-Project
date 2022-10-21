package main

import (
	department_controller "github.com/non-nattawut/patient-management-system/controller/department"

	gender_controller "github.com/non-nattawut/patient-management-system/controller/gender"

	bloodGroups_controller "github.com/non-nattawut/patient-management-system/controller/bloodGroups"

	position_controller "github.com/non-nattawut/patient-management-system/controller/position"

	employee_controller "github.com/non-nattawut/patient-management-system/controller/employee"

	dispensation_controller "github.com/non-nattawut/patient-management-system/controller/dispensation"

	patient_controller "github.com/non-nattawut/patient-management-system/controller/patient"

	appointment_controller "github.com/non-nattawut/patient-management-system/controller/appointment"

	"github.com/non-nattawut/patient-management-system/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	//department
	r.GET("/departments", department_controller.ListDepartment)

	//gender
	r.GET("/genders", gender_controller.ListGenders)

	//bloodGroups
	r.GET("/bloodGroups", bloodGroups_controller.ListBloodGroups)

	//position
	r.GET("/positions", position_controller.ListPosition)

	//Employee
	r.POST("/employees", employee_controller.CreateEmployees)
	r.GET("/employees", employee_controller.ListEmployees)

	//Patient
	r.GET("/patients", patient_controller.ListPetients)

	//dispensation
	r.GET("/dispensations", dispensation_controller.ListDispensations)
	r.GET("/dispensation/:id", dispensation_controller.GetDispensation)
	r.POST("/dispensations", dispensation_controller.CreateDispensation)
	r.PATCH("/dispensations", dispensation_controller.UpdateDispensation)
	r.DELETE("/dispensation/:id", dispensation_controller.DeleteDispensation)

	r.POST("/dispensation_medicines", dispensation_controller.CreateDispensationMedicine)

	//Appointment
	r.POST("/appointment", appointment_controller.CraeteAppointment)
	r.GET("/appointment/:id", appointment_controller.GetAppointment)
	r.GET("/appointment", appointment_controller.ListAppointment)

	r.GET("/medicines", dispensation_controller.ListMedicines)

	r.Run() // run server
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return

		}
		c.Next()
	}
}
