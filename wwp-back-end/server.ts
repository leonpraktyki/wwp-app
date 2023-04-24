import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import Koa from "koa";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

interface IRestaurant {
  osm_id: bigint;
  name: string;
  amenity: string;
  way: string;
}

router.get("/find", async (ctx, next) => {
  // console.log(`[${new Date()}] ${ctx.query}`);

  const today = new Date().toLocaleString();

  console.log(today, JSON.stringify(ctx.query));

  const inputSchema = z.object({
    type: z.string().toLowerCase(),
    longtitude: z.string().transform((v) => parseFloat(v)),
    latitude: z.string().transform((v) => parseFloat(v)),
    radius: z.string().transform((v) => parseInt(v)),
  });

  const input = inputSchema.safeParse(ctx.query);

  if (!input.success) {
    console.log(input.error);
    ctx.status = 400;
    ctx.body = { success: false, message: "Invalid input", data: null };
    return;
  }

  const { data } = input;

  const results: IRestaurant[] = await prisma.$queryRaw`
  SELECT
    CAST(osm_id as Float),
    amenity,
    name,
    ST_AsText(ST_Transform(way, 4326)) as location
  FROM planet_osm_point
  WHERE amenity = ${data.type}
    AND ST_DWithin(way, ST_Transform(ST_SetSRID(ST_Point(${data.longtitude}, ${data.latitude}),4326), 3857), ${data.radius});
  `;

  ctx.body = { success: true, message: "", data: results };
  await next();
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, async () => {
  await prisma.$connect();
  console.log("wwp-backend: listening on http://localhost:3000");
});
