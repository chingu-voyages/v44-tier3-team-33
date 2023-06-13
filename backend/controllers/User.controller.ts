import { Request, Response } from "express";
import { users } from "@clerk/clerk-sdk-node";

export const getUserProfile = async (req: Request, res: Response) => {
  const { createdBy } = req.params;
  try {
    const user = await users.getUser(createdBy);
    const userProfile = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.profileImageUrl,
        publicMetadata: user.publicMetadata,      
    };
    res.status(200).json(userProfile)
  } catch (error: any){
    res.status(404).json({ message: error.message });
  }
}