import { fetchGraphQL, getGraphQLUrl } from "@/utils/helpers";
import type { TutorialType, SkillLevel, GraphQLNodes, TutorialList } from "@/types"

type TutorialTypeResponse = {
  tutorialTypes: GraphQLNodes<TutorialType>
}

type SkillLevelResponse = {
  skillLevels: GraphQLNodes<SkillLevel>
}

type TutorialsResponse = TutorialList

const fetchAllTutorialTypesQuery = `query fetchAllTutorialTypesQuery {
  tutorialTypes {
    nodes {
      databaseId
      id
      name
      slug
    }
  }
}`

const fetchAllSkillLevelsQuery = `query fetchAllSkillLevelsQuery {
  skillLevels {
    nodes {
      databaseId
      id
      name
      slug
    }
  }
}`

const fetchAllTutorialsQuery = `query fetchAllTutorialsQuery($size: Int!, $offset: Int!) {
  tutorials(where: {
    offsetPagination: {
      size: $size,
      offset: $offset
    },
    orderby: {
      field: DATE,
      order: DESC
    }
  }) {
    nodes {
      databaseId
      date
      excerpt(format: RENDERED)
      featuredImage {
        node {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
      }
      id
      skillLevels {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
      slug
      title
      tutorialFields {
        description
      }
      tutorialTypes {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`

const fetchFilterByType = `query fetchFilteredTutorialsQuery($tutorialType: String, $size: Int!, $offset: Int!) {
  tutorials(where: {
    offsetPagination: {
      size: $size,
      offset: $offset
    },
    orderby: {
      field: DATE,
      order: DESC
    },
    taxQuery: {
      taxArray: [
        {
          terms: [$tutorialType],
          taxonomy: TUTORIALTYPE,
          operator: IN,
          field: SLUG
        }
      ]
    }
  }) {
    nodes {
      databaseId
      date
      excerpt(format: RENDERED)
      featuredImage {
        node {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
      }
      id
      skillLevels {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
      slug
      title
      tutorialFields {
        description
      }
      tutorialTypes {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`

const fetchFilterByLevel = `query fetchFilteredTutorialsQuery($size: Int!, $offset: Int!, $skillLevel: String) {
  tutorials(where: {
    offsetPagination: {
      size: $size,
      offset: $offset,
    },
    orderby: {
      field: DATE,
      order: DESC
    },
    taxQuery: {
      taxArray: [
        {
          terms: [$skillLevel],
          taxonomy: SKILLLEVEL,
          operator: IN,
          field: SLUG
        }
      ]
    }
  }) {
    nodes {
      databaseId
      date
      excerpt(format: RENDERED)
      featuredImage {
        node {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
      }
      id
      skillLevels {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
      slug
      title
      tutorialFields {
        description
      }
      tutorialTypes {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`

const fetchFilteredTutorialsQuery = `query fetchFilteredTutorialsQuery($tutorialType: String, $skillLevel: String, $size: Int!, $offset: Int!) {
  tutorials(where: {
    offsetPagination: {
      size: $size,
      offset: $offset
    },
    orderby: {
      field: DATE,
      order: DESC
    },
    taxQuery: {
      relation: AND
      taxArray: [
        {
          terms: [$skillLevel],
          taxonomy: SKILLLEVEL,
          operator: IN,
          field: SLUG
        },
        {
          terms: [$tutorialType],
          taxonomy: TUTORIALTYPE,
          operator: IN,
          field: SLUG
        }
      ]
    }
  }) {
    nodes {
      databaseId
      date
      excerpt(format: RENDERED)
      featuredImage {
        node {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
      }
      id
      skillLevels {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
      slug
      title
      tutorialFields {
        description
      }
      tutorialTypes {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`

interface TutorialProps {
  page: number
  perPage: number
  tutorialType?: string
  skillLevel?: string
}

export async function fetchAllTutorials(props: TutorialProps) {
  let response = undefined

  const page = props.page
  const perPage = props.perPage
  const tutorialType = props.tutorialType
  const skillLevel =  props.skillLevel

  if (tutorialType && skillLevel) {
    response = await fetchGraphQL<TutorialsResponse>({
      query: fetchFilteredTutorialsQuery,
      url: getGraphQLUrl(),
      variables: { skillLevel: skillLevel, tutorialType: tutorialType, offset: (page - 1) * perPage, size: perPage },
    })
  } else if (tutorialType) {
    response = await fetchGraphQL<TutorialsResponse>({
      query: fetchFilterByType,
      url: getGraphQLUrl(),
      variables: { tutorialType: tutorialType, offset: (page - 1) * perPage, size: perPage },
    })
  } else if (skillLevel) {
    response = await fetchGraphQL<TutorialsResponse>({
      query: fetchFilterByLevel,
      url: getGraphQLUrl(),
      variables: { offset: (page - 1) * perPage, size: perPage, skillLevel },
    })
  } else {
    response = await fetchGraphQL<TutorialsResponse>({
      query: fetchAllTutorialsQuery,
      url: getGraphQLUrl(),
      variables: { offset: (page - 1) * perPage, size: perPage },
    });
  }

  return response;
};

export async function fetchAllTutorialTypes() {
  let response = undefined

  response = await fetchGraphQL<TutorialTypeResponse>({
    query: fetchAllTutorialTypesQuery,
    url: getGraphQLUrl(),
    variables: {},
  })

  return response
}

export async function fetchAllSkillLevels() {
  let response = undefined

  response = await fetchGraphQL<SkillLevelResponse>({
    query: fetchAllSkillLevelsQuery,
    url: getGraphQLUrl(),
    variables: {},
  })

  return response
}
