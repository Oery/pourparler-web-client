import { db } from "~/server/db";
import CategoryComponent from "./category";

export default async function SideNav() {
    const [categories, channels] = await Promise.all([
        db.query.categories.findMany(),
        db.query.channels.findMany(),
    ]);

    const channelsByCategory = categories.map((category) => {
        const categoryChannels = channels.filter(
            (channel) => channel.categoryId === category.id,
        );

        categoryChannels.sort((a, b) => a.id.localeCompare(b.id));

        return {
            id: category.id,
            name: category.name,
            channels: categoryChannels,
        };
    });

    // TEMP FIX TO SORT CATEGORIES
    channelsByCategory.sort((a, b) => a.id.localeCompare(b.id));

    // TODO: Add Open/Close feature

    return (
        <div className="flex h-screen w-52 flex-col gap-4 bg-stone-300 p-4">
            <div>
                <h2 className="truncate">Château d&apos;Oery</h2>
                {channelsByCategory.map((category) => (
                    <CategoryComponent category={category} key={category.id} />
                ))}
            </div>
        </div>
    );
}
