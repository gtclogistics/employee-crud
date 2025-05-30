"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
describe('AuthService (Developer Unit Tests)', () => {
    let service;
    beforeEach(() => {
        service = new auth_service_1.AuthService();
    });
    it('should return true for valid credentials', () => {
        expect(service.login('admin', 'pass123')).toBe(true);
    });
    it('should return false for invalid password', () => {
        expect(service.login('admin', 'wrong')).toBe(false);
    });
});
describe('AuthService (Testing Team Unit Tests)', () => {
    let service;
    beforeEach(() => {
        service = new auth_service_1.AuthService();
    });
    it('should return false for non-existent user', () => {
        expect(service.login('unknown', 'pass123')).toBe(false);
    });
    it('should return false for empty credentials', () => {
        expect(service.login('', '')).toBe(false);
    });
});
