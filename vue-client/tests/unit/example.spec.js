// This is a unit:test example file

import Vue from 'vue'
import { upper } from '@/filters'
import { shallowMount, mount } from '@vue/test-utils'
import Component from '@/components/Component.vue'

Vue.filter('upper', upper)

// Should render prop
describe('Component.vue', () => {
  it('renders props.value when passed', () => {
    const value = 'value'
    const wrapper = shallowMount(Component, {
      propsData: { value }
    })
    expect(wrapper.text()).toMatch(city)
  })
})

// Setting checkbox 'checked' value to passed prop value
describe('Component.vue', () => {
  it('sets "checked" value of checkbox to props.value when passed', () => {
    const value = true
    const wrapper = shallowMount(Component, {
      propsData: { value }
    })

    const selector = '#checkbox-id'
    const checkbox = wrapper.find(selector)
    expect(checkbox.element.checked).toBeTruthy()
  })
})

// Adding a class based on a passed prop
describe('Component.vue', () => {
  it('adds ".class" to checkbox UI if props.value is truthy', () => {
    const value = true
    const wrapper = shallowMount(Component, {
      propsData: { value }
    })
    const selector = '#checkbox-id'
    const div = wrapper.find(selector)
    expect(div.classes()).toContain('class')
  })
})

// Input text to contain value passed in props
describe('Component.vue', () => {
  it('sets props.value in text input when passed', () => {
    const value = 'some text'
    const wrapper = shallowMount(Component, {
      propsData: { value }
    })
    const selector = 'input[type="text"]'
    const input = wrapper.find(selector)
    expect(input.element.value).toMatch(value)
  })
})

// Changing text in input should do an $emit
describe('Component.vue', () => {
  it('emits text input value when changed', async () => {
    const value = 'some text'
    const wrapper = mount(Component, {
      propsData: { value }
    })
    const selector = 'input[type="text"]'
    const input = wrapper.find(selector)
    const value0 = value + '-0'
    input.setValue(value0)
    await wrapper.vm.$nextTick()

    const value1 = value + '-1'
    input.setValue(value1)
    await wrapper.vm.$nextTick()

    const value2 = value + '-2'
    input.setValue(value2)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().input[0]).toEqual([value0])
    expect(wrapper.emitted().input[1]).toEqual([value1])
    expect(wrapper.emitted().input[2]).toEqual([value2])
    expect(wrapper.emitted().input.length).toBe(3)
  })
})
