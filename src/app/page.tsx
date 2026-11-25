import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthCookie } from "@/features/auth/auth-cookie";
import { Dashboard } from "@/features/dashboard/components/Dashboard";

export const instant = false;

const Home = async () => {
	const cookieStore = await cookies();
	const user = getAuthCookie(cookieStore);

	if (!user) {
		redirect("/login");
	}

	return <Dashboard user={user} />;
};

export default Home;
