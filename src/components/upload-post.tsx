import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { queryClient } from "~/pages/_app";
import { type ValidPostState } from "~/types/post";
import { createPost } from "~/utils/services";
import { upload } from "~/utils/upload";

const Loading = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Icon icon="eos-icons:loading" className="text-4xl" />
      {message}
    </div>
  );
};
const UploadPost = ({ post }: { post: ValidPostState }) => {
  const data = useSession();

  const createPostMuatation = useMutation({
    mutationFn: createPost,
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["posts"]);
      toast.success("Post created");
    },
  });

  const uploadQuery = useQuery({
    queryKey: ["upload", post.file.name],
    queryFn: () => upload.uploadFile(post.file),
    onSuccess: ({ fileUrl }) => {
      const { data: sessionData } = data;
      if (sessionData) {
        createPostMuatation.mutate({
          userId: sessionData.id,
          post: { ...post, file: fileUrl },
        });
      }
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
    retry: false,
  });

  return (
    <div className="px-4 py-2">
      {uploadQuery.isLoading ? (
        <Loading message="Uploading file..." />
      ) : (
        createPostMuatation.isLoading && <Loading message="Creating post..." />
      )}
      {uploadQuery.isError ||
        (createPostMuatation.isError && (
          <div className="flex items-center gap-2">
            <Icon
              icon="material-symbols:error-outline-rounded"
              className="text-4xl text-red-500"
            />
            Something went wrong!
          </div>
        ))}
      {uploadQuery.isSuccess && createPostMuatation.isSuccess && (
        <div className="mb-4 mt-2">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:check-circle" className="text-3xl text-green-500" />
            Your post has been scheduled successfully!
          </div>
          <div className="text-center">
            <div className="text-sm text-black/70">
              Time: {new Date(post.scheduledAt).toUTCString()}
            </div>
            <div className="text-sm text-black/70">
              Platforms: {post.platforms.join(", ")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPost;
