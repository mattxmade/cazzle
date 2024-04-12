import ConvexClerkProvider from "../components/providers/ConvexClerkProvider";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import theme from "@/theme";

import NavBar from "@/components/core/NavBar";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import { projectMetadata } from "./metadata";
import "./globals.css";
import { Suspense } from "react";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata = projectMetadata;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Container
                disableGutters
                maxWidth={false}
                sx={{
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Header>
                  <Suspense>
                    <NavBar />
                  </Suspense>
                </Header>
                {children}
                <Footer />
              </Container>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
