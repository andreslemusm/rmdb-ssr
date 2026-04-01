const fetchFn = async <TReturnType = void>(request: Request) => {
  const response = await fetch(request)

  if (!response.ok) {
    const apiError = await response.json()

    if (import.meta.env.DEV) {
      // oxlint-disable-next-line no-console -- Improve debugging in development
      console.error(
        `URL:\n${response.url}\n Error:\n${JSON.stringify(apiError)}\n`,
      )
    }

    throw new Error(JSON.stringify(apiError))
  }

  // We assume that our API will follow the specification.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return response.json() as Promise<TReturnType>
}

/**
 * Generates a URLSearchParams object from a given object.
 * @param params Object to generate URLSearchParams from.
 * @param oldParams Optional URLSearchParams object to append to.
 * @returns URLSearchParams object.
 * @example
 * const params = { foo: "bar", baz: ["qux", "quux"] };
 * const searchParamsString = generateSearchParamsString(params);
 * console.log(searchParamsString); // "foo=bar&baz=qux&baz=quux"
 * @example
 * const params = { foo: "bar", baz: ["qux", "quux"] };
 * const oldParams = new URLSearchParams("foo=bar&baz=qux");
 * const searchParamsString = generateSearchParamsString(params, oldParams);
 * console.log(searchParamsString); // "foo=bar&baz=qux&baz=quux"
 * @example
 * const params = { foo: "bar", baz: null };
 * const oldParams = new URLSearchParams("foo=corgi&baz=qux");
 * const searchParamsString = generateSearchParamsString(params);
 * console.log(searchParamsString); // "foo=bar"
 */
const generateSearchParamsString = (
  params: Record<
    string,
    | Array<string>
    | ReadonlyArray<string>
    | string
    | number
    | undefined
    | null
    | boolean
  >,
  oldParams?: URLSearchParams,
) => {
  const newSearchParams = new URLSearchParams(oldParams)

  for (const [key, value] of Object.entries(params)) {
    // Append array values as multiple search params
    if (Array.isArray(value)) {
      newSearchParams.delete(key)

      for (const subValue of value) {
        newSearchParams.append(key, subValue)
      }
    }
    // Delete search param if value is null
    else if (value === null) {
      newSearchParams.delete(key)
    }
    // Else, append search param with value
    else if (value !== undefined) {
      newSearchParams.delete(key)

      newSearchParams.append(key, value.toString())
    }
  }

  return newSearchParams.toString()
}

export const apiClient = {
  query: <TReturnType = void>(config: {
    endpoint: string
    searchParams?: Parameters<typeof generateSearchParamsString>[0]
  }): Promise<TReturnType> => {
    const request = new Request(
      `https://api.themoviedb.org/3/${config.endpoint}?${generateSearchParamsString(
        { api_key: process.env.TDMB_API_KEY, ...config.searchParams },
      )}`,
      { method: "get" },
    )

    return fetchFn<TReturnType>(request)
  },
} as const
