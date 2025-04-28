"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
let CommentsService = class CommentsService {
    constructor() {
        this.comments = [];
    }
    create(createCommentDto) {
        const newComment = {
            id: this.comments.length + 1,
            ...createCommentDto,
            createdAt: new Date(),
        };
        this.comments.push(newComment);
        return newComment;
    }
    findAll() {
        return this.comments;
    }
    findOne(id) {
        return this.comments.find(comment => comment.id === id);
    }
    update(id, updateCommentDto) {
        const commentIndex = this.comments.findIndex(comment => comment.id === id);
        if (commentIndex > -1) {
            this.comments[commentIndex] = {
                ...this.comments[commentIndex],
                ...updateCommentDto,
            };
            return this.comments[commentIndex];
        }
        return null;
    }
    remove(id) {
        const commentIndex = this.comments.findIndex(comment => comment.id === id);
        if (commentIndex > -1) {
            const [deletedComment] = this.comments.splice(commentIndex, 1);
            return deletedComment;
        }
        return null;
    }
    restore(id) {
        // Implement restore logic if needed
        return null;
    }
};
CommentsService = __decorate([
    common_1.Injectable()
], CommentsService);
exports.CommentsService = CommentsService;
