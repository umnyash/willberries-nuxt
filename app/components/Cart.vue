<template>
  <div class="overlay" :class="{'show': viewCart}" id="modal-cart">
		<div class="modal">
			<header class="modal-header">
				<h2 class="modal-title">Cart</h2>
				<button class="modal-close" @click="closeCart">x</button>
			</header>
			<table class="cart-table">
				<colgroup>
					<col class="col-goods">
					<col class="col-price">
					<col class="col-minus">
					<col class="col-qty">
					<col class="col-plus">
					<col class="col-total-price">
					<col class="col-delete">
				</colgroup>
				<thead>
					<tr>
						<th>Good(s)</th>
						<th>Price</th>
						<th colspan="3">Qty.</th>
						<th colspan="2">Total</th>
					</tr>
				</thead>
				<tbody class="cart-table__goods">
					<tr v-if="!cart.length">
						<td colspan="7" class="cart-empty">Корзина пуста</td>
					</tr>
					<tr v-for="product in cart" :key="product.id">
						<td>{{  product.name }}</td>
						<td>{{  product.price }}$</td>
						<td>
              <button class="cart-btn-minus" @click="decrementProductCount(product)" :disabled="product.count <= 1">
                -
              </button>
            </td>
						<td>{{  product.count }}</td>
						<td>
              <button class=" cart-btn-plus" @click="incrementProductCount(product)">
                +
              </button>
            </td>
						<td>{{  product.count * product.price }}$</td>
						<td><button class="cart-btn-delete" @click="removeProduct(product)">x</button></td>
					</tr>
				</tbody>
				<tfoot v-if="cart.length">
					<tr>
						<th colspan=" 5">Total:</th>
						<th class="cart-table__total" colspan="2">{{ totalPrice }}$</th>
					</tr>
				</tfoot>
			</table>
			<form class="modal-form" action="">
				<input class="modal-input" type="text" placeholder="Имя" name="nameCustomer">
				<input class="modal-input" type="text" placeholder="Телефон" name="phoneCustomer">
				<button class="button cart-buy" type="submit">
					<span class="button-text">Checkout</span>
				</button>
			</form>
		</div>
	</div> 
</template>

<script setup lang="ts">
import type { CartItem } from '~/models/cart-item.model';

const viewCart = useViewCart();
const cart = useCart();
const totalPrice = computed(() => cart.value.reduce((total, item) => {
  return total + item.price * item.count;
}, 0));

const closeCart = () => {
  viewCart.value = false;
};

const incrementProductCount = (item: CartItem) => {
  const foundItem = cart.value.find(({ id }) => id === item.id);
  
  if (foundItem) {
    foundItem.count++;
  }
};

const decrementProductCount = (item: CartItem) => {
  const foundItem = cart.value.find(({ id }) => id === item.id);
  
  if (foundItem) {
    foundItem.count--;
  }
};

const removeProduct = (item: CartItem) => {
  const foundItem = cart.value.find(({ id }) => id === item.id);
  
  if (foundItem) {
    cart.value = cart.value.filter(({ id }) => id !== item.id);
  }
};
</script>

<style>
.cart-table__goods .cart-empty {
	text-align: center;
}
</style>
