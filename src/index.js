const fastify = require("fastify")({ logger: false });
const path = require("node:path");
const fastifyStatic = require("@fastify/static");
const { gsap } = require("gsap/dist/gsap");
const port = process.env.PORT || 3000;

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
});
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "..", "node_modules"),
  prefix: "/modules/",
  decorateReply: false,
});
fastify.listen({ port: port }, (err) => {
  if (err) throw err;
  console.log(`Syntra is listening on http://localhost:${port}`);
});