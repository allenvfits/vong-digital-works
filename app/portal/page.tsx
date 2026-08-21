import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { customerForUser, userFromToken } from "@/lib/backend";
import PortalClient from "./PortalClient";

export const metadata={title:"Customer Portal | Vong Digital Works",robots:{index:false,follow:false},openGraph:{images:[]},twitter:{images:[]}};
export const dynamic="force-dynamic";

export default async function PortalPage(){
  const token=(await cookies()).get("vdw_access_token")?.value;
  if(!token)redirect("/login");
  const user=await userFromToken(token);
  if(!user)redirect("/login");
  const customer=await customerForUser(user.id);
  if(!customer)redirect("/login");
  return <PortalClient/>;
}
