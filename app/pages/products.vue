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
            <span class="label" v-if="product.label">{{ product.label.toUpperCase() }}</span>
            <img :src="product.img" :alt="`image: ${product.name}`" class="goods-image">
            <h3 class="goods-title">{{ product.name }}</h3>
            <p class="goods-description">{{ product.description }}</p>
            <button class="button goods-card-btn add-to-cart" :data-id="product.id">
              <span class="button-price">${{ product.price }}</span>
            </button>
          </div>
        </div>
			</div>
		</div>
	</section>
</template>

<script setup>
definePageMeta({
  layout: 'custom'
});

const route = useRoute();
const field = computed(() => route.query.field || '');
const name = computed(() => route.query.name || '');
const { data } = await useAsyncData('filtered-products', () => {
  return $fetch(`/api/filtered-products?field=${field.value}&name=${name.value}`);
}, { watch: [field, name]});
</script>
