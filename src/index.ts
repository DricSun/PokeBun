import { Elysia, t } from "elysia";
// @ts-ignore
import {PrismaClient} from "prisma@client"
// @ts-ignore
import { swagger } from "@elysiajs/swagger";
import {pokemons} from "./pokemons";

const db = new PrismaClient

const findOne = (id: string) => {
    return pokemons.find((pokemon) => {
        return pokemon.id === id;
    });
};

// @ts-ignore
// @ts-ignore
new Elysia()
    .use(
        swagger({
            documentation: {
                info: {
                    title: "Bun Elysia API Documentation",
                    version: "1.0.0",
                },
            },
        })
    )
    .get("/pokemon", () => pokemons)
    .get("/pokemon/:id", ({ params: { id }, set }) => {
        let pokemon = findOne(id);
        if (pokemon) {
            return pokemon;
        } else {
            set.status = 404;
            return "Not found";
        }
    })
    .post(
        "/create",
        ({ body, set }) => {
            let existing = findOne(body.id);
            if (existing) {
                set.status = 400;
                return "User already exists";
            } else {
                pokemons.push(body);
                set.status = 201;
                return body;
            }
        },
        {
            body: t.Object({
                id: t.String(),
                name: t.String(),
                type : t.String()
            }),
        }
    )
    // .post(
    //     '/pokepost',
    //     async ({ body }) => db.pokemons.create({
    //         data: body
    //     }),
    //     {
    //         body: t.Object({
    //             name: t.String(),
    //             type: t.String()
    //         })
    //     }
    // )
    .put(
        "/update",
        ({ body, setPoke }) => {
            let existing = findOne(body.id);
            if (existing) {
                let updatedPoke = Object.assign(existing, body);
                return updatedPoke;
            } else {
                pokemons.push(body);
                setPoke.status = 201;
                return body;
            }
        },
        {
            body: t.Object({
                id: t.String(),
                name: t.String(),
                type : t.String()
            }),
        }
    )
    .delete("/delete/:id", ({ params: { id }, set }) => {
        let existing = findOne(id);
        if (existing) {
            let index = pokemons.findIndex((pokemon) => pokemon.id === existing?.id);
            pokemons.splice(index, 1);
            return existing;
        } else {
            set.status = 404;
            return "Not found";
        }
    })
    .listen(3000);


// @ts-ignore
// @ts-ignore
const app = new Elysia()
    .use(swagger())
    .post(
        '/pokepost',
        async ({ body }) =>
            db.pokemons.create({
                data: body,
                select: {
                    id: true,
                    name: true
                }
            }),
        {
            error({ code }) {
                switch (code) {
                    // Prisma P2002: "Unique constraint failed on the {constraint}"
                    case 'P2002':
                        return {
                            error: 'name must be unique'
                        }
                }
            },
            body: t.Object({
                name: t.String(),
                type: t.String()
            }),
            response: t.Object({
                id: t.Number(),
                name: t.String(),
                type : t.String()
            })
        }
    )
    .listen(3001)



// @ts-ignore
console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)