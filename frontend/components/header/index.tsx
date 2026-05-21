import { fetchSanityHeader } from "@/sanity/lib/fetch";
import Navbar1 from "./navbar-1";

export default async function Header() {
  const navigation = await fetchSanityHeader();

  return <Navbar1 navigation={navigation} />;
}
