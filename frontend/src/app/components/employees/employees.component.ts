import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service'
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee'

//declare var M: any

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

  addEmployee(form?: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(res => {
        this.resetForm(form)
        this.getEmployees()
      })
    } else {
      this.employeeService.postEmployee(form.value).subscribe(res => {
        this.getEmployees()
        this.resetForm(form)
      })
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employeeService.employees = res
    })
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee
  }

  deleteEmployee(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete it?')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmployees()
          this.resetForm(form)
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