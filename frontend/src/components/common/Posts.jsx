import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {
	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return "/api/posts/all";
			case "following":
				return "/api/posts/following";
			case "posts":
				return `/api/posts/user/${username}`;
			case "likes":
				return `/api/posts/likes/${userId}`;
			default:
				return "/api/posts/all";
		}
	};

	const POST_ENDPOINT = getPostEndpoint();

	const {
		data: posts,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["posts", feedType, username], // Update the query key to refetch based on feedType and username
		queryFn: async () => {
			try {
				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);

	return (
		<div className="flex flex-col items-center space-y-4 p-4">
			{(isLoading || isRefetching) && (
				<div className="flex flex-col justify-center w-full max-w-2xl">
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className="text-center my-4">No posts in this tab. Switch to next page</p>
			)}
			{!isLoading && !isRefetching && posts && (
				<div className="w-full max-w-2xl space-y-4"> {/* Consistent width and spacing */}
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</div>
	);
};

export default Posts;
