import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CompanySchema = new mongoose.Schema({
  name: String
})

const Company = mongoose.model('Company', CompanySchema)

const EmployeeSchema = new mongoose.Schema({
  email: String,
  companyId: String
})

EmployeeSchema.methods.company = function() {
  console.log(Company.findById(this.companyId).exec())
  return Company.findById(this.companyId).exec()
}

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = { Employee, Company }
