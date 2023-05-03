<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link
      class="navbar-brand app-title"
      :to="{
        name: 'HOME_VIEW',
      }"
    >
      <img src="wizard.png" alt="" width="30" class="img-fluid title-logo" />
      JSON WIZARD
    </router-link>
    <div class="credit-area">
      <p class="credit">
        created by
        <a
          href="https://github.com/whopper1962"
          target="_blank"
          rel="noopener noreferrer"
        >
          @whopper1962
        </a>
      </p>
    </div>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: isActiveRoute('HOME_VIEW') }">
          <router-link
            class="nav-link"
            :to="{
              name: 'HOME_VIEW',
            }"
          >
            Converter
          </router-link>
        </li>
        <li class="nav-item" :class="{ active: isActiveRoute('USER_MANUAL') }">
          <router-link
            class="nav-link"
            :to="{
              name: 'USER_MANUAL',
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
import axios from 'axios';
export default {
  data () {
    return {
      reqError: false,
      repoStars: null,
      repoUrl: ''
    };
  },
  created () {
    this.getRepositoryDetials();
  },
  computed: {
    isActiveRoute () {
      return function (routeName) {
        return this.$route.name === routeName;
      };
    }
  },
  methods: {
    async getRepositoryDetials () {
      try {
        const { data } = await axios.get('https://api.github.com/users/whopper1962/repos');
        // TODO: get app name in other way
        const jsonWizard = data.find((repo) => repo.name === 'json-wizard-2');
        console.error(jsonWizard);
        this.repoStars = jsonWizard.stargazers_count;
        this.repoUrl = jsonWizard.html_url;
      } catch (e) {
        this.reqError = true;
        return;
      }
    }
  },
}
</script>

<style scoped>
.app-title {
  font-family: "Trattatello";
  font-size: 25px;
  margin-left: 20px;
  font-weight: bold;
}
.title-logo {
  margin-right: 20px;
}
.credit-area {
  display: table;
  text-align: center;
  margin: 0px 20px 0px 5px;
}
.credit {
  display: table-cell;
  vertical-align: middle;
  font-family: "Trattatello";
  color: white;
  font-size: 16px;
}
</style>
