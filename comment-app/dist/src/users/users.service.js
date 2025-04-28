"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
    }
    create(createUserDto) {
        const user = { id: Date.now(), ...createUserDto };
        this.users.push(user);
        return user;
    }
    createUser(createUserDto) {
        // Logic to create a user
        return { message: 'User created successfully', user: createUserDto };
    }
    getUserById(id) {
        // Replace the following with actual logic to retrieve a user by ID
        return { id, name: 'Sample User', email: 'sample@example.com' };
    }
    async loginUser(loginUserDto) {
        // Implement the logic for user login here
        return { message: 'User logged in successfully', user: loginUserDto };
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        return this.users.find(user => user.id === id);
    }
    update(id, updateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
            return this.users[userIndex];
        }
        return null;
    }
    remove(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            return this.users.splice(userIndex, 1);
        }
        return null;
    }
};
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
