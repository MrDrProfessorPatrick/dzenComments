import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CommentsController {
    async getPost(req, res) {
        try {
            let posts = await prisma.post.findMany({ select: {
                id: true,
                title: true,
            }})
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
     }
}

const commentsController = new CommentsController();
export default commentsController;