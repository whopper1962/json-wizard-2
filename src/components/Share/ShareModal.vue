<template>
  <Modal
    :name="`share-modal`"
    :clickToClose="true"
    :onClickOkButton="execShare"
  >
    <template slot="modal-header">
      <div class="modal-title">
        <h3>Share your current data with teammates</h3>
      </div>
    </template>
    <template slot="modal-body"></template>
  </Modal>
</template>

<script>
import Modal from '../ModalTemplate.vue';
export default {
  components: { Modal },
  data () {
    return {};
  },
  methods: {
    execShare () {
      console.error('Share!');
    }
  }
}
</script>

<style scoped>
.modal-title {
  margin-top: 0.5rem;
  text-align: center;
  size: 20px;
}
</style>