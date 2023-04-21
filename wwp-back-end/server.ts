import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import Koa from "koa";

import { PrismaClient } from "@prisma/client";

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

router.get("/find", async (ctx, next) => {
  console.log(ctx.request.body);

  const user = await prisma.spatial_ref_sys.findFirst();

  ctx.body = user;
  await next();
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, async () => {
  await prisma.$connect();
  console.log("wwp-backend: listening on http://localhost:3000");
});
