import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
export class InMemoryAnswerCommentsRepository implements AnswerCommentRepository {
    public items: AnswerComment[] = [];

    async findById(id: string) {
        const answerComment = this.items.find((item) => item.id.toString() === id);

        if (!answerComment) {
            return null
        }

        return answerComment;
    }

    async findManyAnswerId(answerId: string, { page }: PaginationParams) {
        const answerComments = this.items
            .filter((item) => item.answerId.toString() === answerId)
            .slice((page - 1) * 20, page * 20);

        return answerComments;
    }

    async create(answerComment: AnswerComment) {
        this.items.push(answerComment);
    }

    async delete(answerComment: AnswerComment): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === answerComment.id);

        if (itemIndex >= 0) {
            this.items.splice(itemIndex, 1);
        }
    }

}