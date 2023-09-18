import { d as defineComponent, a as resolveComponent, o as openBlock, c as createBlock, w as withCtx, b as createVNode, e as createTextVNode, j as router, k as homePath } from "./index-32a40243.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "404",
  setup(__props) {
    function toHome() {
      router.push({ path: homePath });
    }
    return (_ctx, _cache) => {
      const _component_a_button = resolveComponent("a-button");
      const _component_a_result = resolveComponent("a-result");
      return openBlock(), createBlock(_component_a_result, {
        status: "404",
        title: "404",
        "sub-title": "Sorry, the page you visited does not exist."
      }, {
        extra: withCtx(() => [
          createVNode(_component_a_button, {
            type: "primary",
            onClick: toHome
          }, {
            default: withCtx(() => [
              createTextVNode(" Back Home ")
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
