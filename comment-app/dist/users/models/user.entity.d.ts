import { Comment } from '../../comments/entities/comment.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    comments: Comment[];
}
