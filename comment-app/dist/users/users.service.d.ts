import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private users;
    create(createUserDto: CreateUserDto): {
        username?: string;
        password?: string;
        email?: string;
        id: number;
    };
    createUser(createUserDto: CreateUserDto): {
        message: string;
        user: CreateUserDto;
    };
    getUserById(id: string): {
        id: string;
        name: string;
        email: string;
    };
    loginUser(loginUserDto: CreateUserDto): Promise<any>;
    findAll(): ({
        id: number;
    } & CreateUserDto)[];
    findOne(id: number): ({
        id: number;
    } & CreateUserDto) | undefined;
    update(id: number, updateUserDto: Partial<CreateUserDto>): ({
        id: number;
    } & CreateUserDto) | null;
    remove(id: number): ({
        id: number;
    } & CreateUserDto)[] | null;
}
