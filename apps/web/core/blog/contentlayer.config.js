import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the article',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the article',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (article) => `/${article._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'apps/web/core/blog/content',
  documentTypes: [Article],
});
