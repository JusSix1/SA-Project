import { EmployeesInterface } from "../employee/IEmployee";
import { Patient_RightsInterface } from "./IPatient_Rights";

export interface PatientsInterface {
	ID:						number,

    Patient_Personal_ID:  	string,

	Employee_ID: 			number,

	Employee:				EmployeesInterface,

	Patient_Firstname:    	string,

	Patient_Lastname:     	string,

	Patient_RightsID:       number,

	Patient_Rights:			Patient_RightsInterface,

	Blood_ID:             	number,
  }
  