import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsService {
    private comments;
    create(createCommentDto: CreateCommentDto): {
        createdAt: Date;
        content: string;
        parentId?: number;
        userId: number;
        id: number;
    };
    findAll(): {
        id: number;
        content: string;
        userId: number;
        parentId?: number;
        createdAt: Date;
    }[];
    findOne(id: number): {
        id: number;
        content: string;
        userId: number;
        parentId?: number;
        createdAt: Date;
    } | undefined;
    update(id: number, updateCommentDto: Partial<CreateCommentDto>): {
        id: number;
        content: string;
        userId: number;
        parentId?: number;
        createdAt: Date;
    } | null;
    remove(id: number): {
        id: number;
        content: string;
        userId: number;
        parentId?: number;
        createdAt: Date;
    } | null;
    restore(id: number): null;
}
