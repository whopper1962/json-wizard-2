<template>
  <div class="user-manual">
    <div class="title-area">
      <img
        :src="`json-wizard-logo.png`"
        class="wizard-logo"
      />
      <h1 class="title"><span class="that-font">Welcome to JSON WIZARD, My friend!</span></h1>
      <div class="main-content">
        <p>JSON Wizard is a tool for people who want to create JSON from XLSX or CSV.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  }
}
</script>

<style scoped>
.title-area {
  background-color: rgb(187, 187, 187);
  padding: 50px;
}
.wizard-logo {
  margin-bottom: 50px;
  height: 450px;
}
.title {
  font-weight: bold;
  font-size: 60px;
}
.main-content {
  margin-top: 50px;
  font-size: 30px;
}
.that-font {
  font-family: "Trattatello";
}
/* .user-manual {
} */
</style>