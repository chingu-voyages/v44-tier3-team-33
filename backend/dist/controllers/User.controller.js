"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const getUserProfile = async (req, res) => {
    const { createdBy } = req.params;
    try {
        const user = await clerk_sdk_node_1.users.getUser(createdBy);
        const userProfile = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0].emailAddress,
            profileImageUrl: user.profileImageUrl,
            publicMetadata: user.publicMetadata,
        };
        res.status(200).json(userProfile);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=User.controller.js.map