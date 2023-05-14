<template>
  <div class="user-manual">
    <div class="title-area">
      <img :src="`json-wizard-logo.png`" class="wizard-logo" />
      <h1 class="title">
        <span class="that-font">{{ $t("manual.title") }}</span>
      </h1>
      <div class="main-content">
        <p>{{ $t("manual.explanation") }}</p>
        <div class="converter-link">
          <button class="btn first" @click="jumpToConverter()">
            {{ $t("manual.toConverter")
            }}<font-awesome-icon
              :icon="['fas', 'wand-sparkles']"
              class="convert-icon"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="how-to-use">
      <h1 class="how-to-use-title">
        {{ $t("manual.convertXlsxToJson.title") }}
      </h1>
      <div class="row">
        <div class="col-md-6 col-sm-12 left-content how-to-use-content">
          fdjsaklfjdskalfjdksalfjdkdljsakfldjsak<br />flfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsak<br />sakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkd<br />ljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalf<br />jdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakfl
        </div>
        <div class="col-md-6 col-sm-12 left-content">
          <img src="manuals/sample.jpg" class="manual-image" />
        </div>
      </div>
    </div>
    <div class="how-to-use">
      <h1 class="how-to-use-title">{{ $t("manual.convertAsArray.title") }}</h1>
      <div class="row">
        <div class="col-md-6 col-sm-12 left-content">
          <img src="manuals/sample.jpg" class="manual-image" />
        </div>
        <div class="col-md-6 col-sm-12 left-content how-to-use-content">
          fdjsaklfjdskalfjdksalfjdkdljsakfldjsak<br />flfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsak<br />sakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkd<br />ljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalf<br />jdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakfl
        </div>
      </div>
    </div>
    <div class="how-to-use">
      <h1 class="how-to-use-title">{{ $t("manual.multipleFiles.title") }}</h1>
      <div class="row">
        <div class="col-md-6 col-sm-12 left-content how-to-use-content">
          fdjsaklfjdskalfjdksalfjdkdljsakfldjsak<br />flfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsak<br />sakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdj<br />saklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalf<br />jdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakfl
        </div>
        <div class="col-md-6 col-sm-12 left-content">
          <img src="manuals/sample.jpg" class="manual-image" />
        </div>
      </div>
    </div>
    <div class="how-to-use">
      <h1 class="how-to-use-title">
        {{ $t("manual.refertToExternalTab.title") }}
      </h1>
      <div class="row">
        <div class="col-md-6 col-sm-12 left-content">
          <img src="manuals/sample.jpg" class="manual-image" />
        </div>
        <div class="col-md-6 col-sm-12 left-content how-to-use-content">
          fdjsaklfjdskalfjdksalfjdkdljsakfldjsak<br />flfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsak<br />sakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkd<br />ljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalf<br />jdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakfl
        </div>
      </div>
    </div>
    <div class="how-to-use">
      <h1 class="how-to-use-title">
        {{ $t("manual.convertJsonToXlsx.title") }}
      </h1>
      <div class="row">
        <div class="col-md-6 col-sm-12 left-content how-to-use-content">
          fdjsaklfjdskalfjdksalfjdkdljsakfldjsak<br />flfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdlj<br />sakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsak<br />sakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalf<br />jdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakfl
        </div>
        <div class="col-md-6 col-sm-12 left-content">
          <img src="manuals/sample.jpg" class="manual-image" />
        </div>
      </div>
    </div>
    <div class="how-to-use">
      <h1 class="how-to-use-title">
        {{ $t("manual.saveStateAndShare.title") }}
      </h1>
      <div class="row">
        <div class="col-md-6 col-sm-12 left-content">
          <img src="manuals/sample.jpg" class="manual-image" />
        </div>
        <div class="col-md-6 col-sm-12 left-content how-to-use-content">
          fdjsaklfjdskalfjdksalfjdkdljsakfldjsak<br />flfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsak<br />sakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdsk<br />lfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalf<br />jdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakfl
        </div>
      </div>
    </div>
    <div class="how-to-use bottom">
      <h1 class="how-to-use-title">{{ $t("manual.importState.title") }}</h1>
      <div class="row">
        <div class="col-md-6 col-sm-12 left-content how-to-use-content">
          fdjsaklfjdskalfjdksalfjdkdljsakfldjsak<br />flfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdlj<br />sakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsak<br />sakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakflfdjsaklfjdskalf<br />jdksalfjdkdljsakfldjsakflfdjsaklfjdskalfjdksalfjdkdljsakfldjsakfl
        </div>
        <div class="col-md-6 col-sm-12 left-content">
          <img src="manuals/sample.jpg" class="manual-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jumpToConverter() {
      this.$router.push({
        name: "CONVERTER_VIEW",
      });
    },
  },
};
</script>

<style scoped>
.title-area {
  padding: 50px;
}
.how-to-use {
  font-size: 20px;
  width: 100%;
  padding: 0px 80px 40px 80px;
  background-color: rgb(187, 187, 187);
  float: left;
}
.bottom {
  padding-bottom: 200px;
}
.how-to-use-content {
  width: 100%;
  text-align: left !important;
}
.how-to-use-title {
  font-size: 35px;
  font-weight: bold;
  text-align: left;
  border-bottom: black solid;
  margin-bottom: 20px;
}
.wizard-logo {
  margin-bottom: 30px;
  height: 380px;
}
.title {
  font-weight: bold;
  font-size: 60px;
}
.main-content {
  margin-top: 30px;
  font-size: 30px;
}
.that-font {
  font-family: "Trattatello";
}
.left-content {
  word-wrap: break-word;
}
.user-manual {
  background-color: rgb(187, 187, 187);
  min-height: fit-content;
}
.manual-image {
  width: 100%;
}
.converter-link {
  margin-top: 10px;
  text-align: center;
}
.convert-button {
  font-size: 20px !important;
  background-color: rgb(129, 129, 129);
  font-family: "Trattatello";
  font-weight: bold;
  height: 50px;
  width: 217px;
}
/* BUTTON */
.btn {
  height: 50px;
  padding: 0px 30px;
  min-width: fit-content;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 2px solid #393939;
  border-radius: 0.6em;
  color: #393939;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  /* display: flex; */
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  font-weight: 400;
  font-size: 25px !important;
  line-height: 1;
  margin: 20px;
  /* padding: 1.2em 2.8em; */
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: "Trattatello";
  font-weight: 700;
}
.btn:hover,
.btn:focus {
  color: #fff;
  outline: 0;
}

.first {
  -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
.first:hover {
  box-shadow: 0 0 40px 40px #393939 inset;
}
.convert-icon {
  margin-left: 7px;
}
.manual-pre {
  /* text-align: left !important; */
  background-color: #393939;
  padding: 20px;
  border-radius: 5px;
  max-height: fit-content;
  color: white;
}
</style>
