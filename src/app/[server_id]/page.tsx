interface Props {
    params: { server_id: number };
}

export default function ServerPage({ params }: Props) {
    console.log("server page: ", params);
    return <></>;
}
