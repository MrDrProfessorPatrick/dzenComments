import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CommentsController {
    constructor() {
        this.COMMENT_FIELDS = {
            id: true,
            message: true,
            parentId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
        }
    }

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

     async getPostById(req, res) {
        try {
            prisma.post
            .findUnique({
              where: { id: req.params.id },
              select: {
                body: true,
                title: true,
                comments: {
                  orderBy: {
                    createdAt: "desc",
                  },
                  select: {
                    ...this.COMMENT_FIELDS,
                    _count: { select: { likes: true } },
                  },
                },
              },
            })
            .then(async post => {
              const likes = await prisma.like.findMany({
                where: {
                  userId: req.cookies.userId,
                  commentId: { in: post.comments.map(comment => comment.id) },
                },
              })
      
              return {
                ...post,
                comments: post.comments.map(comment => {
                  const { _count, ...commentFields } = comment
                  return {
                    ...commentFields,
                    likedByMe: likes.find(like => like.commentId === comment.id),
                    likeCount: _count.likes,
                  }
                }),
              }
            })
        } catch (error) {
            return res.status(500).json({ message: error });
        }
     }
}

const commentsController = new CommentsController();
export default commentsController;