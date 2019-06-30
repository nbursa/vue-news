<template>
    <div class="category">
        <router-link to="/">Back</router-link>
        <h3>Category</h3>
        <h1>{{ this.$route.query.category }}</h1>
        <div v-if="loading" class="loader">
            <div class="pulser"></div>
        </div>
        <div class="news" v-for="(item, i) in news[0]" :key="i">
            <div class="article" v-if="!loading">
                <a class="article-link" :href="item.url" target="_blank">
                    <img class="article-image" :src="item.urlToImage" :alt="item.title">
                    <div class=article-text>
                        <p class="article-text-description">{{ item.description }}</p>
                        <span class="article-text-author">{{ item.author }}</span>
                        <span class="article-text-date">{{ item.publishedAt }}</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
const axios = require('axios')

export default {
    name: 'Category',
    props: {
        items: Array
    },
    data () {
        return {
            news: [],
            loading: false
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            let news = []
            let variable = 'category=' + `${this.$route.query.category}`+ '&pageSize=100&country=us&'
            let key = ''
            let url = 'https://newsapi.org/v2/top-headlines?'
            let call = url + variable + key

            let getData = async () => {
                try {
                    let response = await axios.get(call)
                    news.push(response.data.articles)
                    news.map((article) => {
                        this.news.push(article)
                    })
                    this.loading = false
                } catch (error) {
                    console.error(error)
                }
            }
            this.loading = true
            getData()
        },
    }
}
</script>
