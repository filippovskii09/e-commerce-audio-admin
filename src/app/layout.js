import { Inter } from "next/font/google";
import ReduxProvider from "@/providers/ReduxProvider";
import "./styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Audio-admin",
  description: "Audio e-commerce admin panel for control ordering, products and users",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
				<ReduxProvider>
					<ChakraProvider>{children}</ChakraProvider>
				</ReduxProvider>
			</body>
    </html>
  );
}
