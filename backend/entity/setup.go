package entity

import (
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("Patient-Management-System.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Department{},
		&Position{},
		&BloodGroups{},
		&Gender{},
		&Employee{},

		&Patient_Rights{},
		&Patient{},

		&Disease{},
		&Diagnostic_Type{},
		&Diagnostic{},

		&Medicine{},
		&Dispensation{},
		&Dispensation_Medicine{},

		&Appointment{},

		&Payment_type{},
		&Bill{},
	)

	db = database

	//Department
	eye := Department{
		Department_NAME: "ตา",
	}
	db.Model(&Department{}).Create(&eye)

	normal := Department{
		Department_NAME: "ทั่วไป",
	}
	db.Model(&Department{}).Create(&normal)

	// Position
	doc := Position{
		Position_Name: "หมอ",
	}
	db.Model(&Position{}).Create(&doc)

	n := Position{
		Position_Name: "พยาบาล",
	}
	db.Model(&Position{}).Create(&n)

	//BG
	A := BloodGroups{
		Blood_Groups_Name: "A",
	}
	db.Model(&BloodGroups{}).Create(&A)

	B := BloodGroups{
		Blood_Groups_Name: "B",
	}
	db.Model(&BloodGroups{}).Create(&B)

	//Gender
	male := Gender{
		Gender_Name: "Male",
	}
	db.Model(&Gender{}).Create(&male)

	female := Gender{
		Gender_Name: "Female",
	}
	db.Model(&Gender{}).Create(&female)

	//Patient_Rights

	G := Patient_Rights{
		Right_Name: "บัตรทอง",
	}
	db.Model(&Patient_Rights{}).Create(&G)

	P := Patient_Rights{
		Right_Name: "ประกันสังคม",
	}
	db.Model(&Patient_Rights{}).Create(&P)

	// Patient
	P1 := Patient{
		Patient_Personal_ID: "1319800334497",
	}
	P2 := Patient{
		Patient_Personal_ID: "1234567890123",
		Patient_Firstname:   "B",
		Patient_Lastname:    "BB",
	}
	P3 := Patient{
		Patient_Personal_ID: "0987654321123",
		Patient_Firstname:   "C",
		Patient_Lastname:    "CC",
	}
	db.Model(&Patient{}).Create(&P1)
	db.Model(&Patient{}).Create(&P2)
	db.Model(&Patient{}).Create(&P3)

	// Employee
	E1 := Employee{
		Personal_ID: "1231235675623",
		First_Name:  "Doc.1",
		Last_Name:   "Tor.1",
	}
	E2 := Employee{
		Personal_ID: "7838591276903",
		First_Name:  "Doc.2",
		Last_Name:   "Tor.2",
	}
	E3 := Employee{
		Personal_ID: "9082345567446",
		First_Name:  "Doc.3",
		Last_Name:   "Tor.3",
	}
	db.Model(&Employee{}).Create(&E1)
	db.Model(&Employee{}).Create(&E2)
	db.Model(&Employee{}).Create(&E3)

	// Medicine
	M1 := Medicine{
		Medicine_Name:  "ยาแก้ไอ",
		Medicine_Price: 300,
		Medicine_Unit:  "ml",
	}
	db.Model(&Medicine{}).Create(&M1)

	M2 := Medicine{
		Medicine_Name:  "ยาแก้ปวด",
		Medicine_Price: 12,
		Medicine_Unit:  "tablet",
	}
	db.Model(&Medicine{}).Create(&M2)

	M3 := Medicine{
		Medicine_Name:  "ยาขับเสมหะ",
		Medicine_Price: 300,
		Medicine_Unit:  "tablet",
	}
	db.Model(&Medicine{}).Create(&M3)

}
