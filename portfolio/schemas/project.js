export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "order",
      title: "Order",
      type: "number",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "github",
      title: "Github",
      type: "url",
    },
    {
      name: "url",
      title: "Url",
      type: "url",
    },
    {
      name: "video",
      title: "Video",
      type: "url",
    },
  ],
};
