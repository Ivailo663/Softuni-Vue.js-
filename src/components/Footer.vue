<template>
  <div class="footer d-flex justify-content-center">
    <div class="footer-inner-container">
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
              <div class="media facebook"></div>
            </a>
          </li>
          <li>
            <a>
              <div class="media pinterest"></div>
            </a>
          </li>
          <li>
            <a>
              <div class="media snapchat"></div>
            </a>
          </li>
          <li>
            <a>
              <div class="media instagram"></div>
            </a>
          </li>
          <li>
            <a>
              <div class="media twitter"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
</style>