<template>
  <div class="checkout">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="order-info">
            <form class="d-flex flex-column">
              <label for="firstName">First name</label>
              <input type="text" id="firstName" />

              <label for="lastName">Last name</label>
              <input type="text" id="lastName" />

              <label for="email">E-mail</label>
              <input type="text" id="email" />

              <label for="addres">Addres</label>
              <input type="text" id="addres" />

              <div class="payment-method d-flex">
                <div>
                  <label for="cash">
                    Cash
                    <img src="../assets/icons/cash.png" alt="cash" />
                  </label>
                  <input type="radio" name="pay" />
                </div>
                <div>
                  <label for="card">
                    Visa/MasterCard
                    <img src="../assets/icons/mastercard.png" alt="cash" />
                    <input type="radio" name="pay" />
                  </label>
                </div>
              </div>
              <button class="btn btn-dark button-basic">Submit</button>
            </form>
          </div>
        </div>
        <div class="col-lg-6 d-flex align-items-center">
          <div class="order-list d-flex flex-column">
            <perfect-scrollbar>
              <div class="basket-inner">
                <div v-for="(item,index) in basket" :key="index">
                  <div class="row">
                    <span class="discard-item">
                      <i class="fa fa-times-circle"></i>
                    </span>
                    <figure class="basket-image-holder">
                      <img :src="item.src" :alt="item.brand" />
                    </figure>

                    <div class="info-wrapper">
                      <h3>{{item.brand}}</h3>
                      <p>size {{item.sizes}}</p>
                      <p class="price">{{item.price}} $</p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </perfect-scrollbar>

            <div class="number-total-container d-flex justify-content-center">
              <p class="number">number of items: {{basket.length}}</p>
              <div class="devider"></div>
              <p class="total">
                Total:
                <span class=", price">123$</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState(["basket"])
  }
};
</script>

<style scoped>
#break-point {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.number-total-container p {
  font-size: 1.2rem;
  color: #151313;
}
.number-total-container {
  margin-top: 1rem;
}
.devider {
  height: 35px;
  width: 1px;
  background-color: #898989;
  margin: 0 1rem;
}
</style>