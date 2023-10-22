import { Elysia, t } from "elysia";
// @ts-ignore
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

// @ts-ignore
import { swagger } from "@elysiajs/swagger";
import {pokemons} from "./pokemons";
import process from "process";



// const findOne = (id: string) => {
//     return pokemons.find((pokemon) => {
//         return pokemon.id === id;
//     });
// };
//
// // @ts-ignore
// // @ts-ignore
// new Elysia()
//     .use(
//         swagger({
//             documentation: {
//                 info: {
//                     title: "Bun Elysia API Documentation",
//                     version: "1.0.0",
//                 },
//             },
//         })
//     )
//     .get("/pokemon", () => pokemons)
//     .get("/pokemon/:id", ({ params: { id }, set }) => {
//         let pokemon = findOne(id);
//         if (pokemon) {
//             return pokemon;
//         } else {
//             set.status = 404;
//             return "Not found";
//         }
//     })
//     .post(
//         "/create",
//         ({ body, set }) => {
//             let existing = findOne(body.id);
//             if (existing) {
//                 set.status = 400;
//                 return "User already exists";
//             } else {
//                 pokemons.push(body);
//                 set.status = 201;
//                 return body;
//             }
//         },
//         {
//             body: t.Object({
//                 id: t.String(),
//                 name: t.String(),
//                 type : t.String()
//             }),
//         }
//     )
//     .put(
//         "/update",
//         ({ body, setPoke }) => {
//             let existing = findOne(body.id);
//             if (existing) {
//                 let updatedPoke = Object.assign(existing, body);
//                 return updatedPoke;
//             } else {
//                 pokemons.push(body);
//                 setPoke.status = 201;
//                 return body;
//             }
//         },
//         {
//             body: t.Object({
//                 id: t.String(),
//                 name: t.String(),
//                 type : t.String()
//             }),
//         }
//     )
//     .delete("/delete/:id", ({ params: { id }, set }) => {
//         let existing = findOne(id);
//         if (existing) {
//             let index = pokemons.findIndex((pokemon) => pokemon.id === existing?.id);
//             pokemons.splice(index, 1);
//             return existing;
//         } else {
//             set.status = 404;
//             return "Not found";
//         }
//     })
//     .listen(3000);

// * WITH DB PRISMA/POSTGRESQL //
// @ts-ignore
// @ts-ignore
new Elysia()
    .get("/", () => "Hello")
    .get("/pokemons", async()=>{
        const pokemons = await db.pokemons.findMany();
        return pokemons
    })
    .post("/pokemons", async(req: { body: any; })=>{
        const {name, type }: any = req.body
        // @ts-ignore
        console.log('test')
        const pokemons = await db.pokemons.create({
            data: {
                name,
                type
            }
        })
        // @ts-ignore
        console.log(pokemons)
        return pokemons

    })
    .put("/pokemons/:id", async(req: { params: { id: any; }; body: any; })=>{
        const {id} = req.params
        const {name, type}: any = req.body
        const pokemons = await db.pokemons.update({
            where: {
                id: id,
            },
            data: {
                name,
                type
            }
        })
        return pokemons
    })
    .delete("/pokemons/:id",async (req: { params: { id: any; }; }) => {
        const {id} = req.params
        const pokemons = await db.pokemons.delete({
            where: {
                id: id
            }
        })
        return pokemons
    })
    .get("/pokemons/:id",async (req: { params: { id: any; }; }) => {
        const {id} = req.params
        const pokemons = await db.pokemons.findUnique({
            where: {
                id: id
            }
        })
        return pokemons
    })
    .listen(3000)



// // @ts-ignore
// console.log(
//     `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// )