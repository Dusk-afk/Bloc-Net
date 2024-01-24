import { Button, Card, Container, Grid, Group, ScrollArea, Space, Text } from "@mantine/core";
import { useState } from "react";
import { PostCreationModal } from "../PostCreationModal";
import { useEthers } from "@usedapp/core";
import { CHAIN_ID } from "../../../data";

function epochToJsDate(ts){
  // ts = epoch timestamp
  // returns date obj
  return new Date(ts*1000);
}

export const BlocNet = ({ posts }) => {
  const [postCreationOpened, setPostCreationOpened] = useState(false);
  const { account, chainId } = useEthers();

  return (
    <>
    <ScrollArea>
    <Space h="md" />
    <Space h="md" />
    <Space h="md" />
    <Space h="md" />
    <Container>
    <Text size="xl" fw={600}>Latest Posts</Text>
      <ul style={{listStyleType: "none"}}>
        {posts.map((post, index) => (
          <li key={index}>
            <Card
              shadow="sm"
              padding="md"
              radius="md"
              style={{ height: "100%" }}
            >
              <Text>{post.text}</Text>
              <Space h="md" />
              <Text>{epochToJsDate(parseInt(post.timestamp._hex)).toLocaleDateString()} {epochToJsDate(parseInt(post.timestamp._hex)).toLocaleTimeString()}</Text>
              <Text>{post.userAddress}</Text>
              <Space h="md" />
              <Group>
                <Button>Like</Button>
                <Button>Comment</Button>
              </Group>
            </Card>
            <Space h="md" />
          </li>
        ))}
      </ul>
      </Container>
      </ScrollArea>
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
    </>
  );
};
