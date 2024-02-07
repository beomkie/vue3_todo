<template>
    <div
      v-for="(item) in items"
      :key="item.id"
      class="card mt-3"
    >
        <slot :item="item"></slot>
    </div>
</template>

<script>
export default {
    porps: {
        items: {
            type: Array,
            required: true,
        }
    }

}
</script>

<style>

</style>