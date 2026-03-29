const fastify = require("fastify")({ logger: false });
const path = require("node:path");
const fastifyStatic = require("@fastify/static");
const { gsap } = require("gsap/dist/gsap");
const port = process.env.PORT || 3030;
const host = process.env.HOST || "0.0.0.0";

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
});
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "..", "node_modules"),
  prefix: "/modules/",
  decorateReply: false,
});
fastify.listen({ port: port, host: host }, (err) => {
  if (err) throw err;
  console.log(`Syntra is listening on http://localhost:${port}`);
});