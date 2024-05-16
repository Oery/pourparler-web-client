import CreateCategoryModal from "../modals/create-category";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";

interface Props {
    children: React.ReactNode;
    serverId: string;
}

export default function SideNavContextMenu({ children, serverId }: Props) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuItem onClick={() => console.log("Clicked")}>
                    Create Channel
                </ContextMenuItem>
                <ContextMenuItem>
                    <CreateCategoryModal serverId={serverId}>
                        Create Category
                    </CreateCategoryModal>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
