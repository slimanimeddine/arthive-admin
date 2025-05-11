import { useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

export type ListArtworks200 = PaginatedApiResponse<ArtworkModel>
export type ListArtworks401 = UnauthenticatedApiResponse
export type ListArtworks403 = UnauthorizedApiResponse
export type ListArtworksParams = {
  'filter[tag]'?: string
  'filter[status]'?: 'draft' | 'published'
  sort?: 'rising' | 'new' | 'popular' | 'trending'
  page?: string
  perPage?: string
}

export type ShowArtwork200 = ApiResource<
  Omit<Artwork, 'artwork_comments' | 'artwork_likes'>
>
export type ShowArtwork401 = UnauthenticatedApiResponse
export type ShowArtwork403 = UnauthorizedApiResponse
export type ShowArtwork404 = NotFoundApiResponse

export type ListUsers200 = PaginatedApiResponse<UserModel>
export type ListUsers401 = UnauthenticatedApiResponse
export type ListUsers403 = UnauthorizedApiResponse
export type ListUsersParams = {
  'filter[country]'?: string
  'filter[tag]'?: string
  'filter[verified]'?: boolean
  sort?: 'new' | 'popular'
  page?: string
  perPage?: string
}

export type ShowArtist200 = ApiResource<
  Omit<
    User,
    | 'published_artworks'
    | 'drafts'
    | 'followers'
    | 'following'
    | 'favorites'
    | 'artwork_likes'
    | 'artwork_comments'
    | 'received_artwork_likes'
  >
>
export type ShowArtist401 = UnauthenticatedApiResponse
export type ShowArtist403 = UnauthorizedApiResponse
export type ShowArtist404 = NotFoundApiResponse

import { customInstance } from '@/lib/axios'
import type { ErrorType } from '@/lib/axios'
import {
  ApiResource,
  NotFoundApiResponse,
  PaginatedApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { Artwork, ArtworkModel } from '@/types/models/artwork'
import { User, UserModel } from '@/types/models/user'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve a list of all artworks
 * @summary List Artworks
 */
export const listArtworks = (
  params?: ListArtworksParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListArtworks200>(
    { url: `/api/v1/admin/artworks`, method: 'GET', params, signal },
    options
  )
}

export const getListArtworksQueryKey = (params?: ListArtworksParams) => {
  return [`/api/v1/admin/artworks`, ...(params ? [params] : [])] as const
}

export const getListArtworksQueryOptions = <
  TData = Awaited<ReturnType<typeof listArtworks>>,
  TError = ErrorType<ListArtworks401 | ListArtworks403>,
>(
  params?: ListArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listArtworks>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getListArtworksQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listArtworks>>> = ({
    signal,
  }) => listArtworks(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listArtworks>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListArtworksQueryResult = NonNullable<
  Awaited<ReturnType<typeof listArtworks>>
>
export type ListArtworksQueryError = ErrorType<
  ListArtworks401 | ListArtworks403
>

export function useListArtworks<
  TData = Awaited<ReturnType<typeof listArtworks>>,
  TError = ErrorType<ListArtworks401 | ListArtworks403>,
>(
  params: undefined | ListArtworksParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listArtworks>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listArtworks>>,
          TError,
          Awaited<ReturnType<typeof listArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListArtworks<
  TData = Awaited<ReturnType<typeof listArtworks>>,
  TError = ErrorType<ListArtworks401 | ListArtworks403>,
>(
  params?: ListArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listArtworks>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listArtworks>>,
          TError,
          Awaited<ReturnType<typeof listArtworks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListArtworks<
  TData = Awaited<ReturnType<typeof listArtworks>>,
  TError = ErrorType<ListArtworks401 | ListArtworks403>,
>(
  params?: ListArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listArtworks>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List Artworks
 */

export function useListArtworks<
  TData = Awaited<ReturnType<typeof listArtworks>>,
  TError = ErrorType<ListArtworks401 | ListArtworks403>,
>(
  params?: ListArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listArtworks>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListArtworksQueryOptions(params, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Artworks
 */
export const prefetchListArtworksQuery = async <
  TData = Awaited<ReturnType<typeof listArtworks>>,
  TError = ErrorType<ListArtworks401 | ListArtworks403>,
>(
  queryClient: QueryClient,
  params?: ListArtworksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listArtworks>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListArtworksQueryOptions(params, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Retrieve a specific artwork by its ID.
 * @summary Show Artwork
 */
export const showArtwork = (
  artworkId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ShowArtwork200>(
    { url: `/api/v1/admin/artworks/${artworkId}`, method: 'GET', signal },
    options
  )
}

export const getShowArtworkQueryKey = (artworkId: string) => {
  return [`/api/v1/admin/artworks/${artworkId}`] as const
}

export const getShowArtworkQueryOptions = <
  TData = Awaited<ReturnType<typeof showArtwork>>,
  TError = ErrorType<ShowArtwork401 | ShowArtwork403 | ShowArtwork404>,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtwork>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getShowArtworkQueryKey(artworkId)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof showArtwork>>> = ({
    signal,
  }) => showArtwork(artworkId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!artworkId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showArtwork>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ShowArtworkQueryResult = NonNullable<
  Awaited<ReturnType<typeof showArtwork>>
>
export type ShowArtworkQueryError = ErrorType<
  ShowArtwork401 | ShowArtwork403 | ShowArtwork404
>

export function useShowArtwork<
  TData = Awaited<ReturnType<typeof showArtwork>>,
  TError = ErrorType<ShowArtwork401 | ShowArtwork403 | ShowArtwork404>,
>(
  artworkId: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtwork>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showArtwork>>,
          TError,
          Awaited<ReturnType<typeof showArtwork>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowArtwork<
  TData = Awaited<ReturnType<typeof showArtwork>>,
  TError = ErrorType<ShowArtwork401 | ShowArtwork403 | ShowArtwork404>,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtwork>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showArtwork>>,
          TError,
          Awaited<ReturnType<typeof showArtwork>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowArtwork<
  TData = Awaited<ReturnType<typeof showArtwork>>,
  TError = ErrorType<ShowArtwork401 | ShowArtwork403 | ShowArtwork404>,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtwork>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary Show Artwork
 */

export function useShowArtwork<
  TData = Awaited<ReturnType<typeof showArtwork>>,
  TError = ErrorType<ShowArtwork401 | ShowArtwork403 | ShowArtwork404>,
>(
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtwork>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getShowArtworkQueryOptions(artworkId, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Show Artwork
 */
export const prefetchShowArtworkQuery = async <
  TData = Awaited<ReturnType<typeof showArtwork>>,
  TError = ErrorType<ShowArtwork401 | ShowArtwork403 | ShowArtwork404>,
>(
  queryClient: QueryClient,
  artworkId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtwork>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getShowArtworkQueryOptions(artworkId, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Retrieve a list of all users
 * @summary List Users
 */
export const listUsers = (
  params?: ListUsersParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListUsers200>(
    { url: `/api/v1/admin/artists`, method: 'GET', params, signal },
    options
  )
}

export const getListUsersQueryKey = (params?: ListUsersParams) => {
  return [`/api/v1/admin/artists`, ...(params ? [params] : [])] as const
}

export const getListUsersQueryOptions = <
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<ListUsers401 | ListUsers403>,
>(
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getListUsersQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listUsers>>> = ({
    signal,
  }) => listUsers(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listUsers>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListUsersQueryResult = NonNullable<
  Awaited<ReturnType<typeof listUsers>>
>
export type ListUsersQueryError = ErrorType<ListUsers401 | ListUsers403>

export function useListUsers<
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<ListUsers401 | ListUsers403>,
>(
  params: undefined | ListUsersParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUsers>>,
          TError,
          Awaited<ReturnType<typeof listUsers>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListUsers<
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<ListUsers401 | ListUsers403>,
>(
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUsers>>,
          TError,
          Awaited<ReturnType<typeof listUsers>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListUsers<
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<ListUsers401 | ListUsers403>,
>(
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List Users
 */

export function useListUsers<
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<ListUsers401 | ListUsers403>,
>(
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListUsersQueryOptions(params, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Users
 */
export const prefetchListUsersQuery = async <
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<ListUsers401 | ListUsers403>,
>(
  queryClient: QueryClient,
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListUsersQueryOptions(params, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Retrieve a specific artist by its ID.
 * @summary Show Artist
 */
export const showArtist = (
  artistId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ShowArtist200>(
    { url: `/api/v1/admin/artists/${artistId}`, method: 'GET', signal },
    options
  )
}

export const getShowArtistQueryKey = (artistId: string) => {
  return [`/api/v1/admin/artists/${artistId}`] as const
}

export const getShowArtistQueryOptions = <
  TData = Awaited<ReturnType<typeof showArtist>>,
  TError = ErrorType<ShowArtist401 | ShowArtist403 | ShowArtist404>,
>(
  artistId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtist>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getShowArtistQueryKey(artistId)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof showArtist>>> = ({
    signal,
  }) => showArtist(artistId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!artistId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showArtist>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ShowArtistQueryResult = NonNullable<
  Awaited<ReturnType<typeof showArtist>>
>
export type ShowArtistQueryError = ErrorType<
  ShowArtist401 | ShowArtist403 | ShowArtist404
>

export function useShowArtist<
  TData = Awaited<ReturnType<typeof showArtist>>,
  TError = ErrorType<ShowArtist401 | ShowArtist403 | ShowArtist404>,
>(
  artistId: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtist>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showArtist>>,
          TError,
          Awaited<ReturnType<typeof showArtist>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowArtist<
  TData = Awaited<ReturnType<typeof showArtist>>,
  TError = ErrorType<ShowArtist401 | ShowArtist403 | ShowArtist404>,
>(
  artistId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtist>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showArtist>>,
          TError,
          Awaited<ReturnType<typeof showArtist>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowArtist<
  TData = Awaited<ReturnType<typeof showArtist>>,
  TError = ErrorType<ShowArtist401 | ShowArtist403 | ShowArtist404>,
>(
  artistId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtist>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary Show Artist
 */

export function useShowArtist<
  TData = Awaited<ReturnType<typeof showArtist>>,
  TError = ErrorType<ShowArtist401 | ShowArtist403 | ShowArtist404>,
>(
  artistId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtist>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getShowArtistQueryOptions(artistId, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Show Artist
 */
export const prefetchShowArtistQuery = async <
  TData = Awaited<ReturnType<typeof showArtist>>,
  TError = ErrorType<ShowArtist401 | ShowArtist403 | ShowArtist404>,
>(
  queryClient: QueryClient,
  artistId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showArtist>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getShowArtistQueryOptions(artistId, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
