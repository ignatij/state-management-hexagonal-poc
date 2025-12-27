/* eslint-disable @typescript-eslint/no-empty-object-type */
import ErrorResult from "../../../utils/ErrorResult";
import PendingResult from "../../../utils/PendingResult";
import {
  isError,
  isPending,
  isSuccess,
  type Result,
} from "../../../utils/Result";
import { useOnePokemon } from "./useOnePokemon";

export type OnePokemon = {
  id: number;
  weight: number;
};

export type State = Result<undefined, OnePokemon, string>;

export type Actions = {};

const Component = () => {
  const { state } = useOnePokemon();

  return (
    <div>
      <h3>Detail view</h3>
      {isPending(state) && <PendingResult />}
      {isError(state) && <ErrorResult>{state.error}</ErrorResult>}
      {isSuccess(state) && (
        <>
          <div>Id: {state.value.id}</div>
          <div>Weight: {state.value.weight}</div>
        </>
      )}
    </div>
  );
};

export default Component;
