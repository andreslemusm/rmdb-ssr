/* eslint-disable functional/no-let, no-console
  --
  Need these ones to make it work
*/
import type { HandleDocumentRequestFunction } from "@remix-run/node";
import { PassThrough } from "stream";
import { RemixServer } from "@remix-run/react";
import { Response } from "@remix-run/node";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";

const ABORT_DELAY = 5000;

const handleDocumentRequest: HandleDocumentRequestFunction = (
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) =>
  isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );

const handleBotRequest: HandleDocumentRequestFunction = (
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) =>
  new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onAllReady: () => {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError: (error: unknown) => {
          reject(error);
        },
        onError: (error: unknown) => {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });

const handleBrowserRequest: HandleDocumentRequestFunction = (
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) =>
  new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady: () => {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError: (error: unknown) => {
          reject(error);
        },
        onError: (error: unknown) => {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });

export default handleDocumentRequest;
