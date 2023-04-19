<template>
  <modal
    :name="name" :clickToClose="clickToClose"
    :scrollable="scrollable"
    @before-open="disableScroll()"
    @before-close="enalbeScroll()"
  >
    <div class="card modal-card">
      <div class="card-header">
        <slot name="modal-header"></slot>
      </div>
      <div class="card-body">
        <slot name="modal-body"></slot>
      </div>
      <div class="card-footer text-muted" v-if="showFooter">
        <button
          class="btn btn-secondary cancel-button"
          @click="cancelFunction()"
        >
          Cancel
        </button>
        <button
          class="btn btn-primary ok-button"
          @click="okFunction()"
          :disabled="disableOkButton"
        >
          Confirm
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'vue-js-modal'
    },
    clickToClose: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    onClickOkButton: {
      type: Function
    },
    onClickCancelButton: {
      type: Function
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    disableOkButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    disableScroll () {
      const body = document.querySelector('body');
      body.style.overflow = 'hidden';
    },
    enalbeScroll () {
      const body = document.querySelector('body');
      body.style.overflow = 'scroll';
    },
    okFunction () {
      if (this.onClickOkButton) {
        this.onClickOkButton();
      }
      this.$modal.hide(this.name);
    },
    cancelFunction () {
      if (this.onClickCancelButton) {
        this.onClickCancelButton();
      }
      this.$modal.hide(this.name);
    }
  }
}
</script>

<style scoped>
.modal-card {
  width: 100%;
  height: 100%;
}
.cancel-button {
  margin-right: 10px;
  width: 30%;
}
.ok-button {
  width: 30%;
}
</style>