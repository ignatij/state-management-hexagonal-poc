import type { ReactNode } from "react";
import { buildQuarzoDependencies } from "./build-quarzo-dependencies";
import { QuarzoDependenciesContext } from "./quarzo-dependencies.context";
import type { QuarzoDependencies } from "./quarzo.dependencies";

type QuarzoDependenciesProviderProps = {
  children: ReactNode;
  dependencies?: QuarzoDependencies;
};

export const QuarzoDependenciesProvider = ({
  children,
  dependencies,
}: QuarzoDependenciesProviderProps) => {
  const resolvedDependencies = dependencies ?? buildQuarzoDependencies();

  return (
    <QuarzoDependenciesContext.Provider value={resolvedDependencies}>
      {children}
    </QuarzoDependenciesContext.Provider>
  );
};
