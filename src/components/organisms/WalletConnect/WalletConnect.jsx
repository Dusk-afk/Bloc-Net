import { Button, Group, Text } from "@mantine/core"
import { useEthers } from "@usedapp/core"
import { CHAIN_ID } from "../../../data";

export const WalletConnect = () => {
    const {activateBrowserWallet, account, deactivate, chainId, switchNetwork } = useEthers();
    if (account) {
        if (chainId == CHAIN_ID) {
            return <Button onClick={deactivate}>Disconnect</Button>
        } else {
            return <Group position="right">
                <Text size="sm" c="red">Wrong Network</Text>
                <Button onClick={() => switchNetwork(CHAIN_ID)}>Switch Network</Button>
            </Group>
        }
    }
    return <Button onClick={activateBrowserWallet}>Connect to Metamask</Button>
}