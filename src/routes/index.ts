import Router from "../utilities/router";
import auth from "./auth";

const router = new Router();

globalThis.ep = {
    "auth": "/auth"
};

router.use(globalThis.ep.auth, auth);

export default router;