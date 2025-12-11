// backend/src/test-db.js
import { prisma } from "./config/prisma.js";

async function main() {
  const usuarios = await prisma.usuario.findMany();
  console.log("Usuarios:", usuarios);
}

main().catch(console.error);
