import { Router } from "express";
import { extendExpress } from "$middlewares/extend-express.js";
import { authenticated } from "$middlewares/authenticated.js";
import { authenticationRouter } from "./authentication/index.js";
import { memoRouter } from "./memo/index.js";
import { meRouter } from "./me/index.js";

/** The top-level router instance. */
export const router = Router();

// Extend express objects, must come first !
router.use("/", extendExpress);

router.use("/api/v1/authentication", authenticationRouter.v1);

router.use("/api/v1/memos", authenticated, memoRouter.v1);
router.use("/api/v1/me", authenticated, meRouter.v1);
