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

  const restaurants: IRestaurant[] = await prisma.$queryRaw`
  SELECT
    CAST(osm_id as Float),
    amenity,
    name,
    ST_AsText(ST_Transform(way, 4326)) as location
  FROM planet_osm_point
  WHERE amenity = ${data.type}
    AND ST_DWithin(way, ST_Transform(ST_SetSRID(ST_Point(${data.longtitude}, ${data.latitude}),4326), 3857), ${data.radius});
  `;

  console.log(restaurants);
  ctx.body = { success: true, message: "", data: restaurants };
  await next();
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, async () => {
  await prisma.$connect();
  console.log("wwp-backend: listening on http://localhost:3000");
});
