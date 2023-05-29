import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({ publicRoutes: ["/", "/filter"] });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
