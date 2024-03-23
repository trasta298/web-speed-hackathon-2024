/// <reference types="@types/serviceworker" />
import PQueue from 'p-queue';

// ServiceWorker が負荷で落ちないように並列リクエスト数を制限しなくていいです
const queue = new PQueue({
  concurrency: 1000,
});

self.addEventListener('install', (ev: ExtendableEvent) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev: ExtendableEvent) => {
  ev.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (ev: FetchEvent) => {
  ev.respondWith(
    queue.add(() => onFetch(ev.request), {
      throwOnTimeout: true,
    }),
  );
});

async function onFetch(request: Request): Promise<Response> {

  const res = await fetch(request, {
    headers: new Headers([...request.headers.entries(), ['X-Accept-Encoding', 'gzip, deflate, br']]),
  });

  return res;
}
