<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link
      class="navbar-brand app-title"
      :to="{
        name: 'HOME_VIEW'
      }"
    >
      <img
        src="wizard.png"
        alt="" width="40"
        class="img-fluid title-logo"
      >
      JSON WIZARD
    </router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ 'active': isActiveRoute('HOME_VIEW') }">
          <router-link
            class="nav-link"
            :to="{
              name: 'HOME_VIEW'
            }"
          >
            Converter
          </router-link>
        </li>
        <li class="nav-item" :class="{ 'active': isActiveRoute('USER_MANUAL') }">
          <router-link
            class="nav-link"
            :to="{
              name: 'USER_MANUAL'
            }"
          >
            User Manual
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {};
  },
  computed: {
    isActiveRoute () {
      return function (routeName) {
        return this.$route.name === routeName;
      };
    }
  }
}
</script>

<style scoped>
.app-title {
  font-family: 'Trattatello';
  font-size: 30px;
  margin-left: 15px;
  font-weight: bold;
}
.title-logo {
  margin-right: 20px;
}
</style>