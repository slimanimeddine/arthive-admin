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
import { useMutation, useQuery } from '@tanstack/react-query'

export type GetAuthenticatedUserArtistVerificationRequests200 =
  PaginatedApiResponse<ArtistVerificationRequestModel>
export type GetAuthenticatedUserArtistVerificationRequests401 =
  UnauthenticatedApiResponse

export type SubmitArtistVerificationRequest200 =
  ApiResource<ArtistVerificationRequestModel>
export type SubmitArtistVerificationRequest400 = ErrorApiResponse
export type SubmitArtistVerificationRequest401 = UnauthenticatedApiResponse
export type SubmitArtistVerificationRequest403 = UnauthorizedApiResponse

import type { ErrorType } from '@/lib/axios'
import { customInstance } from '@/lib/axios'
import {
  ApiResource,
  ErrorApiResponse,
  PaginatedApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { ArtistVerificationRequestModel } from '@/types/models/artist-verification-request'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Submits an artist verification request
 * @summary Submit Artist Verification Request
 */
export const submitArtistVerificationRequest = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<SubmitArtistVerificationRequest200>(
    {
      url: `/api/v1/users/me/artist-verification-requests`,
      method: 'POST',
      signal,
    },
    options
  )
}

export const getSubmitArtistVerificationRequestMutationOptions = <
  TError = ErrorType<
    | SubmitArtistVerificationRequest400
    | SubmitArtistVerificationRequest401
    | SubmitArtistVerificationRequest403
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
    TError,
    void,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['submitArtistVerificationRequest']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
    void
  > = () => {
    return submitArtistVerificationRequest(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SubmitArtistVerificationRequestMutationResult = NonNullable<
  Awaited<ReturnType<typeof submitArtistVerificationRequest>>
>

export type SubmitArtistVerificationRequestMutationError = ErrorType<
  | SubmitArtistVerificationRequest400
  | SubmitArtistVerificationRequest401
  | SubmitArtistVerificationRequest403
>

/**
 * @summary Submit Artist Verification Request
 */
export const useSubmitArtistVerificationRequest = <
  TError = ErrorType<
    | SubmitArtistVerificationRequest400
    | SubmitArtistVerificationRequest401
    | SubmitArtistVerificationRequest403
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
      TError,
      void,
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof submitArtistVerificationRequest>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions =
    getSubmitArtistVerificationRequestMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}

/**
 * Retrieve a list of artist verification requests submitted by the authenticated user.
 * @summary Get Authenticated User Artist Verification Requests
 */
export const getAuthenticatedUserArtistVerificationRequests = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<GetAuthenticatedUserArtistVerificationRequests200>(
    {
      url: `/api/v1/users/me/artist-verification-requests`,
      method: 'GET',
      signal,
    },
    options
  )
}

export const getGetAuthenticatedUserArtistVerificationRequestsQueryKey = () => {
  return [`/api/v1/users/me/artist-verification-requests`] as const
}

export const getGetAuthenticatedUserArtistVerificationRequestsQueryOptions = <
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<
        ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
      >,
      TError,
      TData
    >
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ??
    getGetAuthenticatedUserArtistVerificationRequestsQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>>
  > = ({ signal }) =>
    getAuthenticatedUserArtistVerificationRequests(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetAuthenticatedUserArtistVerificationRequestsQueryResult =
  NonNullable<
    Awaited<ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>>
  >
export type GetAuthenticatedUserArtistVerificationRequestsQueryError =
  ErrorType<GetAuthenticatedUserArtistVerificationRequests401>

export function useGetAuthenticatedUserArtistVerificationRequests<
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<
            ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
          >,
          TError,
          Awaited<
            ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
          >
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useGetAuthenticatedUserArtistVerificationRequests<
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<
            ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
          >,
          TError,
          Awaited<
            ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
          >
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useGetAuthenticatedUserArtistVerificationRequests<
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
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
 * @summary Get Authenticated User Artist Verification Requests
 */

export function useGetAuthenticatedUserArtistVerificationRequests<
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
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
  const queryOptions =
    getGetAuthenticatedUserArtistVerificationRequestsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Get Authenticated User Artist Verification Requests
 */
export const prefetchGetAuthenticatedUserArtistVerificationRequests = async <
  TData = Awaited<
    ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
  >,
  TError = ErrorType<GetAuthenticatedUserArtistVerificationRequests401>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getAuthenticatedUserArtistVerificationRequests>
        >,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions =
    getGetAuthenticatedUserArtistVerificationRequestsQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
