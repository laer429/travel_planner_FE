
<template>
  <div class="container">
    <div class="item" id="search"><SearchView></SearchView></div>
    <div calss="item" id="map" ><MapView></MapView></div>
    <div calss="item" id="plan"><PlanView></PlanView></div>
  </div>
</template>
<script>
import SearchView from "./components/SearchView.vue";
import PlanView from "./components/PlanView.vue";
import MapView from "./components/MapView.vue";



export default {
  name: "app",
  components: { // 가져온 component 들을 등록합니다.
    SearchView,
    PlanView,
    MapView
  }};
</script>

<style scoped>

#search {
  width:20%;
  height: 1000px;
  background-color: white;
}
#map {
  width:60%;
  height: 1000px;
  background-color: rgb(190,182,249);
}
#plan {
  width:20%;
  height: 1000px;
  background-color: white;
}

.container {
  display: flex;
}
</style>