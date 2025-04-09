import { useMutation } from "@tanstack/react-query";

export const useTodoMutation = (fnCallBack) => {
  const mutation = useMutation({
    mutationFn: fnCallBack,
  });
  return mutation;
};