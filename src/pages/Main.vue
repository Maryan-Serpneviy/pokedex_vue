<template>
  <div id="main">
    <main v-if="items.length" class="tiles-wrapper">
      <Pokemon
        v-for="item in items"
        :key="item.id"
        :item="item"
        :initialRender="itemsLoaded == ITEMS_PER_LOAD"
      />
      <button @click="loadMore" class="load">Load More</button>
    </main>
    <aside class="stats-wrapper">
      <span class="items-loaded">Creatures loaded: {{ itemsLoaded }}</span>
      <Stats v-if="item" :item="item" />
    </aside>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Pokemon from '@/components/Pokemon.vue'
import Stats from '@/components/Stats.vue'
import { ITEMS_PER_LOAD } from '@/core/config'
import { PokemonType } from '@/types'

@Component({
  components: {
    Pokemon,
    Stats
  }
})
export default class extends Vue {
  itemsLoaded = 0

  mounted() {
    this.itemsLoaded += ITEMS_PER_LOAD
    for (let i = 1; i <= ITEMS_PER_LOAD; i++) {
      this.$store.dispatch('fetchItem', i)
        .then(response => this.$store.dispatch('loadItem', response.data))
    }
  }

  get items(): PokemonType[] {
    return this.$store.getters.items
  }

  get item(): PokemonType {
    return this.$store.getters.item
  }

  loadMore() {
    this.itemsLoaded += ITEMS_PER_LOAD
    for (let i = this.itemsLoaded + 1; i <= (this.itemsLoaded + ITEMS_PER_LOAD); i++) {
      this.$store.dispatch('fetchItem', i)
        .then(response => this.$store.dispatch('loadItem', response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
#main {
  display: flex;
}

.tiles-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 500px;
}

.stats-wrapper {
  width: 250px;
  min-height: 500px;
}

.items-loaded {
  position: fixed;
}

.load {
  width: 92%;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background-color: rgb(43, 142, 255);
  border: 2px solid gray;
  border-radius: 15px;
  margin-bottom: 25px;
  margin-top: 5px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:active {
    position: relative;
    top: 1px;
    left: 1px;
  }
}
</style>
