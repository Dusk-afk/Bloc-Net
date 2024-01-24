import { useLogs } from "@usedapp/core"
import { contract } from ".."
import { useMemo } from "react"

export const usePosts = () => {
    const logs = useLogs({
        contract,
        event: "PostCreated",
        args: [null],
    })
    
    let posts = useMemo(() => {
        if (logs === undefined) return ([])
        return (logs.value.map((log) => {
            return {
                postId: log.data.postId,
                userAddress: log.data.userAddress,
                text: log.data.text,
            }
        }))
    }, [logs===undefined ? null : logs.value])
    posts = posts.reverse()

    return {
        posts,
    }
}