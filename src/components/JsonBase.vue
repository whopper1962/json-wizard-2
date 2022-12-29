<template>
  <div class="card">
    <div class="card-header card-header-title">
      JSON
    </div>
    <div class="card-body">
      <JsonEditor
        v-model="code"
      />
    </div>
  </div>
</template>

<script>
import JsonEditor from '@/components/CodeEditor.vue';
export default {
  components: {
    JsonEditor
  },
  data () {
    return {
      code: `console.log('Hello World!');`
    };
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
.card-header-title {
  font-family: 'Trattatello';
  font-size: 18px;
  font-weight: bold;
}
</style>