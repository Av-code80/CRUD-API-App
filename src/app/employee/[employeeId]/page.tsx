/**
 * DetailsEmployeePage Component
 * @description Displays details for a specific employee and allows for operations like editing and deleting that employee.
 * @returns {React.Component} The React component displaying detailed employee information.
 */
"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";

export default function DetailsEmployeePage() {
  const params = useParams();
  const employeeId = params.employeeId as string;
  const employeeIdNum = parseInt(employeeId, 10);
  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeById(employeeIdNum);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div
          role="alert"
          aria-busy="true"
          className="text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 animate-pulse"
        >
          Loading...
        </div>
      </div>
    );
  }

  if (!employee && isError) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div
          role="alert"
          className="text-lg font-bold text-white bg-red-500 rounded-lg p-3 shadow-lg animate-pulse"
        >
          An error occurred while fetching the employee details.
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-20 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
      <h1 className="text-2xl font-bold text-sky-800">Employee Details</h1>
      {employee && <EmployeeCard employee={employee} />}
      {employee && (
        <div className="flex space-x-4">
          <Link
            href={`/employee/${employee?.id}/edit`}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
            aria-label="Edit employee"
          >
            ✏️ Edit
          </Link>
          <button
            
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-700"
            aria-label="Delete employee"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </main>
  );
}