import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '@/core/api.config'
import { Type } from './mutation-types'
import { PokemonType } from '@/types'

Vue.use(Vuex)

const { LOAD_ITEM, SHOW_INFO } = Type

export default new Vuex.Store({
  state: {
    items: [] as [] | PokemonType[],
    item: null as null | PokemonType
  },
  getters: {
    items: (state) => state.items,
    item: (state) => state.item
  },
  mutations: {
    [LOAD_ITEM] (state, payload) {
      const stats = [
        ...payload.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
          name: s.stat.name,
          stat: s.base_stat
        })),
        { name: 'height', stat: payload.height },
        { name: 'weight', stat: payload.weight }
      ]

      const item = {
        id: payload.id,
        name: payload.name,
        pic: payload.sprites.front_default,
        types: payload.types.map((t: { type: { name: string } }) => t.type.name),
        stats
      }

      state.items.push(item)
    },
    [SHOW_INFO] (state, id: number) {
      const current = state.items.find((item: { id: number }) => item.id == id)
      if (current) {
        state.item = current
      }
    }
  },
  actions: {
    async fetchItem(store, id: number): Promise<object | void> {
      try {
        const response = await Axios(String(id))
        if (response.status == 200) {
          return response
        }
      } catch (err) {
        console.error(err)
      }
    },
    loadItem(store, payload) {
      store.commit(LOAD_ITEM, payload)
    },
    showInfo(store, id: number) {
      store.commit(SHOW_INFO, id)
    }
  },
  strict: process.env.NODE_ENV != 'production'
})
