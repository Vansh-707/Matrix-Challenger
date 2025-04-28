import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotificationsService } from '../common/notifications/notifications.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    comment.createdAt = new Date();
    const savedComment = await this.commentRepository.save(comment);

    if (createCommentDto.parentId) {
      const parentComment = await this.commentRepository.findOne({ where: { id: createCommentDto.parentId } });
      if (parentComment) {
        await this.notificationsService.notifyUser(parentComment.userId, `You have a new reply to your comment.`);
      }
    }

    return savedComment;
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id }, relations: ['parent'] });
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['parent'] });
  }

  async editComment(id: number, content: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const now = new Date();
    const timeDifference = (now.getTime() - comment.createdAt.getTime()) / 1000 / 60; // in minutes
    if (timeDifference > 15) {
      throw new BadRequestException('Comments can only be edited within 15 minutes of posting');
    }
    comment.content = content;
    return this.commentRepository.save(comment);
  }

  async deleteComment(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    comment.deletedAt = new Date();
    await this.commentRepository.save(comment);
  }

  async restoreComment(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id }, withDeleted: true });
    if (!comment || !comment.deletedAt) {
      throw new NotFoundException('Comment not found or not deleted');
    }
    const now = new Date();
    const timeDifference = (now.getTime() - comment.deletedAt.getTime()) / 1000 / 60; // in minutes
    if (timeDifference > 15) {
      throw new BadRequestException('Comments can only be restored within 15 minutes of deletion');
    }
    comment.deletedAt = null;
    return this.commentRepository.save(comment);
  }
}