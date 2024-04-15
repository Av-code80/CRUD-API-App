import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  CreateEmployeeParams,
  CreateEmployeeSchema,
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import {
  GetEmployeeByIdParams,
  GetEmployeeByIdSchema,
} from "@/domain/params/employee.param";
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
        `${API_BASE_URL}/employee/${validatedParams.id}`
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
        body: JSON.stringify(validatedParams),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to create employee: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      return EmployeeSchema.parse(json.data);
    } catch (error) {
      console.error("Error creating employee: ", error);
      throw error;
    }
  }
}
