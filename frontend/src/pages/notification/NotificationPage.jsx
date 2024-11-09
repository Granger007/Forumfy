import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const NotificationPage = () => {
	const queryClient = useQueryClient();
	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/notifications");
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	const { mutate: deleteNotifications } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/notifications", {
					method: "DELETE",
				});
				const data = await res.json();

				if (!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Notifications deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<div className='flex flex-col items-center w-full min-h-screen bg-gray-900 text-white'>
			{/* Header */}
			<div className='flex justify-between items-center w-full max-w-6xl p-4 border-b border-gray-700'>
				<p className='font-bold text-lg'>Notifications</p>
				<div className='dropdown '>
					<div tabIndex={0} role='button' className='m-1'>
						<IoSettingsOutline className='w-5 h-5' />
					</div>
					<ul
						tabIndex={0}
						className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
					>
						<li>
							<a onClick={deleteNotifications}>Delete all notifications</a>
						</li>
					</ul>
				</div>
			</div>

			{/* Content */}
			<div className='flex flex-col items-center w-full max-w-6xl'>
				{isLoading && (
					<div className='flex justify-center h-full items-center'>
						<LoadingSpinner size='lg' />
					</div>
				)}
				{notifications?.length === 0 && (
					<div className='text-center p-4 font-bold'>No notifications 🤔</div>
				)}
				{notifications?.map((notification) => (
					<div className='border-b border-gray-700 w-full' key={notification._id}>
						<div className='flex gap-2 p-4 items-center'>
							{notification.type === "follow" && <FaUser className='w-7 h-7 text-primary' />}
							{notification.type === "like" && <FaHeart className='w-7 h-7 text-red-500' />}
							<Link to={`/profile/${notification.from.username}`} className='flex items-center gap-2'>
								<div className='avatar'>
									<div className='w-8 rounded-full'>
										<img src={notification.from.profileImg || "/avatar-placeholder.png"} alt="Profile" />
									</div>
								</div>
								<div className='flex gap-1 items-center'>
									<span className='font-bold'>@{notification.from.username}</span>{" "}
									{notification.type === "follow" ? "followed you" : "liked your post"}
								</div>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotificationPage;
