'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@ui/shadcn/dialog';

// import { useState } from "react";

interface Props {
    _serverId: string;
    children: React.ReactNode;
}

export default function CreateCategoryModal({ _serverId, children }: Props) {
    // const [name, setName] = useState("");

    return (
        <Dialog>
            <DialogTrigger className='cursor-pointer text-xs transition-all hover:text-stone-500'>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                    <DialogDescription>
                        This will create a new category in the server
                    </DialogDescription>
                </DialogHeader>

                {/* <form action={createCategory} className="flex flex-col gap-4">
                    <input type="hidden" name="serverId" value={serverId} />
                    <input
                        type="text"
                        placeholder="Category name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit">Create</button>
                </form> */}
            </DialogContent>
        </Dialog>
    );
}
