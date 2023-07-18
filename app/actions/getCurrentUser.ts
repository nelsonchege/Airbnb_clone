import { getServerSession } from "next-auth";
import authOptions from "../utils/authOptions";
import prisma from "../lib/db";

interface User {
  email: string;
  name: string;
  image: string;
}

interface Session {
  user?: User;
}

export async function getSession() {
  return getServerSession(authOptions) as Session;
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdA.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (e) {
    return null;
  }
}
