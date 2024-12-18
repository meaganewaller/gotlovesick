import type {
  PageLink,
  WPCategoryPreview,
  WPTagPreview,
} from '@/types'

import { ROUTES } from '@/utils/constants'
import { convertWPImgtoImg } from './convert-wp-image-to-img'

const convertTaxonomyToPageLink = ({
  databaseId,
  slug,
  title,
  ...props
}: WPCategoryPreview | WPTagPreview): PageLink => {
  return {
    id: databaseId,
    logo:
      'featuredImage' in props && props.featuredImage
        ? convertWPImgToImg(props.featuredImage.node)
        : undefined,
    name: title,
    url: slug,
  };
};

export const convertWPCategoryPreviewToPageLink = (
  category: WPCategoryPreview
): PageLink =>
  convertTaxonomyToPageLink({
    ...category,
    slug: `${ROUTES.CATEGORIES}/${category.slug}`,
  });

export const convertWPTagPreviewToPageLink = (
  tag: WPTagPreview
): PageLink =>
  convertTaxonomyToPageLink({
    ...tag,
    slug: `${ROUTES.TAGS}/${tag.slug}`,
  });
