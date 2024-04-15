import { useQuery } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeById = (employeeId: number) => {
    return useQuery({
      queryKey: ["getemployeeById", employeeId],
      queryFn: () => service.getEmployeeById({id: employeeId}),
    });
}