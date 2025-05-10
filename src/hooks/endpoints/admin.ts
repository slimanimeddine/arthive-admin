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

import { customInstance } from '@/lib/axios'
import type { ErrorType } from '@/lib/axios'
import {
  PaginatedApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { ArtworkModel } from '@/types/models/artwork'

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
