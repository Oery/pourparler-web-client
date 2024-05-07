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

        return {
            id: category.id,
            name: category.name,
            channels: categoryChannels,
        };
    });

    return (
        <div className="flex h-screen flex-col gap-4 bg-stone-300">
            <h2 className="truncate">Château d&apos;Oery</h2>
            {channelsByCategory.map((category) => (
                <CategoryComponent category={category} key={category.id} />
            ))}
        </div>
    );
}
