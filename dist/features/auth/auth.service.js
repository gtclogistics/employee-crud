"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor() {
        this.users = [{ username: 'admin', password: 'pass123' }];
    }
    login(username, password) {
        return this.users.some(u => u.username === username && u.password === password);
    }
}
exports.AuthService = AuthService;
