import DashboardClient from "./DashboardClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userFromToken, teamProfileForUser } from "@/lib/backend";
export const metadata={title:"Business Dashboard | Vong Digital Works",robots:{index:false,follow:false},openGraph:{images:[]},twitter:{images:[]}};
export const dynamic="force-dynamic";
export default async function Dashboard(){const token=(await cookies()).get("vdw_access_token")?.value;const configured=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY);if(configured){if(!token)redirect("/login");const user=await userFromToken(token);if(!user)redirect("/login");const profile=await teamProfileForUser(user.id);if(!profile)redirect("/login");}return <DashboardClient/>}
