/**
 * EmployeeCard Component
 * @description Displays individual employee information in a card format.
 * @param {EmployeeCardProps} props The properties passed to the EmployeeCard component.
 * @returns {ReactNode} A stylized card displaying employee details.
 */

import EmployeeFormatter from "@/utils/formatters/employee.formatter";
import { EmployeeModel } from "@/domain/models/employee.model";
import { ReactNode } from "react";

export interface EmployeeCardProps {
  employee: EmployeeModel;
}

const EmployeeCard = ({ employee }: EmployeeCardProps): ReactNode => {
  return (
    <div
      className="p-4 flex gap-4 transition duration-300 ease-in-out transform hover:scale-105 items-center justify-between bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg shadow-lg text-white"
      aria-label={`Employee ID ${employee.id} details`}
    >
      <div className="flex items-center gap-2">
        <span className="font-bold">ID:</span>
        <span>{employee.id}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">Name:</span>
        <span>{employee.employee_name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">Salary:</span>
        <span>{EmployeeFormatter.formatSalary(employee.employee_salary)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">Age:</span>
        <span>{employee.employee_age}</span>
      </div>
    </div>
  );
};

export default EmployeeCard;
