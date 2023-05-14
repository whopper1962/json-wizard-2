<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark navbar-main"
    @mouseover="setWizardHatColor()"
  >
    <div
      class="navbar-brand app-title"
      @click="jumpToHome()"
      :to="{
        name: 'HOME_VIEW',
      }"
    >
      <img
        :src="`json-wizard-${wizardHatColor}.png`"
        alt=""
        class="img-fluid title-logo"
      />
      JSON WIZARD
    </div>
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
              name: 'CONVERTER_VIEW',
            }"
          >
            Converter
          </router-link>
        </li>
      </ul>
    </div>

    <!-- <div
      class="github-info-wrapper"
      v-if="isGitHubInfoFetched"
      @click="jumpToRepo()"
    >
      <font-awesome-icon class="github-icon" icon="fa-brands fa-github" />
      <p class="github-info-content">GitHub stars: {{ repoStars }}</p>
    </div> -->

    <div class="lang-select-area">
      <font-awesome-icon :icon="['fas', 'globe']" class="lang-icon" />
      <select
        class="form-control lang-select"
        v-model="selectedLang"
        @change="changeLang()"
      >
        <option value="en">{{ $t("lang.en") }}</option>
        <option value="ja">{{ $t("lang.ja") }}</option>
      </select>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isGitHubInfoFetched: false,
      repoStars: null,
      repoUrl: "",
      wizardHatColor: "logo",
      selectedLang: 'ja'
    };
  },
  created() {
    this.setWizardHatColor();
    this.selectedLang = localStorage.getItem('language') || 'en';
    // this.getRepositoryDetials();
  },
  computed: {
    isActiveRoute() {
      return function (routeName) {
        return this.$route.name === routeName;
      };
    },
  },
  methods: {
    changeLang () {
      localStorage.setItem('language', this.selectedLang);
      this.$i18n.locale = localStorage.getItem('language');
    },
    setWizardHatColor() {
      const colors = ["red", "green", "orange", "blue"];
      const randomIndex = Math.floor(Math.random() * (3 - 0 + 1) + 0);
      this.wizardHatColor = colors[randomIndex];
    },
    jumpToRepo() {
      window.open("https://github.com/whopper1962/json-wizard-2", "_blank");
    },
    jumpToHome() {
      this.setWizardHatColor();
      this.$router
        .push({
          name: "HOME_VIEW",
        })
        .catch(() => {});
    },
    async getRepositoryDetials() {
      try {
        const { data } = await axios.get(
          "https://api.github.com/users/whopper1962/repos"
        );
        // TODO: get app name in other way
        const jsonWizard = data.find((repo) => repo.name === "json-wizard-2");
        this.repoStars = jsonWizard.stargazers_count;
        this.repoUrl = jsonWizard.html_url;
        this.isGitHubInfoFetched = true;
      } catch (e) {
        return;
      }
    },
  },
};
</script>

<style scoped>
.navbar-main {
  font-size: 13px;
}
.app-title {
  font-family: "Trattatello";
  font-size: 35px;
  margin-left: 20px;
  font-weight: bold;
  cursor: pointer;
}
.title-logo {
  margin-right: 5px;
  height: 7.5rem;
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
  font-size: 20px;
}
.github-info-wrapper {
  display: table;
  text-align: center;
  margin: 0px 40px 0px 0px;
  cursor: pointer;
}
.github-icon {
  height: 3rem;
  padding-right: 10px;
  color: white;
}
.github-info-content {
  display: table-cell;
  vertical-align: middle;
  color: white;
  font-family: "Trattatello";
  font-size: 20px;
}
.lang-select-area {
  display: flex;
  margin-right: 30px;
  width: 150px;
}
.lang-icon {
  margin-top: 0px;
  height: 24px;
  padding-right: 10px;
  color: white;
}
.lang-select {
  cursor: pointer;
}
</style>
