import type { GraphQLNodes, GraphQLNode, Nullable, WPImage, WPSeo } from "@/types"

export type WPFunExtraType = {
  key: string
  name: string
  count: number
  description: Nullable<string>
  funExtras: GraphQLNodes<WPFunExtra>
}

export type WPFunExtra = {
  key: string
  title: string
  link: string
  featuredImage: Nullable<GraphQLNode<WPImage>>
}

export type WPPollLtd = {
  key: string
  title: string
  uri: string
  featuredImage: Nullable<GraphQLNode<WPImage>>
  pollDetails: {
    description: string
  }
}

export type WPPollList = GraphQLNodes<WPPollLtd>

export type WPPoll = {
  key: string
  id: string
  slug: string
  date: string
  title: string
  uri: string
  featuredImage: Nullable<GraphQLNode<WPImage>>
  seo: WPSeo
  pollDetails: {
    description: string
    limited: Boolean
    expiration: Nullable<string>
    question: string
    pollOptions: {
      body: string
      votes: number
      id: string
    }[]
  }
}
