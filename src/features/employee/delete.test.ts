import { EmployeeService } from './employee.service';

describe('EmployeeService Delete (Developer Unit Tests)', () => {
    let service: EmployeeService;

    beforeEach(() => {
        service = new EmployeeService();
    });

    it('should delete an existing employee', () => {
        const emp = service.createEmployee('John Doe', 'Driver');
        service.deleteEmployee(emp.id);
        const retrieved = service.viewEmployee(emp.id);
        expect(retrieved).toBeUndefined();
    });

    it('should throw error for non-existent employee', () => {
        expect(() => service.deleteEmployee('non-existent')).toThrow('Employee not found');
    });
});
describe('EmployeeService Delete (Testing Team Unit Tests)', () => {
    let service: EmployeeService;

    beforeEach(() => {
        service = new EmployeeService();
    });

    it('should throw error for empty ID', () => {
        expect(() => service.deleteEmployee('')).toThrow('ID cannot be empty');
    });

    it('should not affect other employees', () => {
        const emp1 = service.createEmployee('John Doe', 'Driver');
        const emp2 = service.createEmployee('Jane Smith', 'Manager');
        service.deleteEmployee(emp1.id);
        const emp2Retrieved = service.viewEmployee(emp2.id);
        expect(emp2Retrieved).toEqual(emp2);
    });
});