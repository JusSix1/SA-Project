package main

import (
	appointment_controller "github.com/non-nattawut/patient-management-system/controller/appointment"
	BillController "github.com/non-nattawut/patient-management-system/controller/bill"
	bloodgroups_controller "github.com/non-nattawut/patient-management-system/controller/bloodgroups"
	department_controller "github.com/non-nattawut/patient-management-system/controller/department"
	diagnostic_controller "github.com/non-nattawut/patient-management-system/controller/diagnostic"
	dispensation_controller "github.com/non-nattawut/patient-management-system/controller/dispensation"
	employee_controller "github.com/non-nattawut/patient-management-system/controller/employee"
	login_controller "github.com/non-nattawut/patient-management-system/controller/login"
	patient_controller "github.com/non-nattawut/patient-management-system/controller/patient"
	patient_rights_controller "github.com/non-nattawut/patient-management-system/controller/patient_rights"
	"github.com/non-nattawut/patient-management-system/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	// login User Route
	r.POST("/login", login_controller.Login)

	//Department
	r.GET("/departments", department_controller.ListDepartment)

	//bloodgroups
	r.GET("/bloodgroups", bloodgroups_controller.ListBloodGroups)

	//patient_rights
	r.GET("/patientrights", patient_rights_controller.ListPatientRights)

	//gender
	r.GET("/genders", employee_controller.ListGenders)

	//position
	r.GET("/positions", employee_controller.ListPosition)

	//Employee
	r.POST("/employees", employee_controller.CreateEmployees)
	r.GET("/employees", employee_controller.ListEmployees)

	//didpensation
	r.GET("/dispensations", dispensation_controller.ListDispensations)
	r.POST("/dispensations", dispensation_controller.CreateDispensation)
	r.GET("/dispensations_table", dispensation_controller.ListDispensationsTable)
	r.GET("/medicines", dispensation_controller.ListMedicines)

	r.POST("/dispensation_medicines", dispensation_controller.CreateDispensationMedicine)
	r.GET("/dispensation_medicines", dispensation_controller.ListDispensationMedicinesTable)

	//appointment
	r.POST("/appointment", appointment_controller.CraeteAppointment)
	r.GET("/appoinment/:id", appointment_controller.GetAppointment)
	r.GET("/appointment", appointment_controller.ListAppointment)

	//patient
	r.POST("/patients", patient_controller.CreatePatients)
	r.GET("/patients", patient_controller.ListPetients)
	r.GET("/patient_table", patient_controller.ListPetients_Table)

	// Bill Routes
	r.GET("/paymenttype", BillController.ListPaymentType)

	r.GET("/bill", BillController.ListBill)
	r.GET("/bill/:id", BillController.GetBill)
	r.POST("/bill", BillController.CreateBill)
	r.PATCH("/bill", BillController.UpdateBill)
	r.DELETE("/bill/:id", BillController.DeleteBill)

	r.GET("/dispensations_bill", dispensation_controller.ListDispensations_Bill)
	r.GET("/bill_join", BillController.ListBill_Join)
	r.GET("/diagnostic", diagnostic_controller.ListDiagnostics_Bill)

	// Diagnostic Routes
	r.GET("/diagnostics", diagnostic_controller.ListDiagnostics)
	r.GET("/diagnostic/:id", diagnostic_controller.GetDiagnostic)
	r.POST("/diagnostics", diagnostic_controller.CreateDiagnostic)
	r.PATCH("/diagnostics", diagnostic_controller.UpdateDiagnostic)
	r.DELETE("/diagnostics/:id", diagnostic_controller.DeleteDiagnostic)
	r.GET("/diagnostictypes", diagnostic_controller.ListDiagnostic_Types) // Diagnostic_Type Route
	r.GET("/diseases", diagnostic_controller.ListDiseases)                // Disease Routes

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
