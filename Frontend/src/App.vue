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
    background: rgb(99, 99, 99);
    background: linear-gradient(90deg, rgba(99, 99, 99, 1) 0%, rgba(150, 150 ,150, 1) 100%);
  }
</style>
