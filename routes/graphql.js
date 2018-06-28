import express from 'express'
import graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { Company, Employee } from '../models/model'
const router = express.Router()
console.log('here')
const resolvers = {
  Query: {
    employee({ id }) {
      return Employee.findById(id)
    },
    employees() {
      return Employee.find({})
    },
    company({ id }) {
      return Company.findById(id)
    },
    companies() {
      return Company.find({})
    }
  },
  Mutation: {
    async createCompany(_, { input }) {
      return await Company.create(input)
    },
    async createEmployee(_, { input }) {
      return await Employee.create(input)
    }
  }
}

const typeDefs = `

type Company {
    _id: ID,
    name: String
  }

type Employee {
    _id: String
    email: String,
    company: Company
  }

type Query {
    employee(id: String!): Employee
    employees: [Employee]
    company(id: ID): Company
    companies: [Company]
}

input CompanyInput{
    name: String
}

input EmployeeInput {
    email: String
    companyId: ID
}

type Mutation {
    createCompany(input: CompanyInput): Company
    createEmployee(input: EmployeeInput): Employee
}

`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

router.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema
  })
)

module.exports = router
