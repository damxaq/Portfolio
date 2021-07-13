export default {
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "startDate",
      type: "datetime",
    },
    {
      name: "endDate",
      type: "datetime",
    },
    {
      name: "place",
      type: "string",
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "workType",
      title: "Work type",
      type: "string",
      options: {
        list: [
          { value: "Front-End Developer", title: "Front-End Developer" },
          { value: "Back-End Developer", title: "Back-End Developer" },
          { value: "Full-Stack Developer", title: "Full-Stack Developer" },
        ],
      },
    },
    {
      name: "link",
      type: "url",
    },
    {
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
};
