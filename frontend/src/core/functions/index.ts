import { usePathname } from "next/navigation";

export function getParentLink() {
  const pathname = usePathname();
  const parentLink = pathname.split("/").slice(0, -1).join("/");

  return parentLink;
}