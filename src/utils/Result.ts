type AbstractResult<Status> = {
  status: Status;
};

type Pending<P> = AbstractResult<"Pending"> & { value: P };

type Success<S> = AbstractResult<"Success"> & { value: S };

type Error<E> = AbstractResult<"Error"> & { error: E };

export type Result<P, S, E> = Pending<P> | Success<S> | Error<E>;

export const pending = <P>(value: P): Pending<P> => ({
  status: "Pending",
  value,
});

export const success = <S>(value: S): Success<S> => ({
  status: "Success",
  value,
});

export const error = <E>(message: E): Error<E> => ({
  status: "Error",
  error: message,
});

export const isPending = <P, S, E>(
  result: Result<P, S, E>
): result is Pending<P> => result.status === "Pending";

export const isSuccess = <P, S, E>(
  result: Result<P, S, E>
): result is Success<S> => result.status === "Success";

export const isError = <P, S, E>(
  result: Result<P, S, E> //
): result is Error<E> => result.status === "Error";
