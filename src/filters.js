import Vue from 'vue'

Vue.filter('pluralize', (word, amount) => amount > 1 ? `${word}s` : word)
Vue.filter('truncate', (words, amount) => amount > 88 ? `${words.slice(0, 88)}...` : words)
