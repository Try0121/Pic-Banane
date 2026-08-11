const CACHE="pic-banane-v1";
const CORE=["./manifest.webmanifest","./assets/banana.png","./assets/monkey-stage-1.jpg","./assets/monkey-stage-2.jpg","./assets/monkey-stage-3.jpg","./assets/monkey-stage-4.jpg","./assets/monkey-stage-5.jpg","./audio/banana-pop.wav","./audio/jungle-loop.wav","./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 if(e.request.mode==="navigate"){
   e.respondWith(fetch(e.request).then(r=>{let c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(x=>x||caches.match("./"))));
 }else{
   e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{let c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r})));
 }
});