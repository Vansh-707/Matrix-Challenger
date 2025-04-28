import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: CreateUserDto;
    }>;
    getUser(id: string): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    loginUser(loginUserDto: CreateUserDto): Promise<any>;
}
