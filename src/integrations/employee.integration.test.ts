import { App } from '../app';

describe('Employee CRUD Integration Tests (Level 1)', () => {
    let app: App;

    beforeEach(() => {
        app = new App();
    });

    describe('Authenticated CRUD Workflow', () => {
        it('should perform full CRUD cycle after login', () => {
            // Login
            const loggedIn = app.login('admin', 'pass123');
            expect(loggedIn).toBe(true);

            // Create
            const emp = app.createEmployee('John Doe', 'Driver');
            expect(emp.id).toBeDefined();
            expect(emp.name).toBe('John Doe');
            expect(emp.role).toBe('Driver');

            // View
            const viewed = app.viewEmployee(emp.id);
            expect(viewed).toEqual(emp);

            // Update
            const updated = app.updateEmployee(emp.id, 'Jane Doe', 'Manager');
            expect(updated.name).toBe('Jane Doe');
            expect(updated.role).toBe('Manager');

            // Delete
            app.deleteEmployee(emp.id);
            const deleted = app.viewEmployee(emp.id);
            expect(deleted).toBeUndefined();
        });

        it('should create and view multiple employees sequentially', () => {
            app.login('admin', 'pass123');
            const emp1 = app.createEmployee('John Doe', 'Driver');
            const emp2 = app.createEmployee('Jane Smith', 'Manager');
            expect(app.viewEmployee(emp1.id)).toEqual(emp1);
            expect(app.viewEmployee(emp2.id)).toEqual(emp2);
        });

        it('should update and verify employee without affecting others', () => {
            app.login('admin', 'pass123');
            const emp1 = app.createEmployee('John Doe', 'Driver');
            const emp2 = app.createEmployee('Jane Smith', 'Manager');
            const updated = app.updateEmployee(emp1.id, 'John Smith', 'Supervisor');
            expect(updated.name).toBe('John Smith');
            expect(app.viewEmployee(emp2.id)).toEqual(emp2);
        });
    });

    describe('Unauthenticated Operations', () => {
        it('should fail to create employee without login', () => {
            expect(() => app.createEmployee('John Doe', 'Driver')).toThrow('Not authenticated');
        });

        it('should fail to view employee without login', () => {
            app.login('admin', 'pass123');
            const emp = app.createEmployee('John Doe', 'Driver');
            app = new App(); // Reset to unauthenticated
            expect(() => app.viewEmployee(emp.id)).toThrow('Not authenticated');
        });

        it('should fail to update employee without login', () => {
            expect(() => app.updateEmployee('emp-1', 'Jane Doe', 'Manager')).toThrow('Not authenticated');
        });

        it('should fail to delete employee without login', () => {
            expect(() => app.deleteEmployee('emp-1')).toThrow('Not authenticated');
        });
    });

    describe('Multiple Employee Interactions', () => {
        it('should create, update, and delete multiple employees', () => {
            app.login('admin', 'pass123');
            const emp1 = app.createEmployee('John Doe', 'Driver');
            const emp2 = app.createEmployee('Jane Smith', 'Manager');
            app.updateEmployee(emp1.id, 'John Smith', 'Supervisor');
            app.deleteEmployee(emp2.id);
            expect(app.viewEmployee(emp1.id)?.name).toBe('John Smith');
            expect(app.viewEmployee(emp2.id)).toBeUndefined();
        });

        it('should handle concurrent employee creation and retrieval', () => {
            app.login('admin', 'pass123');
            const emp1 = app.createEmployee('John Doe', 'Driver');
            const emp2 = app.createEmployee('Jane Smith', 'Manager');
            const emp3 = app.createEmployee('Bob Johnson', 'Clerk');
            expect(app.viewEmployee(emp1.id)).toEqual(emp1);
            expect(app.viewEmployee(emp2.id)).toEqual(emp2);
            expect(app.viewEmployee(emp3.id)).toEqual(emp3);
        });
    });

    describe('Edge Cases and Errors', () => {
        it('should fail to update non-existent employee after login', () => {
            app.login('admin', 'pass123');
            expect(() => app.updateEmployee('non-existent', 'Jane Doe', 'Manager')).toThrow('Employee not found');
        });

        it('should fail to delete non-existent employee after login', () => {
            app.login('admin', 'pass123');
            expect(() => app.deleteEmployee('non-existent')).toThrow('Employee not found');
        });

        it('should fail to login with invalid credentials', () => {
            const loggedIn = app.login('wrong', 'wrong');
            expect(loggedIn).toBe(false);
            expect(() => app.createEmployee('John Doe', 'Driver')).toThrow('Not authenticated');
        });
    });

    describe('Sequential Operations', () => {
        it('should handle sequential create, update, and delete with re-authentication', () => {
            // First login
            app.login('admin', 'pass123');
            const emp = app.createEmployee('John Doe', 'Driver');

            // Re-authenticate
            app.login('admin', 'pass123');
            const updated = app.updateEmployee(emp.id, 'Jane Doe', 'Manager');
            expect(updated.name).toBe('Jane Doe');

            // Delete
            app.deleteEmployee(emp.id);
            expect(app.viewEmployee(emp.id)).toBeUndefined();
        });

        it('should maintain state across multiple operations', () => {
            app.login('admin', 'pass123');
            const emp1 = app.createEmployee('John Doe', 'Driver');
            app.updateEmployee(emp1.id, 'John Smith', 'Supervisor');
            const emp2 = app.createEmployee('Jane Smith', 'Manager');
            app.deleteEmployee(emp1.id);
            expect(app.viewEmployee(emp1.id)).toBeUndefined();
            expect(app.viewEmployee(emp2.id)).toEqual(emp2);
        });
    });
});