import { Button, Group, Modal, Space, TextInput, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useCreatePost } from "../../../hooks/CreatePost/CreatePost"
import { useEffect } from "react"

export const PostCreationModal = ({ opened, onClose }) => {
    const form = useForm({
        initialValues: {
            post: "",
        }
    })

    const { loading, success, error, send } = useCreatePost();

    useEffect(() => {
        if (success) {
            onClose();
        }
    }, [success]);

    const handleSubmit = async (values) => {
        await send(values.post, [], "", []);
    }

    return <Modal opened={opened} onClose={onClose} title="Create a Post">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput required label="Post" {...form.getInputProps("post")}/>
            <Space h="md" />
            {
                !!error && (
                    <>
                    <Text c="red">An error occurred</Text>
                    </>
                )
            }
            <Group pos="right">
                <Button type="submit">Create</Button>
            </Group>
        </form>
    </Modal>
}