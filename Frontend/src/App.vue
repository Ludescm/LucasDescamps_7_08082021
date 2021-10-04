<!-- fichier central de l'qpplication Vue.-->

<template>
    <div id="app">
      <Navi></Navi>
      <router-view></router-view>
    </div>
</template>

<script>
import Navi from "./components/Navi";

export default {
    name: "App",
    components: {
      Navi
    }
}
</script>

<style>
  body {
    background: rgb(85, 85, 85);
    background: linear-gradient(90deg, rgba(85,85,85) 0%, rgba(185,185,185) 100%);
  }
</style>
