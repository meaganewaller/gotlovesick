import type { Article, WPPost } from '@/types'
import { ROUTES } from '@/utils/constants'
import { updateContentTree } from '@/utils/helpers'
import {
  convertWPTagPreviewToPageLink,
  convertWPCategoryPreviewToPageLink,
} from './convert-taxonomy-to-page-link'
import { convertWPImgToImg } from './convert-wp-image-to-img'

export const convertPostToArticle = ({
  acfPosts,
  author,
  commentCount,
  contentParts,
  databaseId,
  date,
  featuredImage,
  info,
  modified,
  seo,
  slug,
  title,
}: WPPost): Article => {
  return {
    content: updateContentTree(contentParts.afterMore),
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      author: author.node.name,
      commentsCount: commentCount ?? 0,
      cover: featuredImage ? convertWPImgToImg(featuredImage.node) : undefined,
      dates: {
        publication: date,
        update: modified,
      },
      seo: {
        description: seo.metaDesc,
        title: seo.title,
      },
      categories: acfPosts?.postsInCategory?.map(
        convertWPCategoryPreviewToPageLink
      ),
      tags: acfPosts?.postsInTag?.map(convertWPCategoryPreviewToPageLink),
      wordsCount: info.wordsCount,
    },
    slug: `${ROUTES.ARTICLE}/${slug}`,
    title,
  };
}
