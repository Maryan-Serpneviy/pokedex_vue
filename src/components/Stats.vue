<template>
  <div>
    <img class="pic" :src="item.pic" />
    <table class="stats">
      <caption class="name">{{ capitalize(item.name) }}</caption>
      <tbody>
        <tr>
          <td>Type(s)</td>
          <td>{{ item.types.join(', ') }}</td>
        </tr>
        <tr v-for="s in item.stats" :key="s.stat">
          <td>{{ capitalize(s.name) }}</td>
          <td>{{ s.stat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { capitalize } from '@/core/helpers'
import { PokemonType } from '../types'

@Component
export default class extends Vue {
  @Prop({ required: true }) item!: PokemonType

  capitalize(str: string): string {
    return capitalize(str)
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/utils/variables";

.stats {
  margin-top: 250px;
  border-collapse: collapse;
  position: fixed;
}

.stats,
.stats td {
  border: 2px solid $black;
  text-align: center;
  padding: 3px 10px;
}

.stats td {
  min-width: 90px;
}

.pic {
  position: fixed;
  margin-top: 120px;
  margin-left: 90px;
  transform: scale(2);
}

.name {
  font-weight: bold;
  font-size: 25px;
}
</style>
