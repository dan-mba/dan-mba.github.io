<template>
  <div id="app">
    <div v-if="!loaded">Loading ...</div>
    <Item v-for="(item, index) in items"
      v-bind:key=index
      v-bind:title=item.title
      v-bind:link=item.link
      v-bind:image=item.image
      v-bind:desc=item.description>
    </Item>
  </div>
</template>

<script>
import Item from './components/Item.vue'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      items: null,
      loaded: false
    }
  },
  components : {Item},
  mounted () {
    /*
      Call back-end to transform XML RSS feed to JSON & bypass CORS restrictions.
    */
    axios
      .get('https://flannel-glade.glitch.me', {
        params: {
          rss: 'http://www.espn.com/blog/feed?blog=afcsouth'
        }
      })
      .then(response => {
        this.items = response.data.rss.channel.item;
        this.loaded = true;
      })
      .catch(error => {
        console.log(error)
      })
  }
 }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 2% auto;
  max-width: 800px;
}
</style>
