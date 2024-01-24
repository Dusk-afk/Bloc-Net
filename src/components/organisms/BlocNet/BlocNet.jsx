import { Button, Card, Grid, Text } from "@mantine/core";
import { useState } from "react";
import { PostCreationModal } from "../PostCreationModal";
import { useEthers } from "@usedapp/core";
import { CHAIN_ID } from "../../../data";

export const BlocNet = ({ posts }) => {
    const [postCreationOpened, setPostCreationOpened] = useState(false);
    const { account, chainId } = useEthers();

    return (
        <ul>
            <Grid>
            {posts.map((post, index) => (
                <Grid.Col key={index} span={12} md={6} lg={4}>
                    <Card shadow="sm" padding="md" radius="md" style={{ height: "100%" }}>
                        <Text>{post.text}</Text>
                    </Card>
                </Grid.Col>
            ))}</Grid>
            <Button
                onClick={() => setPostCreationOpened(true)}
                variant="light"
                radius="xl"
                disabled={!account || chainId !== CHAIN_ID}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                }}
            >
                Create a Post
            </Button>
            <PostCreationModal
                opened={postCreationOpened}
                onClose={() => setPostCreationOpened(false)}
            />
        </ul>
    );
};
