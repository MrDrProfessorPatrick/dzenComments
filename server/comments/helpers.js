import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createCommentHelper({
  postId,
  parentId,
  userName,
  email,
  homepage,
  message,
  fileUrl,
  fileType,
}) {
  const normalizedEmail = email.trim().toLowerCase();

  let user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: userName,
        email: normalizedEmail,
        homepage,
      },
    });
  }

  const comment = await prisma.comment.create({
    data: {
      message: message,
      userId: user.id,
      parentId: parentId || null,
      postId,
      fileUrl,
      fileType,
    },
    select: {
      id: true,
      message: true,
      parentId: true,
      createdAt: true,
      fileUrl: true,
      fileType: true,
      likes: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: { select: { likes: true } },
    },
  });

  return comment;
}
