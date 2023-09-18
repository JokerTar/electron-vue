import { d as defineComponent, r as ref, a as resolveComponent, o as openBlock, c as createBlock, w as withCtx, b as createVNode, e as createTextVNode, f as createBaseVNode } from "./index-32a40243.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      selectedKeys: ref(["2"])
    };
  }
});
const index_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "logo" }, null, -1);
const _hoisted_2 = { style: { background: "#fff", padding: "24px", minHeight: "280px" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_menu_item = resolveComponent("a-menu-item");
  const _component_a_menu = resolveComponent("a-menu");
  const _component_a_layout_header = resolveComponent("a-layout-header");
  const _component_a_breadcrumb_item = resolveComponent("a-breadcrumb-item");
  const _component_a_breadcrumb = resolveComponent("a-breadcrumb");
  const _component_router_view = resolveComponent("router-view");
  const _component_a_layout_content = resolveComponent("a-layout-content");
  const _component_a_layout_footer = resolveComponent("a-layout-footer");
  const _component_a_layout = resolveComponent("a-layout");
  return openBlock(), createBlock(_component_a_layout, { class: "layout" }, {
    default: withCtx(() => [
      createVNode(_component_a_layout_header, null, {
        default: withCtx(() => [
          _hoisted_1,
          createVNode(_component_a_menu, {
            selectedKeys: _ctx.selectedKeys,
            "onUpdate:selectedKeys": _cache[0] || (_cache[0] = ($event) => _ctx.selectedKeys = $event),
            theme: "dark",
            mode: "horizontal",
            style: { lineHeight: "64px" }
          }, {
            default: withCtx(() => [
              createVNode(_component_a_menu_item, { key: "1" }, {
                default: withCtx(() => [
                  createTextVNode("nav 1")
                ]),
                _: 1
              }),
              createVNode(_component_a_menu_item, { key: "2" }, {
                default: withCtx(() => [
                  createTextVNode("nav 2")
                ]),
                _: 1
              }),
              createVNode(_component_a_menu_item, { key: "3" }, {
                default: withCtx(() => [
                  createTextVNode("nav 3")
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["selectedKeys"])
        ]),
        _: 1
      }),
      createVNode(_component_a_layout_content, { style: { "padding": "0 50px" } }, {
        default: withCtx(() => [
          createVNode(_component_a_breadcrumb, { style: { "margin": "16px 0" } }, {
            default: withCtx(() => [
              createVNode(_component_a_breadcrumb_item, null, {
                default: withCtx(() => [
                  createTextVNode("Home")
                ]),
                _: 1
              }),
              createVNode(_component_a_breadcrumb_item, null, {
                default: withCtx(() => [
                  createTextVNode("List")
                ]),
                _: 1
              }),
              createVNode(_component_a_breadcrumb_item, null, {
                default: withCtx(() => [
                  createTextVNode("App")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_2, [
            createVNode(_component_router_view)
          ])
        ]),
        _: 1
      }),
      createVNode(_component_a_layout_footer, { style: { "text-align": "center" } }, {
        default: withCtx(() => [
          createTextVNode(" Ant Design ©2018 Created by Ant UED ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  index as default
};
