import type { QuarzoDependencies } from "./quarzo.dependencies";
import { bff } from "../api/bff";

export const buildQuarzoDependencies = (): QuarzoDependencies => ({
  bff: bff(),
});
