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
                    id: true,
                    message: true,
                    parentId: true,
                    createdAt: true,
                    likes: true,
                    user: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    _count: { select: { likes: true } },
                  },
                },
              },
            })
            .then(async post => {
              let response = {
                ...post,
                comments: post.comments.map(comment => {
                  const { _count, ...commentFields } = comment
                  return {
                    ...commentFields,
                  }
                }),
              }
              return res.status(200).json(response);
            })
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ message: error });
        }
     }

    async createComment(req, res) {
      if (req.body.message === "" || req.body.message == null) {
        return res.res.status(400).json('Message is required');
      }
      const {postId, parentId, userName, email, homepage, message} = req.body.message;
      const normalizedEmail = email.trim().toLowerCase()

      let user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: userName,
            email: normalizedEmail,
            homepage,
          },
        })

      prisma.comment
        .create({
          data: {
            message: message,
            userId: user.id,
            parentId: parentId || '', // TODO ADD parentId
            postId
          },
          select: {
            id: true,
            message: true,
            parentId: true,
            createdAt: true,
            likes: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            _count: { select: { likes: true } },
          },
        })
      .then(comment => {
        return {
          ...comment,
        }
      })
    } 
  }
}  

const commentsController = new CommentsController();
export default commentsController;