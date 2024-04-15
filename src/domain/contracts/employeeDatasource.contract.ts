import {
  CreateEmployeeParams,
  EmployeeListModel,
  EmployeeModel,
  UpdateEmployeeParams,
} from "../models/employee.model";
import {
  GetEmployeeByIdParams,
} from "../params/employee.param";

export default abstract class EmployeeDatasourceContract {
  public abstract getEmployeeList(): Promise<EmployeeListModel | undefined>;
  public abstract createEmployee(
    params: CreateEmployeeParams
  ): Promise<EmployeeModel | undefined>;
  public abstract getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined>;
  public abstract updateEmployeeById(
    params: UpdateEmployeeParams
  ): Promise<EmployeeModel | undefined>;
  public abstract deleteEmployeeById(): Promise<void>;
}
