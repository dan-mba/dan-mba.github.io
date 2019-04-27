<template>
  <div class="item">
    <a :href="link" target="_blank" rel="noopener">
      <img :src="image">
      <div class="text">
        <div class="title">{{title}}</div>
        <div class="desc">{{desc}}</div>
      </div>
    </a>
  </div>
 </template>

<script>
export default {
  name: 'Item',
  props: {
    link: String,
    title: String,
    image: String,
    desc: String
  }
}
</script>

<style scoped>
div.item {
  padding: 2% 2vw;
}
div.text {
  align-self: center;
  padding: 0 2vw;
}
div.title {
  font-size: 1.2em;
  color: #162029;
}
a{
  display: flex;
  text-decoration: none;
  color: inherit;
}
img {
  flex-basis: 30%;
  max-width: 30%;
  flex-shrink: 0;
  align-self: center;
}

/* For smaller screens, put the text below the image */
@media (max-width: 560px) {
  a {
    flex-direction: column;
  }
  img {
    max-width: 100%;
    margin: 1% 0;
  }
}
</style>