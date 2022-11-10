const apiClient = {
  query: async <TReturnType = void>(config: {
    endpoint: string;
    searchParams?: Parameters<typeof convertToSearchParams>[0];
  }): Promise<TReturnType> => {
    const request = new Request(
      `https://api.themoviedb.org/3/${config.endpoint}${convertToSearchParams({
        api_key: process.env.API_KEY,
        ...config.searchParams,
      })}`,
      {
        method: "get",
      }
    );

    return await fetchFn<TReturnType>(request);
  },
};

const fetchFn = async <TReturnType = void>(request: Request) => {
  const response = await fetch(request);

  if (!response.ok) {
    const apiError = (await response.json()) as {
      error: string;
      message: Array<string> | string;
      status: number;
    };

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console -- Improve debugging in development
      console.error(
        `URL:\n${response.url}\n Error:\n${JSON.stringify(apiError)}\n`
      );
    }

    return Promise.reject(apiError);
  }

  return response.json() as Promise<TReturnType>;
};

const convertToSearchParams = (
  obj: Record<string, string | number | null | undefined>
): string => {
  const cleanedObject = Object.keys(obj).reduce<Record<string, string>>(
    (acc, key) => {
      const keyValue = obj[key];

      if (typeof keyValue === "number") {
        return { ...acc, [key]: keyValue.toString() };
      }

      if (typeof keyValue === "string") {
        return { ...acc, [key]: keyValue };
      }

      return acc;
    },
    {}
  );

  return `?${new URLSearchParams(cleanedObject).toString()}`;
};

export { apiClient, convertToSearchParams };
