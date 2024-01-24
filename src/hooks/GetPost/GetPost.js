import { useContractFunction } from "@usedapp/core"
import { contract } from ".."

export const useGetPost = () => {
    const {state, send} = useContractFunction(contract, "getPost")
    const loading = state.status === "PendingSignature" || state.status === "Mining"
    const success = state.status === "Success"
    const error = state.status === "Exception" || state.status === "Fail"
    return {loading, success, error, send}
}