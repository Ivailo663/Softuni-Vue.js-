<template></template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "Pre-fab homes",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 12
        },
        {
          title: "Favorite road trips",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 6
        },
        {
          title: "Best airlines",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 6
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid red;
  width: 80vw;
}
.col-6 {
  border: 1px solid green;
}
</style>