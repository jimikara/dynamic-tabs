import { defineStore } from 'pinia'
import type { Tab } from 'src/types'
import { v4 as uuidv4 } from 'uuid';

export type RootState = {
  tabs: Tab[];
  visibleTabs: Tab[];
  activeTabId: string;
  isLoading: boolean;
};

export const useTabStore = defineStore('tabs', { 
  state: () => ({ 
    tabs: [],
    visibleTabs: [],
    activeTabId: '1',
    isLoading: false
  } as RootState),
  actions: {
    removeTab(tab: Tab) {
      const index = this.tabs.findIndex(t => t.id === tab.id)

      if (this.tabs.length === 1) {
        this.setActiveTab('')
        this.tabs = []
      } else {
        if (this.activeTabId === tab.id) {
          if (index === this.tabs.length - 1) {
            this.setActiveTab(this.tabs[index - 1].id)
          } else {
            this.setActiveTab(this.tabs[index + 1].id)
          }
        }

        this.tabs = this.tabs.filter(t => t.id !== tab.id)
      }
    },
    setActiveTab(tabId: string) {
      this.activeTabId = tabId
    },
    selectPreviousTab(tabId: string) {
      if (!tabId || this.tabs.length <= 1) return

      const index = this.tabs.findIndex(t => t.id === tabId)

      if (index === 0) {
        this.setActiveTab(this.tabs[this.tabs.length - 1].id)
      } else {
        this.setActiveTab(this.tabs[index - 1].id)
      }
    },
    selectNextTab(tabId: string) {
      if (!tabId || this.tabs.length <= 1) return
      const index = this.tabs.findIndex(t => t.id === tabId)

      if (index === this.tabs.length - 1) {
        this.setActiveTab(this.tabs[0].id)
      }
      else {
        this.setActiveTab(this.tabs[index + 1].id)
      }
    },
    async fetchSearchResults(searchTerm: string) {
      const id = uuidv4()

      this.setIsLoading(true)

      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)

      this.tabs.push({ id, search: searchTerm, result: response.ok ? await response.json() : null })
      this.setActiveTab(id)
      this.setIsLoading(false)
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading
    }
  },
  getters: {
    firstTabId(state) {
      if (state.tabs.length === 0) return
      return state.tabs[0].id
    },
    activeTab(state) {
      return state.tabs.find(t => t.id === state.activeTabId)
    }
  }
})