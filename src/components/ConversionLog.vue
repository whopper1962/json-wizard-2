<template>
  <div class="card conversion-log-wrapper">
    <div class="card-header title">
      {{ $t("app.log") }}
    </div>
    <div class="card-body log-area">
      <span>> Change column order. [2023/08/26 17:30:00]</span><br/>
      <span class="succeed-log">> Converted sucessfully! [2023/08/26 17:30:05]</span><br/>
      <span class="error-log">> Error occured! [2023/08/26 17:30:32]</span><br/>
      <span class="succeed-log">> Converted sucessfully! [2023/08/26 17:30:55]</span><br/>
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
.title {
  font-weight: bold;
  font-size: 12px;
}
.conversion-log-wrapper {
  height: 100%;
  margin-left: 5px;
}
.log-area {
  background-color: rgb(67, 65, 65);
  border-radius: 0px 0px 3px 3px;
  color: white;
  font-family: "Menlo";
  font-size: 10px;
  text-align: left;
  font-weight: bold;
}
.succeed-log {
  color: rgb(121, 225, 3);
}
.error-log {
  color: rgb(250, 66, 66);
}
</style>