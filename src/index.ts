import { Elysia, t } from "elysia";
import { cookie } from '@elysiajs/cookie'

import { cors } from '@elysiajs/cors'
import { cron } from '@elysiajs/cron'
// @ts-ignore
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

// @ts-ignore
import { swagger } from "@elysiajs/swagger";
import {pokemons} from "./pokemons";
import {html} from "@elysiajs/html";



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

// * WITH DB PRISMA/MONGODB//
// @ts-ignore
// @ts-ignore
// @ts-ignore



// Plugins CRONS -> script programmer executer en arriere plan //

// Plugins CORS //

// PLUGINS COOKIES to update //
new Elysia()
    .use(html())
    .get("/", () => Bun.file("./public/index.html").text())
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
    .post('/cookies', ({ cookie: { name } }) => {
    // Get
    name.value

    // Set
    name.value = "New Value"
    name.value = {
        hello: 'world'
    }
})
    .get('/deletecookie', ({ cookie, cookie: { name } }) => {
    name.remove()

    delete cookie.name
})
.get('/cookie', ({ cookie: { name } }) => {
    // Set
    name.value = {
        id: 617,
        name: 'test cookie'
    }
}, {
    cookie: t.Cookie({
        value: t.Object({
            id: t.Numeric(),
            name: t.String()
        })
    })
})
    .use(
        cron({
            name: 'cron test',
            pattern: '*/10 * * * * *',
            run() {
                console.log('test cron')
            }
        })
    )
    .use(cors())
    .listen(3000)

// @ts-ignore
// @ts-ignore




