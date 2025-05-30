import { EmployeeService } from './employee.service';

describe('EmployeeService Update (Developer Unit Tests)', () => {
    let service: EmployeeService;

    beforeEach(() => {
        service = new EmployeeService();
    });

    it('should update an existing employee', () => {
        const emp = service.createEmployee('John Doe', 'Driver');
        const updated = service.updateEmployee(emp.id, 'Jane Doe', 'Manager');
        expect(updated.name).toBe('Jane Doe');
        expect(updated.role).toBe('Manager');
    });

    it('should throw error for non-existent employee', () => {
        expect(() => service.updateEmployee('non-existent', 'Jane Doe', 'Manager')).toThrow('Employee not found');
    });
});
describe('EmployeeService Update (Testing Team Unit Tests)', () => {
    let service: EmployeeService;

    beforeEach(() => {
        service = new EmployeeService();
    });

    it('should throw error for empty name', () => {
        const emp = service.createEmployee('John Doe', 'Driver');
        expect(() => service.updateEmployee(emp.id, '', 'Manager')).toThrow('Name and role are required');
    });

    it('should not affect other employees', () => {
        const emp1 = service.createEmployee('John Doe', 'Driver');
        const emp2 = service.createEmployee('Jane Smith', 'Manager');
        service.updateEmployee(emp1.id, 'John Smith', 'Supervisor');
        const emp2Retrieved = service.viewEmployee(emp2.id);
        expect(emp2Retrieved).toEqual(emp2);
    });
});