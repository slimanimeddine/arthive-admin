import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
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

export type ListArtistVerificationRequests200 =
  PaginatedApiResponse<ArtistVerificationRequestModel>
export type ListArtistVerificationRequests401 = UnauthenticatedApiResponse
export type ListArtistVerificationRequests403 = UnauthorizedApiResponse
export type ListArtistVerificationRequestsParams = {
  perPage?: number
  page?: string
  'filter[status]'?: 'pending' | 'approved' | 'rejected'
}

export type ReviewArtistVerificationRequest200 =
  ApiResource<ArtistVerificationRequestModel>
export type ReviewArtistVerificationRequest401 = UnauthenticatedApiResponse
export type ReviewArtistVerificationRequest403 = UnauthorizedApiResponse
export type ReviewArtistVerificationRequest404 = NotFoundApiResponse
export type ReviewArtistVerificationRequestBody = z.infer<
  typeof reviewArtistVerificationRequestBody
>

export type ShowArtistVerificationRequest200 =
  ApiResource<ArtistVerificationRequestModel>
export type ShowArtistVerificationRequest401 = UnauthenticatedApiResponse
export type ShowArtistVerificationRequest403 = UnauthorizedApiResponse
export type ShowArtistVerificationRequest404 = NotFoundApiResponse

import { customInstance } from '@/lib/axios'
import type { BodyType, ErrorType } from '@/lib/axios'
import {
  ApiResource,
  NotFoundApiResponse,
  PaginatedApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { Artwork, ArtworkModel } from '@/types/models/artwork'
import { User, UserModel } from '@/types/models/user'
import { ArtistVerificationRequestModel } from '@/types/models/artist-verification-request'
import { z } from 'zod'
import { reviewArtistVerificationRequestBody } from '@/schemas/artist-verification-requests'

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

/**
 * Retrieve a list of artist verification requests submitted by artists.
 * @summary List Artist Verification Requests
 */
export const listArtistVerificationRequests = (
  params?: ListArtistVerificationRequestsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListArtistVerificationRequests200>(
    {
      url: `/api/v1/admin/artist-verification-requests`,
      method: 'GET',
      params,
      signal,
    },
    options
  )
}

export const getListArtistVerificationRequestsQueryKey = (
  params?: ListArtistVerificationRequestsParams
) => {
  return [
    `/api/v1/admin/artist-verification-requests`,
    ...(params ? [params] : []),
  ] as const
}

export const getListArtistVerificationRequestsQueryOptions = <
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<
    ListArtistVerificationRequests401 | ListArtistVerificationRequests403
  >,
>(
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListArtistVerificationRequestsQueryKey(params)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listArtistVerificationRequests>>
  > = ({ signal }) =>
    listArtistVerificationRequests(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listArtistVerificationRequests>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>
  }
}

export type ListArtistVerificationRequestsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listArtistVerificationRequests>>
>
export type ListArtistVerificationRequestsQueryError = ErrorType<
  ListArtistVerificationRequests401 | ListArtistVerificationRequests403
>

export function useListArtistVerificationRequests<
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<
    ListArtistVerificationRequests401 | ListArtistVerificationRequests403
  >,
>(
  params: undefined | ListArtistVerificationRequestsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listArtistVerificationRequests>>,
          TError,
          Awaited<ReturnType<typeof listArtistVerificationRequests>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListArtistVerificationRequests<
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<
    ListArtistVerificationRequests401 | ListArtistVerificationRequests403
  >,
>(
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listArtistVerificationRequests>>,
          TError,
          Awaited<ReturnType<typeof listArtistVerificationRequests>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListArtistVerificationRequests<
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<
    ListArtistVerificationRequests401 | ListArtistVerificationRequests403
  >,
>(
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List Artist Verification Requests
 */

export function useListArtistVerificationRequests<
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<
    ListArtistVerificationRequests401 | ListArtistVerificationRequests403
  >,
>(
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListArtistVerificationRequestsQueryOptions(
    params,
    options
  )

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List Artist Verification Requests
 */
export const prefetchListArtistVerificationRequests = async <
  TData = Awaited<ReturnType<typeof listArtistVerificationRequests>>,
  TError = ErrorType<
    ListArtistVerificationRequests401 | ListArtistVerificationRequests403
  >,
>(
  queryClient: QueryClient,
  params?: ListArtistVerificationRequestsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listArtistVerificationRequests>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListArtistVerificationRequestsQueryOptions(
    params,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Reviews an artist verification request
 * @summary Review Artist Verification Request
 */
export const reviewArtistVerificationRequest = (
  artistVerificationRequestId: string,
  reviewArtistVerificationRequestBody?: BodyType<ReviewArtistVerificationRequestBody>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ReviewArtistVerificationRequest200>(
    {
      url: `/api/v1/admin/artist-verification-requests/${artistVerificationRequestId}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: reviewArtistVerificationRequestBody,
    },
    options
  )
}

export const getReviewArtistVerificationRequestMutationOptions = <
  TError = ErrorType<
    | ReviewArtistVerificationRequest401
    | ReviewArtistVerificationRequest403
    | ReviewArtistVerificationRequest404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
    TError,
    {
      artistVerificationRequestId: string
      data: BodyType<ReviewArtistVerificationRequestBody>
    },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
  TError,
  {
    artistVerificationRequestId: string
    data: BodyType<ReviewArtistVerificationRequestBody>
  },
  TContext
> => {
  const mutationKey = ['reviewArtistVerificationRequest']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
    {
      artistVerificationRequestId: string
      data: BodyType<ReviewArtistVerificationRequestBody>
    }
  > = (props) => {
    const { artistVerificationRequestId, data } = props ?? {}

    return reviewArtistVerificationRequest(
      artistVerificationRequestId,
      data,
      requestOptions
    )
  }

  return { mutationFn, ...mutationOptions }
}

export type ReviewArtistVerificationRequestMutationResult = NonNullable<
  Awaited<ReturnType<typeof reviewArtistVerificationRequest>>
>
export type ReviewArtistVerificationRequestMutationBody =
  BodyType<ReviewArtistVerificationRequestBody>
export type ReviewArtistVerificationRequestMutationError = ErrorType<
  | ReviewArtistVerificationRequest401
  | ReviewArtistVerificationRequest403
  | ReviewArtistVerificationRequest404
>

/**
 * @summary Review Artist Verification Request
 */
export const useReviewArtistVerificationRequest = <
  TError = ErrorType<
    | ReviewArtistVerificationRequest401
    | ReviewArtistVerificationRequest403
    | ReviewArtistVerificationRequest404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
      TError,
      {
        artistVerificationRequestId: string
        data: BodyType<ReviewArtistVerificationRequestBody>
      },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof reviewArtistVerificationRequest>>,
  TError,
  {
    artistVerificationRequestId: string
    data: BodyType<ReviewArtistVerificationRequestBody>
  },
  TContext
> => {
  const mutationOptions =
    getReviewArtistVerificationRequestMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}

/**
 * Retrieve a specific artist verification request by its ID.
 * @summary Show Artist Verification Request
 */
export const showArtistVerificationRequest = (
  artistVerificationRequestId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ShowArtistVerificationRequest200>(
    {
      url: `/api/v1/admin/artist-verification-requests/${artistVerificationRequestId}`,
      method: 'GET',
      signal,
    },
    options
  )
}

export const getShowArtistVerificationRequestQueryKey = (
  artistVerificationRequestId: string
) => {
  return [
    `/api/v1/admin/artist-verification-requests/${artistVerificationRequestId}`,
  ] as const
}

export const getShowArtistVerificationRequestQueryOptions = <
  TData = Awaited<ReturnType<typeof showArtistVerificationRequest>>,
  TError = ErrorType<
    | ShowArtistVerificationRequest401
    | ShowArtistVerificationRequest403
    | ShowArtistVerificationRequest404
  >,
>(
  artistVerificationRequestId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showArtistVerificationRequest>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ??
    getShowArtistVerificationRequestQueryKey(artistVerificationRequestId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof showArtistVerificationRequest>>
  > = ({ signal }) =>
    showArtistVerificationRequest(
      artistVerificationRequestId,
      requestOptions,
      signal
    )

  return {
    queryKey,
    queryFn,
    enabled: !!artistVerificationRequestId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showArtistVerificationRequest>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ShowArtistVerificationRequestQueryResult = NonNullable<
  Awaited<ReturnType<typeof showArtistVerificationRequest>>
>
export type ShowArtistVerificationRequestQueryError = ErrorType<
  | ShowArtistVerificationRequest401
  | ShowArtistVerificationRequest403
  | ShowArtistVerificationRequest404
>

export function useShowArtistVerificationRequest<
  TData = Awaited<ReturnType<typeof showArtistVerificationRequest>>,
  TError = ErrorType<
    | ShowArtistVerificationRequest401
    | ShowArtistVerificationRequest403
    | ShowArtistVerificationRequest404
  >,
>(
  artistVerificationRequestId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showArtistVerificationRequest>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showArtistVerificationRequest>>,
          TError,
          Awaited<ReturnType<typeof showArtistVerificationRequest>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowArtistVerificationRequest<
  TData = Awaited<ReturnType<typeof showArtistVerificationRequest>>,
  TError = ErrorType<
    | ShowArtistVerificationRequest401
    | ShowArtistVerificationRequest403
    | ShowArtistVerificationRequest404
  >,
>(
  artistVerificationRequestId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showArtistVerificationRequest>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showArtistVerificationRequest>>,
          TError,
          Awaited<ReturnType<typeof showArtistVerificationRequest>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowArtistVerificationRequest<
  TData = Awaited<ReturnType<typeof showArtistVerificationRequest>>,
  TError = ErrorType<
    | ShowArtistVerificationRequest401
    | ShowArtistVerificationRequest403
    | ShowArtistVerificationRequest404
  >,
>(
  artistVerificationRequestId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showArtistVerificationRequest>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary Show Artist Verification Request
 */

export function useShowArtistVerificationRequest<
  TData = Awaited<ReturnType<typeof showArtistVerificationRequest>>,
  TError = ErrorType<
    | ShowArtistVerificationRequest401
    | ShowArtistVerificationRequest403
    | ShowArtistVerificationRequest404
  >,
>(
  artistVerificationRequestId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showArtistVerificationRequest>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getShowArtistVerificationRequestQueryOptions(
    artistVerificationRequestId,
    options
  )

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Show Artist Verification Request
 */
export const prefetchShowArtistVerificationRequestQuery = async <
  TData = Awaited<ReturnType<typeof showArtistVerificationRequest>>,
  TError = ErrorType<
    | ShowArtistVerificationRequest401
    | ShowArtistVerificationRequest403
    | ShowArtistVerificationRequest404
  >,
>(
  queryClient: QueryClient,
  artistVerificationRequestId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showArtistVerificationRequest>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getShowArtistVerificationRequestQueryOptions(
    artistVerificationRequestId,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
