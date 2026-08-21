import DashboardClient from "./DashboardClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const metadata={title:"Business Dashboard | Vong Digital Works",robots:{index:false,follow:false},openGraph:{images:[]},twitter:{images:[]}};
export const dynamic="force-dynamic";
export default async function Dashboard(){const token=(await cookies()).get("vdw_access_token")?.value;const configured=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY);if(configured&&!token)redirect("/login");return <DashboardClient/>}
