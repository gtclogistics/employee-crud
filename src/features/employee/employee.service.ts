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

    viewEmployee(id: string): Employee | undefined {
        if (!id) throw new Error('ID cannot be empty');
        return this.employees.find(e => e.id === id);
    }

    updateEmployee(id: string, name: string, role: string): Employee {
        if (!name || !role) throw new Error('Name and role are required');
        const employee = this.employees.find(e => e.id === id);
        if (!employee) throw new Error('Employee not found');
        employee.name = name;
        employee.role = role;
        return employee;
    }

    deleteEmployee(id: string): void {
        const index = this.employees.findIndex(e => e.id === id);
        if (index === -1) throw new Error('ID cannot be empty');
        this.employees.splice(index, 1);
    }
}