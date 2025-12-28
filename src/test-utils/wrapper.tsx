import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import type { QuarzoDependencies } from "../bootstrap/quarzo.dependencies";
import { QuarzoDependenciesProvider } from "../bootstrap/quarzo.provider";

type Parameters = {
  queryClient: QueryClient;
  dependencies: QuarzoDependencies;
};

export const createWrapper =
  ({ queryClient, dependencies }: Parameters) =>
  ({ children }: { children: React.ReactNode }) =>
    (
      <QueryClientProvider client={queryClient}>
        <QuarzoDependenciesProvider dependencies={dependencies}>
          {children}
        </QuarzoDependenciesProvider>
      </QueryClientProvider>
    );
