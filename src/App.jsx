import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Container, MantineProvider, Title, AppShellHeader, ModalHeader, DrawerHeader, AppShell } from "@mantine/core";
import { WalletInstallation } from "./components/organisms/WalletInstallation";
import { WalletConnect } from "./components/organisms/WalletConnect";
import { BlocNet } from "./components/organisms/BlocNet";
import { usePosts } from "./hooks/Posts/Posts";

function App() {
  const { ethereum } = window;
  const {posts} = usePosts();

  return (
    <>
      <MantineProvider
        theme={{ colorScheme: "light" }}
        withGlobalStyles
        withNormalizeCss
      >
        <AppShell header={{ height: 60 }}>
          <AppShell.Header px="s" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <Title>Bloc Net</Title>
            <WalletConnect />
          </AppShell.Header>
        <div >
          {!ethereum ? (
            <Container p="lg">
              <WalletInstallation />
            </Container>
          ) : (
            <BlocNet posts={posts} />
          )}
        </div>
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
