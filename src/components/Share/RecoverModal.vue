<template>
  <Modal
    :name="`recover-modal`"
    :clickToClose="true"
    :onClickOkButton="execRecover"
  >
    <template slot="modal-header">
      <div class="modal-title">
        <h3>Recover from data!</h3>
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
    execRecover () {
      console.error('Recover!');
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