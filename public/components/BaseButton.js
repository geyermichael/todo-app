export default {
  props: {
    label: {
      type: String,
      required: true,
      default: 'label',
    },
  },
  template: '<button class="button">{{ label }}</button>',
};
