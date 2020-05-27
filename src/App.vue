<template>
  <div class="app">
    <h1 class="app-heading">Pokedex</h1>
    <Main />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import Main from './pages/Main.vue'

@Component({
  components: {
    Main
  }
})
export default class extends Vue { }
</script>

<style lang="scss">
@import "./assets/styles/utils/variables";

* {
  padding: 0;
  margin: 0;
  font-family: 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: $black;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-heading {
  border: 3px solid $black;
  padding: 0 150px;
  margin: 20px 0;
}
</style>
