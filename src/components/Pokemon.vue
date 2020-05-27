<template>
  <div class="tile">
    <div class="tile-pic-container">
      <img
        class="tile-pic"
        :data-id="item.id"
        :data-name="item.name"
        :src="item.pic"
        @click="showInfo"
      />
    </div>
    <span class="tile-name">{{ item.name }}</span>
    <div class="tile-type-container">
      <span
        class="tile-type"
        v-for="type in item.types"
        :id="type"
        :key="type"
      >{{ type }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { scrollToBottom } from '@/core/helpers'
import { PokemonType } from '../types'

@Component
export default class extends Vue {
  @Prop({ required: true }) item!: PokemonType
  @Prop({ required: true }) initialRender!: boolean

  mounted() {
    if (!this.initialRender) {
      scrollToBottom()
    }
  }

  showInfo(event: any) {
    const id = event.target.dataset.id
    this.$store.dispatch('showInfo', id)
  }
}
</script>

<style lang="scss">
@import "../assets/styles/utils/variables";
@import "../assets/styles/utils/mixins";

#grass,
#normal {
  @include type-color($grass)
}

#poison {
  @include type-color($poison)
}

#fire {
  @include type-color($fire)
}

#electric {
  @include type-color($electric)
}

#water {
  @include type-color($water)
}

#ice {
  @include type-color($ice)
}

#bug {
  @include type-color($bug)
}

#flying,
#fairy {
  @include type-color($flying)
}

#ghost {
  @include type-color($ghost)
}

#steel,
#psychic {
  @include type-color($psychic)
}

#ground,
#rock {
  @include type-color($ground)
}

#fighting {
  @include type-color($fighting)
}

.tile {
  display: flex;
  flex-direction: column;
  border: 2px solid $black;
  padding: 8px;
  text-align: center;
  text-transform: capitalize;
  font-size: 15px;
  min-width: 120px;
  min-height: 150px;
  margin-bottom: 15px;
  padding-bottom: 12px;
}

.tile-name {
  padding-top: 10px;
  font-weight: bold;
}

.tile-pic-container {
  border: 1px solid $black;
  min-width: 100px;
  min-height: 100px;
}

.tile-pic {
  transform: scale(1.2);
  cursor: pointer;
}

.tile-type-container {
  display: flex;
  justify-content: space-between;
}

.tile-type {
  flex-direction: row;
  font-size: 13px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: default;
}
</style>
