"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react";

export const QueryClientWrapper = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
                retryOnMount: false,
                refetchOnWindowFocus: false,
                refetchInterval: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
            }
        }
    }));
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}