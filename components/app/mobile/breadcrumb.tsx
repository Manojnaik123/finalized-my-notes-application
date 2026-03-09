import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { folders } from "@/delete-later/data";
import { useParams } from "next/navigation"

export function BreadcrumbMobile() {
  const { folderId } = useParams()

  const numericFolderId = Number(folderId)

  const curFolder = folders.find((folder) => folder.id === numericFolderId);

  return (
    <Breadcrumb className="flex md:hidden">
      <BreadcrumbList>
        {/* <BreadcrumbItem>
          <BreadcrumbLink href="#">Base folder</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbLink href={`/mynotes/dashboard/${curFolder?.id}`}>{curFolder?.title}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
