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
	D1 := Department{
		Department_Name: "IT",
	}
	db.Model(&Department{}).Create(&D1)

	D2 := Department{
		Department_Name: "MED",
	}
	db.Model(&Department{}).Create(&D2)

	D3 := Department{
		Department_Name: "ER",
	}
	db.Model(&Department{}).Create(&D3)

	D4 := Department{
		Department_Name: "OR",
	}
	db.Model(&Department{}).Create(&D4)

	D5 := Department{
		Department_Name: "LR",
	}
	db.Model(&Department{}).Create(&D5)

	D6 := Department{
		Department_Name: "OPD",
	}
	db.Model(&Department{}).Create(&D6)

	D7 := Department{
		Department_Name: "SUR",
	}
	db.Model(&Department{}).Create(&D7)

	D8 := Department{
		Department_Name: "ORTHO",
	}
	db.Model(&Department{}).Create(&D8)

	D9 := Department{
		Department_Name: "OB-GYN",
	}
	db.Model(&Department{}).Create(&D9)

	D10 := Department{
		Department_Name: "ANC",
	}
	db.Model(&Department{}).Create(&D10)

	D11 := Department{
		Department_Name: "IPD",
	}
	db.Model(&Department{}).Create(&D11)

	D12 := Department{
		Department_Name: "ENT",
	}
	db.Model(&Department{}).Create(&D12)

	D13 := Department{
		Department_Name: "ICU",
	}
	db.Model(&Department{}).Create(&D13)

	D14 := Department{
		Department_Name: "CCU",
	}
	db.Model(&Department{}).Create(&D14)

	D := Department{
		Department_Name: "Finance",
	}
	db.Model(&Department{}).Create(&D)

	//BG
	BG1 := BloodGroups{
		Blood_Groups_Name: "A RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG1)

	BG2 := BloodGroups{
		Blood_Groups_Name: "A RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG2)

	BG3 := BloodGroups{
		Blood_Groups_Name: "B RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG3)

	BG4 := BloodGroups{
		Blood_Groups_Name: "B RH-",
	}
	db.Model(&BloodGroups{}).Create(&BG4)

	BG5 := BloodGroups{
		Blood_Groups_Name: "AB RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG5)

	BG6 := BloodGroups{
		Blood_Groups_Name: "AB RH-",
	}
	db.Model(&BloodGroups{}).Create(&BG6)

	BG7 := BloodGroups{
		Blood_Groups_Name: "O RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG7)

	BG8 := BloodGroups{
		Blood_Groups_Name: "O RH-",
	}
	db.Model(&BloodGroups{}).Create(&BG8)

	//Gender
	male := Gender{
		Gender_Name: "Male",
	}
	db.Model(&Gender{}).Create(&male)

	female := Gender{
		Gender_Name: "Female",
	}
	db.Model(&Gender{}).Create(&female)

	//Position
	po1 := Position{
		Position_Name: "Admin",
	}
	db.Model(&Position{}).Create(&po1)

	po2 := Position{
		Position_Name: "Doctor",
	}
	db.Model(&Position{}).Create(&po2)

	po3 := Position{
		Position_Name: "Nurse",
	}
	db.Model(&Position{}).Create(&po3)

	po4 := Position{
		Position_Name: "Cashier",
	}
	db.Model(&Position{}).Create(&po4)

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
		Patient_Firstname:   "A",
		Patient_Lastname:    "AA",
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
