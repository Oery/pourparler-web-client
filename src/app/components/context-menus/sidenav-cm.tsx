// import CreateCategoryModal from "../modals/create-category";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";

interface Props {
    children: React.ReactNode;
    serverId: string;
    isAdmin: boolean;
}

function SideNavContextMenu({ children, serverId, isAdmin }: Props) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>

            <ContextMenuContent>
                {isAdmin && ( // Admin Actions
                    <>
                        <ContextMenuItem onClick={() => console.log("Clicked")}>
                            Create Channel
                        </ContextMenuItem>
                        <ContextMenuItem>
                            {/* <CreateCategoryModal serverId={serverId}>
                                Create Category
                            </CreateCategoryModal> */}
                        </ContextMenuItem>
                    </>
                )}
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default SideNavContextMenu;
