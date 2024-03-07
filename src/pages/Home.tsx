import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { YoutubeApiProvider } from "../context/YoutubeApiContext";

const queryClient = new QueryClient();
export default function Home() {
  return (
    <>
      <Header />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  )
}
