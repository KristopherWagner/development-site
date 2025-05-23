/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WeddingIndexImport } from './routes/wedding/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WeddingIndexRoute = WeddingIndexImport.update({
  id: '/wedding/',
  path: '/wedding/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/wedding/': {
      id: '/wedding/'
      path: '/wedding'
      fullPath: '/wedding'
      preLoaderRoute: typeof WeddingIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/wedding': typeof WeddingIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/wedding': typeof WeddingIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/wedding/': typeof WeddingIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/wedding'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/wedding'
  id: '__root__' | '/' | '/wedding/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  WeddingIndexRoute: typeof WeddingIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  WeddingIndexRoute: WeddingIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/wedding/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/wedding/": {
      "filePath": "wedding/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
