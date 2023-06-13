"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
exports.default = validate;
//# sourceMappingURL=validateReq.js.map