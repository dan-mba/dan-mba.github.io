<template>
  <div id="app">
    <div v-if="!loaded">
      <div>Loading</div>
      <div class="lds-facebook"><div></div><div></div><div></div></div>
    </div>
    <!-- Create an Item component for each entry in the RSS feed -->
    <Item v-for="(item, index) in items"
      v-bind:key="index"
      v-bind:title="item.title"
      v-bind:link="item.link"
      v-bind:image="item.image"
      v-bind:desc="item.description"
    >
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
  margin: 0 auto;
  padding: 2% 0;
  max-width: 800px;
}

/* loading animation from loading.io */
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #111;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}

</style>
