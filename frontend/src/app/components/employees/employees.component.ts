import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

import { EmployeeService } from '../../services/employee.service'

declare var M: any

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form)
          M.toast({ html: 'Updated Successfully' })
          this.getEmployees()
        })
    } else {
      this.employeeService.postEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form)
          M.toast({ html: 'Save Successfully' })
          this.getEmployees()
        })
    }
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[]
        console.log(res);
      })
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee
  }

  deleteEmployee(_id: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmployees()
          M.toast({ html: 'Deleted Successfully' })
        })
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset()
      this.employeeService.selectedEmployee = new Employee()
    }
  }

}
