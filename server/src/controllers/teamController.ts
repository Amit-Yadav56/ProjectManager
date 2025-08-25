import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();
    const teamsWithOwnerAndManager = await Promise.all(
      teams.map(async (team: any) => {
        const projectOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });
        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });
        return {
          ...team,
          projectOwnerUsername: projectOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );
    res.status(200).json(teamsWithOwnerAndManager);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Teams data cannot be fetched : ${error}` });
  }
};
