import { AuthService } from './features/auth/auth.service';
import { EmployeeService } from './features/employee/employee.service';
import {Employee} from "./types";

export class App {
    private authService: AuthService;
    private employeeService: EmployeeService;
    private loggedIn: boolean = false;

    constructor() {
        this.authService = new AuthService();
        this.employeeService = new EmployeeService();
    }

    login(username: string, password: string): boolean {
        this.loggedIn = this.authService.login(username, password);
        return this.loggedIn;
    }

    isAuthenticated(): boolean {
        return this.loggedIn;
    }

    createEmployee(name: string, role: string): Employee {
        if (!this.isAuthenticated()) throw new Error('Not authenticated');
        return this.employeeService.createEmployee(name, role);
    }

    viewEmployee(id: string): Employee | undefined {
        if (!this.isAuthenticated()) throw new Error('Not authenticated');
        return this.employeeService.viewEmployee(id);
    }

    updateEmployee(id: string, name: string, role: string): Employee {
        if (!this.isAuthenticated()) throw new Error('Not authenticated');
        return this.employeeService.updateEmployee(id, name, role);
    }

    deleteEmployee(id: string): void {
        if (!this.isAuthenticated()) throw new Error('Not authenticated');
        this.employeeService.deleteEmployee(id);
    }
}