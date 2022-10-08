export default {
  props: {
    label: {
      type: String,
      required: true,
      default: 'label',
    },
  },
  template: '<a>{{ label }}</a>',
};
