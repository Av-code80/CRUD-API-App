import { useMutation } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useDeleteEmployee = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (employeeId) => {
      await service.deleteEmployeeById(employeeId);
    },
  });
};
