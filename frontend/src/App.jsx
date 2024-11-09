import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import Navbar from "./components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import './utils/postInteractions';

function App() {
	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			const res = await fetch("/api/auth/me");
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	return (
		<div className="flex flex-col h-screen">
			{authUser && <Navbar />}
			<div className="flex flex-grow w-full">
				{/* Sidebar (fixed width) */}
				{authUser && (
					<div className="w-1/4 min-w-[240px]">
						<Sidebar />
					</div>
				)}

				{/* Main content area that takes up remaining space */}
				<div className="flex flex-col flex-grow w-full">
					<div style={{ marginTop: "70px", width: "100%" }}>
						<Routes>
							<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
							<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
							<Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
							<Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
							<Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
						</Routes>
					</div>
				</div>

				{/* Right Panel (fixed width) */}
				{authUser && (
					<div style={{ marginTop: "70px"}} className="w-1/4 min-w-[240px]">
						<RightPanel />
					</div>
				)}
			</div>
			<Toaster />
		</div>
	);
}

export default App;
