import type { HandleDocumentRequestFunction } from "@vercel/remix";
import { RemixServer } from "@remix-run/react";
import { handleRequest } from "@vercel/remix";

const handleDocumentRequest: HandleDocumentRequestFunction = (
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) => {
  const remixServer = <RemixServer context={remixContext} url={request.url} />;

  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer,
  ) as Promise<Response>;
};

export default handleDocumentRequest;
