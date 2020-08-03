import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _85890f54 = () => interopDefault(import('../../admin/pages/app/dashboard/index.vue' /* webpackChunkName: "pages/app/dashboard/index" */))
const _1d452622 = () => interopDefault(import('../../admin/pages/start/start.vue' /* webpackChunkName: "pages/start/start" */))
const _36b9c5f5 = () => interopDefault(import('../../admin/pages/vendors/login/index.vue' /* webpackChunkName: "pages/vendors/login/index" */))
const _d8de84a6 = () => interopDefault(import('../../admin/pages/vendors/register/index.vue' /* webpackChunkName: "pages/vendors/register/index" */))
const _7667fa76 = () => interopDefault(import('../../admin/pages/app/administrator-menu/admins/index.vue' /* webpackChunkName: "pages/app/administrator-menu/admins/index" */))
const _0598c664 = () => interopDefault(import('../../admin/pages/app/administrator-menu/plans/index.vue' /* webpackChunkName: "pages/app/administrator-menu/plans/index" */))
const _50e64561 = () => interopDefault(import('../../admin/pages/app/administrator-menu/roles/index.vue' /* webpackChunkName: "pages/app/administrator-menu/roles/index" */))
const _8cbd09e2 = () => interopDefault(import('../../admin/pages/app/administrator-menu/vendors/index.vue' /* webpackChunkName: "pages/app/administrator-menu/vendors/index" */))
const _75fe6acd = () => interopDefault(import('../../admin/pages/app/catalog/assets/index.vue' /* webpackChunkName: "pages/app/catalog/assets/index" */))
const _c103c83e = () => interopDefault(import('../../admin/pages/app/catalog/collections/index.vue' /* webpackChunkName: "pages/app/catalog/collections/index" */))
const _6e8dada6 = () => interopDefault(import('../../admin/pages/app/catalog/facets/index.vue' /* webpackChunkName: "pages/app/catalog/facets/index" */))
const _695738a4 = () => interopDefault(import('../../admin/pages/app/catalog/products/index.vue' /* webpackChunkName: "pages/app/catalog/products/index" */))
const _030bf33d = () => interopDefault(import('../../admin/pages/app/sales-menu/billing-agreement/index.vue' /* webpackChunkName: "pages/app/sales-menu/billing-agreement/index" */))
const _3bd21a57 = () => interopDefault(import('../../admin/pages/app/sales-menu/invoices/index.vue' /* webpackChunkName: "pages/app/sales-menu/invoices/index" */))
const _c89ab5d4 = () => interopDefault(import('../../admin/pages/app/sales-menu/orders/index.vue' /* webpackChunkName: "pages/app/sales-menu/orders/index" */))
const _2e561a47 = () => interopDefault(import('../../admin/pages/app/seo-menu/url-rewrites/index.vue' /* webpackChunkName: "pages/app/seo-menu/url-rewrites/index" */))
const _2c6f3dd5 = () => interopDefault(import('../../admin/pages/app/stocks/stocks-management/index.vue' /* webpackChunkName: "pages/app/stocks/stocks-management/index" */))
const _2ccd4e79 = () => interopDefault(import('../../admin/pages/app/stores-menu/channels/index.vue' /* webpackChunkName: "pages/app/stores-menu/channels/index" */))
const _ba1b6204 = () => interopDefault(import('../../admin/pages/app/stores-menu/tax-rates/index.vue' /* webpackChunkName: "pages/app/stores-menu/tax-rates/index" */))
const _57a4493c = () => interopDefault(import('../../admin/pages/app/stores-menu/tax-rules/index.vue' /* webpackChunkName: "pages/app/stores-menu/tax-rules/index" */))
const _ab727002 = () => interopDefault(import('../../admin/pages/app/system-menu/country-config/index.vue' /* webpackChunkName: "pages/app/system-menu/country-config/index" */))
const _45d91790 = () => interopDefault(import('../../admin/pages/app/system-menu/system-config/index.vue' /* webpackChunkName: "pages/app/system-menu/system-config/index" */))
const _4d07e0f3 = () => interopDefault(import('../../admin/pages/app/system-menu/zone-config/index.vue' /* webpackChunkName: "pages/app/system-menu/zone-config/index" */))
const _13f70c73 = () => interopDefault(import('../../admin/pages/app/administrator-menu/roles/createrole.vue' /* webpackChunkName: "pages/app/administrator-menu/roles/createrole" */))
const _0718c558 = () => interopDefault(import('../../admin/pages/app/catalog/collections/createnewcollection/index.vue' /* webpackChunkName: "pages/app/catalog/collections/createnewcollection/index" */))
const _763d4612 = () => interopDefault(import('../../admin/pages/app/catalog/products/createproduct/index.vue' /* webpackChunkName: "pages/app/catalog/products/createproduct/index" */))
const _74755ca6 = () => interopDefault(import('../../admin/pages/app/content-menu/design/menubuilder.vue' /* webpackChunkName: "pages/app/content-menu/design/menubuilder" */))
const _80b58454 = () => interopDefault(import('../../admin/pages/app/catalog/products/variants/specs/_id.vue' /* webpackChunkName: "pages/app/catalog/products/variants/specs/_id" */))
const _ad379228 = () => interopDefault(import('../../admin/pages/app/administrator-menu/roles/editrole/_id.vue' /* webpackChunkName: "pages/app/administrator-menu/roles/editrole/_id" */))
const _5530e4bc = () => interopDefault(import('../../admin/pages/app/catalog/collections/createnewcollection/_id.vue' /* webpackChunkName: "pages/app/catalog/collections/createnewcollection/_id" */))
const _18d6e18e = () => interopDefault(import('../../admin/pages/app/catalog/facets/_id.vue' /* webpackChunkName: "pages/app/catalog/facets/_id" */))
const _b3390cd4 = () => interopDefault(import('../../admin/pages/app/catalog/products/_id.vue' /* webpackChunkName: "pages/app/catalog/products/_id" */))
const _5687a0e5 = () => interopDefault(import('../../admin/pages/app/sales-menu/billing-agreement/_id.vue' /* webpackChunkName: "pages/app/sales-menu/billing-agreement/_id" */))
const _4764026f = () => interopDefault(import('../../admin/pages/app/seo-menu/url-rewrites/_id.vue' /* webpackChunkName: "pages/app/seo-menu/url-rewrites/_id" */))
const _1aef841b = () => interopDefault(import('../../admin/pages/app/system-menu/zone-config/_id.vue' /* webpackChunkName: "pages/app/system-menu/zone-config/_id" */))
const _d6882082 = () => interopDefault(import('../../admin/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/app/dashboard",
    component: _85890f54,
    name: "app-dashboard___en"
  }, {
    path: "/start/start",
    component: _1d452622,
    name: "start-start___en"
  }, {
    path: "/vendors/login",
    component: _36b9c5f5,
    name: "vendors-login___en"
  }, {
    path: "/vendors/register",
    component: _d8de84a6,
    name: "vendors-register___en"
  }, {
    path: "/app/administrator-menu/admins",
    component: _7667fa76,
    name: "app-administrator-menu-admins___en"
  }, {
    path: "/app/administrator-menu/plans",
    component: _0598c664,
    name: "app-administrator-menu-plans___en"
  }, {
    path: "/app/administrator-menu/roles",
    component: _50e64561,
    name: "app-administrator-menu-roles___en"
  }, {
    path: "/app/administrator-menu/vendors",
    component: _8cbd09e2,
    name: "app-administrator-menu-vendors___en"
  }, {
    path: "/app/catalog/assets",
    component: _75fe6acd,
    name: "app-catalog-assets___en"
  }, {
    path: "/app/catalog/collections",
    component: _c103c83e,
    name: "app-catalog-collections___en"
  }, {
    path: "/app/catalog/facets",
    component: _6e8dada6,
    name: "app-catalog-facets___en"
  }, {
    path: "/app/catalog/products",
    component: _695738a4,
    name: "app-catalog-products___en"
  }, {
    path: "/app/sales-menu/billing-agreement",
    component: _030bf33d,
    name: "app-sales-menu-billing-agreement___en"
  }, {
    path: "/app/sales-menu/invoices",
    component: _3bd21a57,
    name: "app-sales-menu-invoices___en"
  }, {
    path: "/app/sales-menu/orders",
    component: _c89ab5d4,
    name: "app-sales-menu-orders___en"
  }, {
    path: "/app/seo-menu/url-rewrites",
    component: _2e561a47,
    name: "app-seo-menu-url-rewrites___en"
  }, {
    path: "/app/stocks/stocks-management",
    component: _2c6f3dd5,
    name: "app-stocks-stocks-management___en"
  }, {
    path: "/app/stores-menu/channels",
    component: _2ccd4e79,
    name: "app-stores-menu-channels___en"
  }, {
    path: "/app/stores-menu/tax-rates",
    component: _ba1b6204,
    name: "app-stores-menu-tax-rates___en"
  }, {
    path: "/app/stores-menu/tax-rules",
    component: _57a4493c,
    name: "app-stores-menu-tax-rules___en"
  }, {
    path: "/app/system-menu/country-config",
    component: _ab727002,
    name: "app-system-menu-country-config___en"
  }, {
    path: "/app/system-menu/system-config",
    component: _45d91790,
    name: "app-system-menu-system-config___en"
  }, {
    path: "/app/system-menu/zone-config",
    component: _4d07e0f3,
    name: "app-system-menu-zone-config___en"
  }, {
    path: "/app/administrator-menu/roles/createrole",
    component: _13f70c73,
    name: "app-administrator-menu-roles-createrole___en"
  }, {
    path: "/app/catalog/collections/createnewcollection",
    component: _0718c558,
    name: "app-catalog-collections-createnewcollection___en"
  }, {
    path: "/app/catalog/products/createproduct",
    component: _763d4612,
    name: "app-catalog-products-createproduct___en"
  }, {
    path: "/app/content-menu/design/menubuilder",
    component: _74755ca6,
    name: "app-content-menu-design-menubuilder___en"
  }, {
    path: "/app/catalog/products/variants/specs/:id?",
    component: _80b58454,
    name: "app-catalog-products-variants-specs-id___en"
  }, {
    path: "/app/administrator-menu/roles/editrole/:id",
    component: _ad379228,
    name: "app-administrator-menu-roles-editrole-id___en"
  }, {
    path: "/app/catalog/collections/createnewcollection/:id",
    component: _5530e4bc,
    name: "app-catalog-collections-createnewcollection-id___en"
  }, {
    path: "/app/catalog/facets/:id",
    component: _18d6e18e,
    name: "app-catalog-facets-id___en"
  }, {
    path: "/app/catalog/products/:id",
    component: _b3390cd4,
    name: "app-catalog-products-id___en"
  }, {
    path: "/app/sales-menu/billing-agreement/:id?",
    component: _5687a0e5,
    name: "app-sales-menu-billing-agreement-id___en"
  }, {
    path: "/app/seo-menu/url-rewrites/:id?",
    component: _4764026f,
    name: "app-seo-menu-url-rewrites-id___en"
  }, {
    path: "/app/system-menu/zone-config/:id?",
    component: _1aef841b,
    name: "app-system-menu-zone-config-id___en"
  }, {
    path: "/",
    component: _d6882082,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
