'use client'
import { TAGS } from '@/lib/constants'
import { classNames } from '@/lib/utils'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
} from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { parseAsBoolean, useQueryState } from 'nuqs'

const sortOptions = [
  { id: 1, value: 'popular', label: 'Popular' },
  { id: 2, value: 'new', label: 'New' },
]

const verifiedOptions = [
  { id: 1, value: true, label: 'Yes' },
  { id: 2, value: false, label: 'No' },
]

export default function SortFilterArtists() {
  const [tag, setTag] = useQueryState('tag')
  const [artistSort, setArtistSort] = useQueryState('artistSort')
  const [verified, setVerified] = useQueryState('verified', parseAsBoolean)

  return (
    <div className="bg-white">
      {/* Filters */}
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center"
      >
        <h2
          id="filter-heading"
          className="sr-only"
        >
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 pb-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <DisclosureButton className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                />
                Tags
              </DisclosureButton>
            </div>
          </div>
        </div>
        <DisclosurePanel className="border-t border-gray-200 py-6">
          <div className="mx-auto max-w-7xl px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <RadioGroup
              value={tag ?? ''}
              onChange={setTag}
              className="flex flex-wrap gap-2 justify-end"
            >
              {TAGS.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className="whitespace-nowrap cursor-pointer focus:outline-none flex items-center justify-center rounded-md bg-white p-2 text-xs font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 data-[checked]:bg-indigo-100 data-[checked]:text-indigo-700 data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-indigo-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-200 sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset"
                >
                  <span>{option}</span>
                  {option === tag && (
                    <button
                      type="button"
                      className="group relative h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20"
                      onClick={() => setTag(null)}
                    >
                      <span className="sr-only">Remove</span>
                      <svg
                        viewBox="0 0 14 14"
                        className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75"
                      >
                        <path d="M4 4l6 6m0-6l-6 6" />
                      </svg>
                      <span className="absolute -inset-1" />
                    </button>
                  )}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </DisclosurePanel>
        <div className="col-start-1 row-start-1 pb-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-x-4">
              <Menu
                as="div"
                className="relative inline-block"
              >
                <div className="flex">
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => setArtistSort(null)}
                        className="block px-4 py-2 text-sm text-gray-500 data-[focus]:bg-gray-100 w-full text-left"
                      >
                        None
                      </button>
                    </MenuItem>

                    {sortOptions.map((option) => (
                      <MenuItem key={option.id}>
                        <button
                          onClick={() => setArtistSort(option.value)}
                          className={classNames(
                            artistSort === option.value
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100 w-full text-left'
                          )}
                        >
                          {option.label}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              {/* verified */}
              <Menu
                as="div"
                className="relative inline-block"
              >
                <div className="flex">
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Verified
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => setVerified(null)}
                        className="block px-4 py-2 text-sm text-gray-500 data-[focus]:bg-gray-100 w-full text-left"
                      >
                        None
                      </button>
                    </MenuItem>

                    {verifiedOptions.map((option) => (
                      <MenuItem key={option.id}>
                        <button
                          onClick={() => setVerified(option.value)}
                          className={classNames(
                            verified === option.value
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100 w-full text-left'
                          )}
                        >
                          {option.label}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  )
}
