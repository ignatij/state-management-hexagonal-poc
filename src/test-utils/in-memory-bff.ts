import type { Bff, QuarzoDependencies } from "../bootstrap/quarzo.dependencies";

export const buildInMemoryDependencies = (bff: Bff): QuarzoDependencies => ({
  bff,
});
