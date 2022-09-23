import { mount } from "@vue/test-utils";
import Button from "../../src/components/Button/Button.vue";
import { expect, describe, it } from "vitest";

describe("test button component", () => {
  it("should renders is page content is correct", () => {
    const title = "Happy People";
    const testMessage = "Happy People";
    const wrapper = mount(Button, {
      props: { title },
    });

    expect(wrapper.text()).toBe(testMessage);
  });
});
