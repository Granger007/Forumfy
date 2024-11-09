import React from 'react';
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
	const queryClient = useQueryClient();
	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/auth/logout", {
					method: "POST",
					credentials: "include", // Ensure credentials are sent with the request
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			// Clear cached auth data and redirect
			queryClient.invalidateQueries(["authUser"]);
			queryClient.clear(); // Optionally clear all cached queries
			toast.success("Logged out successfully");
			window.location.href = "/login"; // Redirect to login page
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});

	// Fetch authenticated user data
	const { data: authUser } = useQuery({
		queryKey: ["authUser"],
		queryFn: () => fetch("/api/auth/me", { credentials: "include" }).then((res) => res.json()),
		enabled: document.cookie.includes("jwt"), // Only fetch if JWT is present
	});

	return (
		<div className="w-18 max-w-52 fixed left-0 top-[64px] md:w-52 bg-primary z-50">
			<div className="flex flex-col h-[calc(100vh-64px)] border-r border-gray-700">
				<ul className="flex flex-col gap-3 mt-4">
					<li className="flex justify-center md:justify-start">
						<Link to="/" className="flex gap-3 items-center  hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer">
							<MdHomeFilled className="w-8 h-8 " />
							<span className="text-lg hidden md:block">Home</span>
						</Link>
					</li>
					<li className="flex justify-center md:justify-start">
						<Link to="/notifications" className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer">
							<IoNotifications className="w-6 h-6" />
							<span className="text-lg hidden md:block">Notifications</span>
						</Link>
					</li>
					{authUser && (
						<li className="flex justify-center md:justify-start">
							<Link to={`/profile/${authUser.username}`} className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer">
								<FaUser className="w-6 h-6" />
								<span className="text-lg hidden md:block">Profile</span>
							</Link>
						</li>
					)}
				</ul>
				{authUser && (
					<Link
						to={`/profile/${authUser.username}`}
						className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
					>
						<div className="avatar hidden md:inline-flex">
							<div className="w-8 rounded-full">
								<img src={authUser?.profileImg || "/avatar-placeholder.png"} alt="Profile" />
							</div>
						</div>
						<div className="flex justify-between flex-1">
							<div className="hidden md:block">
								<p className="text-white font-bold text-sm w-20 truncate">{authUser?.fullName}</p>
								<p className="text-slate-500 text-sm">@{authUser?.username}</p>
							</div>
							<BiLogOut
								className="w-5 h-5 cursor-pointer"
								onClick={(e) => {
									e.preventDefault();
									logout(); // Trigger the logout mutation
								}}
							/>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
