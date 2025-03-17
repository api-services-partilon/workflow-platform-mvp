import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.tasks)["duplicate"]["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.tasks)["duplicate"]["$post"]>;

export const useCopyTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["duplicate"].$post({ json });

      if (!response.ok) {
        throw new Error("Failed to copy task.");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task copied.");
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
    },
    onError: () => {
      toast.error("Failed to copy task.");
    },
  });

  return mutation;
};