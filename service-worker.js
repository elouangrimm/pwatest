const custom_offline_page = "offline.html"

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('CacheName').then((cache) => {
			return cache.addAll([
				custom_offline_page
			])
		})
	)
})

self.addEventListener("fetch", (event) => {
	event.respondWith(
		(async () => {
			try {
				// Fetch request from network
				const networkResponse = await fetch(event.request)
				return networkResponse
			} catch (error) {
				// Error thrown when a user has no internet connection
				const cache = await caches.open('CacheName')
				const cachedResponse = await cache.match(custom_offline_page)
				return cachedResponse
			}
		})()
	)
})