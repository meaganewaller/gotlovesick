import { GraphQLNodes, WPSeo, Nullable, GraphQLNode, WPImage } from "@/types"

export type SkillLevel = {
  databaseId: number
  id: string
  name: string
  slug: string
}

export type TutorialType = {
  databaseId: number;
  id: string;
  name: string;
  slug: string
}

export type TutorialFields = {
  description: string
}

export type TutorialCard = {
  databaseId: number
  date: string
  excerpt: string
  featuredImage?: Nullable<GraphQLNode<WPImage>>
  id: string
  skillLevels: GraphQLNodes<SkillLevel>
  slug: string
  title: string
  tutorialFields: TutorialFields
  tutorialTypes: GraphQLNodes<TutorialType>
}

export type Tutorial = TutorialCard & {
  content: string
  seo: WPSeo
}

export type TutorialList = {
  tutorials: {
    nodes: TutorialCard[]
    pageInfo: {
      offsetPagination: {
        total: number
      }
    }
  }
}
