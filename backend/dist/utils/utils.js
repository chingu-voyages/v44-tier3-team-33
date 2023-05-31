"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostWithUser = exports.getPostsWithUser = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const getPostsWithUser = async ({ posts }) => {
    return Promise.all(posts.map(async (post) => {
        const user = await clerk_sdk_node_1.users.getUser(post.createdBy);
        return {
            post: post,
            userInfo: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.emailAddresses[0].emailAddress,
                profileImageUrl: user.profileImageUrl,
                publicMetadata: user.publicMetadata,
            },
        };
    }));
};
exports.getPostsWithUser = getPostsWithUser;
const getPostWithUser = async ({ post }) => {
    const user = await clerk_sdk_node_1.users.getUser(post.createdBy);
    return {
        post: post,
        userInfo: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0].emailAddress,
            profileImageUrl: user.profileImageUrl,
            publicMetadata: user.publicMetadata,
        },
    };
};
exports.getPostWithUser = getPostWithUser;
//# sourceMappingURL=utils.js.map