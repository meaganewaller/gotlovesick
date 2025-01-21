import type { Nullable } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'

export type CastVotePayload = {
  clientMutationId: Nullable<string>;
  success: boolean;
  message: string;
  pollSlug: string;
  optionId: string
}

export type CastVoteResponse = {
  castVote: CastVotePayload;
}

export const castVoteMutation = `mutation CastVote($input: CastVoteInput!) {
  castVote(input: $input) {
    clientMutationId
    success
    message
    pollSlug
    optionId
  }
}`

export type CastVoteInput = {
  clientMutationId: string;
  pollSlug: string;
  optionId: string;
}

export const castVote = async (
  input: CastVoteInput
): Promise<CastVotePayload> => {
  const response = await fetchGraphQL<CastVoteResponse>({
    query: castVoteMutation,
    url: getGraphQLUrl(),
    variables: { input },
  })

  return response.castVote;
}

