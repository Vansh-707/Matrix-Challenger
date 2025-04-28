import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: Array<{ id: number } & CreateUserDto> = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new User();
    user.email = createUserDto.email;
    user.password = hashedPassword;
    // Save user to database (pseudo-code)
    return user;
  }

  async login(loginDto: { email: string; password: string }): Promise<{ accessToken: string }> {
    const user = await this.findUserByEmail(loginDto.email); // Pseudo-code for fetching user
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  private async findUserByEmail(email: string): Promise<User | undefined> {
    // Pseudo-code for finding user by email
    return undefined;
  }

  create(createUserDto: CreateUserDto) {
    const user = { id: Date.now(), ...createUserDto };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: Partial<CreateUserDto>) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
      return this.users[userIndex];
    }
    return null;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      return this.users.splice(userIndex, 1);
    }
    return null;
  }
}