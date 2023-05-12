<template>
  <div class="share-base-style">
    <RecoverFromFile @openModal="openRecoverModal"/>
    <ShareWithTeammates @openModal="openShareModal"/>
    <RecoverModal/>
    <ShareModal/>
  </div>
</template>

<script>
import RecoverFromFile from './RecoverFromFile.vue';
import RecoverModal from './RecoverModal.vue';
import ShareModal from './ShareModal.vue';
import ShareWithTeammates from './ShareWithTeammates.vue';
export default {
  components: {
    ShareWithTeammates,
    RecoverFromFile,
    RecoverModal,
    ShareModal
},
  data () {
    return {};
  },
  computed: {
    shareModal: () => `share-modal`,
    recoverModal: () => `recover-modal`,
  },
  methods: {
    openShareModal() {
      this.$modal.show(this.shareModal);
    },
    openRecoverModal() {
      this.$modal.show(this.recoverModal);
    },
  },
};
</script>

<style scoped>
.share-base-style {
  margin-bottom: 10px;
  text-align: left;
}
</style>