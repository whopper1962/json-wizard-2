<template>
  <Modal
    :name="`share-modal`"
    :clickToClose="true"
    :onClickOkButton="execSave"
  >
    <template slot="modal-header">
      <div class="modal-title">
        <h3>Share your current data with teammates</h3>
      </div>
    </template>
    <template slot="modal-body">
      <input type="text" placeholder="Filename" class="form form-control" v-model="fileName" />
    </template>
  </Modal>
</template>

<script>
import Modal from '../ModalTemplate.vue';
export default {
  components: { Modal },
  data () {
    return {
      fileName: ''
    };
  },
  methods: {
    execSave () {
      console.error('Share!');
      const stateString = JSON.stringify(this.$store.state);
      let blob = new Blob([stateString], { type: 'text/plain' });
      let blobURL = window.URL.createObjectURL(blob);
      let obj = document.createElement('a');
      obj.href = blobURL;
      obj.download = this.fileName ? `${this.fileName}.txt` : `json-wizard.txt`;
      document.body.appendChild(obj);
      obj.click();
      obj.parentNode.removeChild(obj);
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