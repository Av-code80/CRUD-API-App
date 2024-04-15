import {
  EmployeeListModel,
  EmployeeModel,
} from "../models/employee.model";
import {
  GetEmployeeByIdParams,
} from "../params/employee.param";

export default abstract class EmployeeDatasourceContract {
  public abstract getEmployeeList(): Promise<EmployeeListModel | undefined>;
  public abstract createEmployee(
  ): Promise<EmployeeModel | undefined>;
  public abstract getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined>;
  public abstract updateEmployeeById(): Promise<EmployeeModel | undefined>;
  public abstract deleteEmployeeById(): Promise<void>;
}
