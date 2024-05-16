"use server";

import { db } from "~/server/db";
import { categories } from "~/server/db/schema";

import isAdmin from "../admin";
import { eq } from "drizzle-orm";
import { z } from "zod";

const createCategorySchema = z.object({
    name: z.coerce.string(),
    serverId: z.coerce.string(),
});

export async function createCategory(formData: FormData) {
    const { serverId, name } = createCategorySchema.parse({
        serverId: formData.get("serverId"),
        name: formData.get("name"),
    });

    console.log("Validating form data");

    if (!name || !serverId) return { message: "Missing arguments" };
    if (!(await isAdmin(serverId))) return { message: "You must be an admin" };

    // check if channel already exists or has same name

    console.log("Creating channel");

    const results = await db
        .insert(categories)
        .values({ name, serverId })
        .returning({ id: categories.id });

    if (!results[0]) return { message: "Category creation failed" };

    console.log("Category created");
    console.log(results[0].id);

    // revalidatePath(`/${serverId}/`);
    // redirect(`/${serverId}/${results[0].id}`);
}

const deleteCategorySchema = z.object({
    id: z.coerce.string(),
    serverId: z.coerce.string(),
});

export async function deleteCategory(formData: FormData) {
    console.log("Deleting category");

    const { id, serverId } = deleteCategorySchema.parse({
        id: formData.get("id"),
        serverId: formData.get("serverId"),
    });

    if (!(await isAdmin(serverId))) return { message: "You must be an admin" };

    try {
        console.log("Deleting category");
        await db.delete(categories).where(eq(categories.id, id));
        console.log("Category deleted");
    } catch (error) {
        console.log(error);
        return { message: "Category deletion failed" };
    }

    // revalidatePath(`/${serverId}/`);
    // redirect(`/${serverId}/`);
}
