interface Props {
    params: { server_id: string };
}

export default function ServerPage({ params }: Props) {
    console.log("server page: ", params);
    return <></>;
}
