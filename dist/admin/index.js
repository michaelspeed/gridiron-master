import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../../admin/layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_workbox_2c4af974 from 'nuxt_plugin_workbox_2c4af974' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_plugin_76c4e4da from 'nuxt_plugin_plugin_76c4e4da' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_pluginrouting_8d31b848 from 'nuxt_plugin_pluginrouting_8d31b848' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_1b0bb513 from 'nuxt_plugin_pluginmain_1b0bb513' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_apollomodule_19d01276 from 'nuxt_plugin_apollomodule_19d01276' // Source: ./apollo-module.js (mode: 'all')
import nuxt_plugin_axios_36a8deac from 'nuxt_plugin_axios_36a8deac' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_vueperfectscrollbar_4f612464 from 'nuxt_plugin_vueperfectscrollbar_4f612464' // Source: ../../admin/plugins/vue-perfect-scrollbar.ts (mode: 'all')
import nuxt_plugin_vuedesignplugin_3b16a7a8 from 'nuxt_plugin_vuedesignplugin_3b16a7a8' // Source: ../../admin/plugins/vue-design-plugin.ts (mode: 'all')
import nuxt_plugin_antdvueplugin_679d0f19 from 'nuxt_plugin_antdvueplugin_679d0f19' // Source: ../../admin/plugins/antd-vue-plugin.ts (mode: 'all')
import nuxt_plugin_tinymcevue_7ac04c4a from 'nuxt_plugin_tinymcevue_7ac04c4a' // Source: ../../admin/plugins/tinymce-vue.ts (mode: 'client')
import nuxt_plugin_aggridclient_158a82aa from 'nuxt_plugin_aggridclient_158a82aa' // Source: ../../admin/plugins/ag-grid.client.ts (mode: 'client')
import nuxt_plugin_taginputplugin_00987d24 from 'nuxt_plugin_taginputplugin_00987d24' // Source: ../../admin/plugins/tag-input-plugin.ts (mode: 'client')
import nuxt_plugin_vuenotify_ffc0b7f2 from 'nuxt_plugin_vuenotify_ffc0b7f2' // Source: ../../admin/plugins/vue-notify.ts (mode: 'client')
import nuxt_plugin_primevue_67a111f0 from 'nuxt_plugin_primevue_67a111f0' // Source: ../../admin/plugins/primevue.ts (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"@gridiron\u002Fmaster","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"[Nest](https:\u002F\u002Fgithub.com\u002Fnestjs\u002Fnest) framework TypeScript starter repository."},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"@gridiron\u002Fmaster"},{"hid":"author","name":"author","content":"Michael Speed"},{"hid":"theme-color","name":"theme-color","content":"#fff"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"@gridiron\u002Fmaster"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"@gridiron\u002Fmaster"},{"hid":"og:description","name":"og:description","property":"og:description","content":"[Nest](https:\u002F\u002Fgithub.com\u002Fnestjs\u002Fnest) framework TypeScript starter repository."}],"script":[{"src":"\u002Fvendors\u002Fjquery\u002Fdist\u002Fjquery.min.js"},{"src":"\u002Fvendors\u002Fpopper.js\u002Fdist\u002Fumd\u002Fpopper.js"},{"src":"\u002Fvendors\u002Fbootstrap\u002Fdist\u002Fjs\u002Fbootstrap.js"},{"src":"\u002Fvendors\u002Fjquery-mousewheel\u002Fjquery.mousewheel.min.js"},{"src":"\u002Fvendors\u002Fperfect-scrollbar\u002Fjs\u002Fperfect-scrollbar.jquery.js"},{"src":"\u002Fvendors\u002Fchartist\u002Fdist\u002Fchartist.min.js"},{"src":"\u002Fvendors\u002Fchart.js\u002Fdist\u002FChart.min.js"},{"src":"\u002Fvendors\u002Fjqvmap\u002Fdist\u002Fjquery.vmap.min.js"},{"src":"\u002Fvendors\u002Fjqvmap\u002Fdist\u002Fmaps\u002Fjquery.vmap.usa.js"},{"src":"\u002Fvendors\u002Fchartist-plugin-tooltip\u002Fdist\u002Fchartist-plugin-tooltip.min.js"},{"src":"\u002Fvendors\u002Fd3\u002Fd3.min.js"},{"src":"\u002Fvendors\u002Fd3-dsv\u002Fdist\u002Fd3-dsv.js"},{"src":"\u002Fvendors\u002Fd3-time-format\u002Fdist\u002Fd3-time-format.js"},{"src":"\u002Fvendors\u002Fc3\u002Fc3.min.js"},{"src":"\u002Fvendors\u002Fpeity\u002Fjquery.peity.min.js"},{"src":"\u002Fvendors\u002Feditable-table\u002Fmindmup-editabletable.js"},{"src":"\u002Fvendors\u002Fmoment\u002Fmin\u002Fmoment.min.js"},{"src":"\u002Fvendors\u002Ftempus-dominus-bs4\u002Fbuild\u002Fjs\u002Ftempusdominus-bootstrap-4.min.js"},{"src":"\u002Fvendors\u002Ffullcalendar\u002Fdist\u002Ffullcalendar.min.js"},{"src":"\u002Fvendors\u002Fowl.carousel\u002Fdist\u002Fowl.carousel.min.js"},{"src":"\u002Fvendors\u002Fionrangeslider\u002Fjs\u002Fion.rangeSlider.min.js"},{"src":"\u002Fvendors\u002Fremarkable-bootstrap-notify\u002Fdist\u002Fbootstrap-notify.min.js"},{"src":"\u002Fvendors\u002Fbootstrap-sweetalert\u002Fdist\u002Fsweetalert.min.js"},{"src":"\u002Fvendors\u002Fnprogress\u002Fnprogress.js"},{"src":"\u002Fvendors\u002Fsummernote\u002Fdist\u002Fsummernote.min.js"},{"src":"\u002Fvendors\u002Fnestable\u002Fjquery.nestable.js"},{"src":"\u002Fvendors\u002Fjquery-typeahead\u002Fdist\u002Fjquery.typeahead.min.js"},{"src":"\u002Fvendors\u002Fautosize\u002Fdist\u002Fautosize.min.js"},{"src":"\u002Fvendors\u002Fbootstrap-show-password\u002Fdist\u002Fbootstrap-show-password.min.js"},{"src":"\u002Fvendors\u002Fdropify\u002Fdist\u002Fjs\u002Fdropify.min.js"},{"src":"\u002Fvendors\u002Fhtml5-form-validation\u002Fdist\u002Fjquery.validation.min.js"},{"src":"\u002Fvendors\u002Fjquery-steps\u002Fbuild\u002Fjquery.steps.min.js"},{"src":"\u002Fvendors\u002Fjquery-mask-plugin\u002Fdist\u002Fjquery.mask.min.js"},{"src":"\u002Fvendors\u002Fselect2\u002Fdist\u002Fjs\u002Fselect2.full.min.js"},{"src":"\u002Fvendors\u002Fbootstrap-select\u002Fdist\u002Fjs\u002Fbootstrap-select.min.js"},{"src":"\u002Fvendors\u002Fd3-dsv\u002Fdist\u002Fd3-dsv.js"},{"src":"\u002Fvendors\u002Fd3-time-format\u002Fdist\u002Fd3-time-format.js"},{"src":"\u002Fvendors\u002Ftechan\u002Fdist\u002Ftechan.min.js"},{"src":"\u002Fvendors\u002FStickyfill\u002Fdist\u002Fstickyfill.min.js"},{"src":"https:\u002F\u002Fcdn.datatables.net\u002Fv\u002Fbs4\u002Fdt-1.10.18\u002Ffc-3.2.5\u002Fr-2.2.2\u002Fdatatables.min.js"},{"src":"\u002Fcomponents\u002Fcore\u002Findex.js"},{"src":"\u002Fcomponents\u002Fmenu-left\u002Findex.js"},{"src":"\u002Fcomponents\u002Fmenu-top\u002Findex.js"},{"src":"\u002Fcomponents\u002Fsidebar\u002Findex.js"},{"src":"\u002Fcomponents\u002Ftopbar\u002Findex.js"},{"src":"\u002Fcomponents\u002Ftopbar\u002Findex.js"},{"src":"\u002Fcomponents\u002Fchat\u002Findex.js"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Source+Sans+Pro:400,400i,700,700i,900"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Montserrat:400,500,700&display=swap"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fbootstrap\u002Fdist\u002Fcss\u002Fbootstrap.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Ffont-feathericons\u002Fdist\u002Ffeather.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Ffont-awesome\u002Fcss\u002Ffont-awesome.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Ffont-linearicons\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Ffont-icomoon\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fperfect-scrollbar\u002Fcss\u002Fperfect-scrollbar.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fchart.js\u002Fdist\u002FChart.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fjqvmap\u002Fdist\u002Fjqvmap.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fc3\u002Fc3.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Ftempus-dominus-bs4\u002Fbuild\u002Fcss\u002Ftempusdominus-bootstrap-4.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Ffullcalendar\u002Fdist\u002Ffullcalendar.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fowl.carousel\u002Fdist\u002Fassets\u002Fowl.carousel.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fionrangeslider\u002Fcss\u002Fion.rangeSlider.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fbootstrap-sweetalert\u002Fdist\u002Fsweetalert.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fnprogress\u002Fnprogress.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fsummernote\u002Fdist\u002Fsummernote.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fdropify\u002Fdist\u002Fcss\u002Fdropify.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fjquery-steps\u002Fdemo\u002Fcss\u002Fjquery.steps.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fselect2\u002Fdist\u002Fcss\u002Fselect2.min.css"},{"rel":"stylesheet","href":"\u002Fvendors\u002Fbootstrap-select\u002Fdist\u002Fcss\u002Fbootstrap-select.min.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fvendors\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fcore\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fwidgets\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fsystem\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fmenu-left\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fmenu-top\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Ffooter\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Ffooter-dark\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Ftopbar\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Ftopbar-dark\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fsubbar\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fsidebar\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fchat\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fapps\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fextra-apps\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fecommerce\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcomponents\u002Fdashboards\u002Fcrypto-terminal\u002Fstyle.css"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.datatables.net\u002Fv\u002Fbs4\u002Fdt-1.10.18\u002Ffc-3.2.5\u002Fr-2.2.2\u002Fdatatables.min.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.41fecc4c.json"}],"style":[],"htmlAttrs":{"lang":"en"}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (process.client && typeof nuxt_plugin_workbox_2c4af974 === 'function') {
    await nuxt_plugin_workbox_2c4af974(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_76c4e4da === 'function') {
    await nuxt_plugin_plugin_76c4e4da(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_8d31b848 === 'function') {
    await nuxt_plugin_pluginrouting_8d31b848(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_1b0bb513 === 'function') {
    await nuxt_plugin_pluginmain_1b0bb513(app.context, inject)
  }

  if (typeof nuxt_plugin_apollomodule_19d01276 === 'function') {
    await nuxt_plugin_apollomodule_19d01276(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_36a8deac === 'function') {
    await nuxt_plugin_axios_36a8deac(app.context, inject)
  }

  if (typeof nuxt_plugin_vueperfectscrollbar_4f612464 === 'function') {
    await nuxt_plugin_vueperfectscrollbar_4f612464(app.context, inject)
  }

  if (typeof nuxt_plugin_vuedesignplugin_3b16a7a8 === 'function') {
    await nuxt_plugin_vuedesignplugin_3b16a7a8(app.context, inject)
  }

  if (typeof nuxt_plugin_antdvueplugin_679d0f19 === 'function') {
    await nuxt_plugin_antdvueplugin_679d0f19(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_tinymcevue_7ac04c4a === 'function') {
    await nuxt_plugin_tinymcevue_7ac04c4a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_aggridclient_158a82aa === 'function') {
    await nuxt_plugin_aggridclient_158a82aa(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_taginputplugin_00987d24 === 'function') {
    await nuxt_plugin_taginputplugin_00987d24(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuenotify_ffc0b7f2 === 'function') {
    await nuxt_plugin_vuenotify_ffc0b7f2(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_primevue_67a111f0 === 'function') {
    await nuxt_plugin_primevue_67a111f0(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
