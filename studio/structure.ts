import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Files,
  User,
  ListCollapse,
  Quote,
  Menu,
  Settings,
  PhoneCall,
  Users,
  Info,
  FileText,
  Home,
} from "lucide-react";
import { defaultDocumentNode } from "./defaultDocumentNode";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: Files,
        S,
        context,
      }),
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Post")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
      S.divider({ title: "References" }),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(
          S.documentTypeList("category")
            .title("Category")
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Authors",
        icon: User,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "collection",
        title: "Collection",
        icon: Home,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        icon: Quote,
        S,
        context,
      }),
      S.divider({ title: "Global" }),
      S.listItem()
        .title("Forms")
        .icon(FileText)
        .child(
          S.list()
            .title("Forms")
            .items([
              S.documentTypeListItem("formConfig").title("Form Configurations"),
              S.documentTypeListItem("formSheet").title("Form Fields"),
            ])
        ),
      S.listItem()
        .title("Pop-up Banner")
        .icon(Info)
        .child(
          S.editor().id("banner").schemaType("banner").documentId("banner")
        ),
      S.listItem()
        .title("Header")
        .icon(Menu)
        .child(
          S.editor().id("header").schemaType("header").documentId("header")
        ),
      S.listItem()
        .title("Footer")
        .icon(Menu)
        .child(
          S.editor().id("footer").schemaType("footer").documentId("footer")
        ),
      S.listItem()
        .title("Settings")
        .icon(Settings)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
    ]);
