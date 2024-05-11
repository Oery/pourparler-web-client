interface Props {
    children: React.ReactNode;
}

export default function ServerLayout({ children }: Props) {
    console.log("server layout");
    return <>{children}</>;
}
