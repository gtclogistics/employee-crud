import { Employee } from '../../types';

export class EmployeeService {
    private employees: Employee[] = [];

    createEmployee(name: string, role: string): Employee {
        if (!name || !role) throw new Error('Name and role are required');
        const id = `emp-${this.employees.length + 1}`;
        const employee: Employee = { id, name, role };
        this.employees.push(employee);
        return employee;
    }
}