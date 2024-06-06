import { Button } from '@ui/shadcn/button';

interface Props {
    handleClick: () => void;
    isBottom: boolean;
}

export default function ChatScrollButton({ handleClick, isBottom }: Props) {
    return (
        <Button
            variant='outline'
            onClick={handleClick}
            className={`sticky w-full -mt-10 top-2 transition-all ${isBottom ? '-translate-y-16' : ''}`}
        >
            Go to latest messages
        </Button>
    );
}
