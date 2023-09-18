import { d as defineComponent, r as ref, u as useUserStore, h as onMounted, i as captcha, a as resolveComponent, o as openBlock, g as createElementBlock, f as createBaseVNode, b as createVNode, w as withCtx, j as router, k as homePath, e as createTextVNode } from "./index-32a40243.js";
const _hoisted_1 = { class: "login-container" };
const _hoisted_2 = { class: "login-main" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "login-left" }, [
  /* @__PURE__ */ createBaseVNode("p", null, "欢迎使用xxx")
], -1);
const _hoisted_4 = { class: "login-right" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "login-main-other" }, null, -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const checked = ref(false);
    const captchaRef = ref();
    const { login, getInfo } = useUserStore();
    onMounted(async () => {
      const result = await captcha({});
      console.log(result);
      captchaRef.value = result?.captcha;
    });
    const user = ref();
    const handleLogin = async () => {
      const params = {};
      console.log(params);
      await login({ username: "15712139076", password: "12345678", captcha: "esse", key: "in exercitation" });
      await getInfo();
      router.push(homePath);
    };
    console.log(user);
    return (_ctx, _cache) => {
      const _component_a_checkbox = resolveComponent("a-checkbox");
      const _component_a_button = resolveComponent("a-button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", null, [
              createVNode(_component_a_checkbox, {
                checked: checked.value,
                "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => checked.value = $event),
                style: { "margin-bottom": "40px" }
              }, {
                default: withCtx(() => [
                  createTextVNode("记住密码")
                ]),
                _: 1
              }, 8, ["checked"]),
              createVNode(_component_a_button, {
                style: { "width": "100%" },
                type: "primary",
                onClick: handleLogin
              }, {
                default: withCtx(() => [
                  createTextVNode("登录")
                ]),
                _: 1
              })
            ]),
            _hoisted_5
          ])
        ])
      ]);
    };
  }
});
const index_vue_vue_type_style_index_0_lang = "";
export {
  _sfc_main as default
};
