<template>
  <div class="homepage">
    <h1>News</h1>
    <div class="source">Data collected from <a href="https://newsapi.org">NewsAPI.org</a></div>
    <h2>Choose category:</h2>
    <div class="categories">
      <router-link v-for="item in categories" :key="item" :to="{path: '/category', query: { category: item } }">{{ item }} </router-link>
    </div>
    <h4>Headlines</h4>
    <div class="headlines">
        <h6 v-for="item in headlines" :key="item">{{ item }}</h6>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const axios = require('axios')

export default {
    name: 'HomePage',
    props: {
        categories: Array
    },
    data () {
        return {
            headlines: []
        }
    },
    mounted() {
        this.fetchHeadlines()
    },
    methods: {
        fetchHeadlines() {
            let country = 'country=us&'
            let key = ''
            let url = 'https://newsapi.org/v2/top-headlines?'
            let call = url + country + key

            let getData = async () => {
                try {
                    let response = await axios.get(call);
                    let headlines = response.data.articles
                    headlines.forEach((article) => {
                        if (article.title)
                            this.headlines.push(article.title)
                    })
                } catch (error) {
                    console.error(error)
                }
            }
            getData()
        },
    }
}
</script>

