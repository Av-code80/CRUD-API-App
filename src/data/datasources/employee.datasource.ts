import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  CreateEmployeeParams,
  CreateEmployeeSchema,
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
  GetEmployeeByIdParams,
  GetEmployeeByIdSchema,
  UpdateEmployeeParams,
  UpdateEmployeeSchema,
} from "@/domain/models/employee.model";
import { API_BASE_URL } from "./config";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch employees: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      return EmployeeListSchema.parse(json.data);
    } catch (error) {
      console.error("Error fetching employees: ", error);
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    try {
      const validatedParams = GetEmployeeByIdSchema.parse(params);
      const response = await fetch(
        `${API_BASE_URL}/employee/${validatedParams.id}, {cache: "force-cache"}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch employee details: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      return EmployeeSchema.parse(json.data);
    } catch (error) {
      console.error("Error fetching employee details: ", error);
      return undefined;
    }
  }

  public async createEmployee(
    params: CreateEmployeeParams
  ): Promise<EmployeeModel> {
    const validatedParams = CreateEmployeeSchema.parse(params);
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validatedParams.name,
          salary: validatedParams.salary,
          age: parseInt(validatedParams.age, 10),
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to create employee: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      return EmployeeSchema.parse({
        id: Number(json.data.id),
        employee_name: json.data.name,
        employee_salary: Number(json.data.salary),
        employee_age: Number(json.data.age),
      });
    } catch (error) {
      console.error("Error creating employee: ", error);
      throw error;
    }
  }

  public async updateEmployeeById(
    params: UpdateEmployeeParams
  ): Promise<UpdateEmployeeParams | undefined> {
    const validatedParams = UpdateEmployeeSchema.parse(params);
    try {
      const response = await fetch(
        `${API_BASE_URL}/update/${validatedParams.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          cache: "force-cache",
          body: JSON.stringify(validatedParams),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to update employee: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      return UpdateEmployeeSchema.parse(json.data);
    } catch (error) {
      console.error("Error updating employee: ", error);
      throw error;
    }
  }

  public async deleteEmployeeById(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete employee: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error deleting employee: ", error);
      throw error;
    }
  }
}
