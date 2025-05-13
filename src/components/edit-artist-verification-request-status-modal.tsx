'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {
  ReviewArtistVerificationRequestBody,
  useReviewArtistVerificationRequest,
} from '@/hooks/endpoints/admin'
import { reviewArtistVerificationRequestBody } from '@/schemas/artist-verification-requests'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { authHeader, onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

type StatusModalProps = {
  id: string
  token: string
  status: ReviewArtistVerificationRequestBody['status']
}

export default function StatusModal({ id, token, status }: StatusModalProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { handleSubmit, register, formState, watch } =
    useForm<ReviewArtistVerificationRequestBody>({
      resolver: zodResolver(reviewArtistVerificationRequestBody),
      defaultValues: {
        status,
      },
    })

  const reviewArtistVerificationRequestMutation =
    useReviewArtistVerificationRequest(authHeader(token))

  function onSubmit(data: ReviewArtistVerificationRequestBody) {
    reviewArtistVerificationRequestMutation.mutate(
      {
        artistVerificationRequestId: id,
        data,
      },
      {
        onError,
        onSuccess: () => {
          toast.success('Personal Information updated successfully!')
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/admin/artist-verification-requests/${id}`],
          })
          queryClient.invalidateQueries({
            queryKey: ['/api/v1/admin/artist-verification-requests'],
          })
        },
      }
    )
  }

  const isDisabled =
    formState.isSubmitting ||
    reviewArtistVerificationRequestMutation.isPending ||
    !token ||
    !formState.isDirty

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Edit
      </button>

      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-yellow-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Update Document Status
                    </DialogTitle>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <select
                          id="status"
                          {...register('status')}
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        {formState.errors.status && (
                          <p className="mt-2 text-sm text-red-600">
                            {formState.errors.status.message}
                          </p>
                        )}
                      </div>

                      {watch('status') === 'rejected' && (
                        <div>
                          <label
                            htmlFor="rejectionReason"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rejection Reason
                          </label>
                          <textarea
                            id="rejectionReason"
                            {...register('reason')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          {formState.errors.reason && (
                            <p className="mt-2 text-sm text-red-600">
                              {formState.errors.reason.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  >
                    Update Status
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
