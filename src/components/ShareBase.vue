<template>
  <div class="share-base-style">
    <ShareTo/>
    <RecoverBase/>
  </div>
</template>

<script>
import ShareTo from './ShareTo.vue';
import RecoverBase from './RecoverBase.vue';
export default {
  components: {
    ShareTo,
    RecoverBase
  },
  data () {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.share-base-style {
  margin-bottom: 10px;
  text-align: left;
}
</style>