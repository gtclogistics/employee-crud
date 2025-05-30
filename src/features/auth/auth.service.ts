import { User } from '../../types';

export class AuthService {
    private users: User[] = [{ username: 'admin', password: 'pass123' }];

    login(username: string, password: string): boolean {
        return this.users.some(u => u.username === username && u.password === password);
    }
}