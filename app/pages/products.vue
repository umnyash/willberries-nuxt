<template>
	<section class="long-goods d-block">
		<div class="container">
			<div class="row align-items-center mb-4">
				<div class="col-12">
					<h2 class="section-title">Category</h2>
				</div>
			</div>
			<div class="row long-goods-list">
        <div class="col-lg-3 col-sm-6" v-for="product in data">
          <div class="goods-card">
            <span class="label" v-if="product.label">{{ formatLabel(product.label) }}</span>
            <img :src="product.img" :alt="`image: ${product.name}`" class="goods-image">
            <h3 class="goods-title">{{ product.name }}</h3>
            <p class="goods-description">{{ product.description }}</p>
            <button class="button goods-card-btn add-to-cart" @click="addToCart(product)">
              <span class="button-price">${{ product.price }}</span>
            </button>
          </div>
        </div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { CartItem } from '~/models/cart-item.model';
import type { Product } from '~/models/products.model';

definePageMeta({
  layout: 'custom'
});

const route = useRoute();
const field = computed(() => route.query.field || '');
const name = computed(() => route.query.name || '');
const cartItems = useCart();

const { data } = await useAsyncData('filtered-products', () => {
  return $fetch(`/api/filtered-products?field=${field.value}&name=${name.value}`);
}, { watch: [field, name]});

const addToCart = (product: Product) => {
	const foundItem = cartItems.value.find(({ id }) => id === product.id);

	if (foundItem) {
		foundItem.count++;
	} else {
		const newCartItem: CartItem = {
			id: product.id,
			name: product.name,
			price: parseInt(product.price),
			count: 1,
		};
	
		cartItems.value.push(newCartItem);
	}
};
</script>
