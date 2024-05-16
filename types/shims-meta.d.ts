import { RouteLocationNormalizedLoaded } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    auth?: boolean,
    langs?: string[],
    keepAlive?: boolean,
    transition?: string
    // You can add other custom meta properties if needed
  }

  interface RouteMetaExtended extends RouteMeta {
    // You can extend RouteMeta with additional custom properties if needed
  }

  interface RouteLocationNormalizedLoadedMeta extends RouteLocationNormalizedLoaded {
    meta: RouteMetaExtended;
  }
}