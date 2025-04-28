import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(createCommentDto: CreateCommentDto): {
        createdAt: Date;
        content: string;
        parentId?: number | undefined;
        userId: number;
        id: number;
    };
    getComments(): {
        id: number;
        content: string;
        userId: number;
        parentId?: number | undefined;
        createdAt: Date;
    }[];
    getComment(id: string): {
        id: number;
        content: string;
        userId: number;
        parentId?: number | undefined;
        createdAt: Date;
    } | undefined;
    editComment(id: string, createCommentDto: CreateCommentDto): {
        id: number;
        content: string;
        userId: number;
        parentId?: number | undefined;
        createdAt: Date;
    } | null;
    deleteComment(id: string): {
        id: number;
        content: string;
        userId: number;
        parentId?: number | undefined;
        createdAt: Date;
    } | null;
    restoreComment(id: string): null;
}
