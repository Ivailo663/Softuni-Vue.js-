<template>
  <div class="footer d-flex justify-content-center" id="break-point">
    <div class="footer-inner-container d-flex flex-column align-items-center">
      <div class="footer-nav-wrapper">
        <ul class="d-flex justify-content-center">
          <router-link to>
            <li>Contact us</li>
          </router-link>
          <router-link to>
            <li>Who are we</li>
          </router-link>
          <router-link to>
            <li>Terms and Conditions</li>
          </router-link>
        </ul>
      </div>
      <div class="info-container">
        <p>
          It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software
          like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <div class="social-media-container">
        <ul class="d-flex justify-content-center">
          <li>
            <a>
              <i class="fab media fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a>
              <i class="fab media fa-pinterest-p"></i>
            </a>
          </li>
          <li>
            <a>
              <i class="fab media fa-snapchat-ghost"></i>
            </a>
          </li>
          <li>
            <a>
              <i class="fab media fa-instagram"></i>
            </a>
          </li>
          <li>
            <a>
              <i class="fab media fa-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  methods: {
    onScroll() {
      // const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      const breakPoint = document.getElementById("break-point");
      const breakPointTop = document.getElementBy;

      if (currentScrollPosition + 800 > breakPoint.offsetTop) {
        this.$store.state.isMediaShown = false;
      } else {
        this.$store.state.isMediaShown = true;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    console.log(this);
  }
};
</script>

<style lang="scss" scoped>
</style>