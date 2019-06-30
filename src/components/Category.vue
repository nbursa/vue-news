<template>
    <div class="category">
        <router-link to="/">Back</router-link>
        <h3>Category</h3>
        <h1>{{ this.$route.query.category }}</h1>
        <div v-if="loading" class="loader">
            <div class="pulser"></div>
        </div>
        <div v-masonry column-width=".news" :gutter="gutter" transition-duration="0.3s" item-selector=".news" v-if="!loading" class="news-container">
            <div class="news" v-for="(item, i) in news[0]" :key="i" v-masonry-tile>
                <div class="article" v-if="item.description">
                    <a class="article-link" :href="item.url" target="_blank">
                        <img class="article-image" src="../assets/background-3046137_640.jpg" :data-src="item.urlToImage" :alt="item.title">
                        <div class=article-text>
                            <p class="article-text-description">{{ item.description }}</p>
                            <span class="article-text-author" v-if="item.author">Author: {{ item.author }}</span>
                            <span class="article-text-date" v-if="item.publishedAt">Published: {{ item.publishedAt.replace(/T|Z/g,' ') }}</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="scroll" @click="scrollToTop" v-if="position > 550"><i></i></div>
        <footer v-if="!loading">Data collected from <a href="https://newsapi.org">NewsAPI.org</a></footer>
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
            loading: true,
            gutter: 0,
            position: 0
        }
    },
    created () {

    },
    updated () {
        if(this.loading === false) {
            this.loadImagesProgressively()
        }
    },
    mounted () {
        this.fetchData()
        this.gutterCalc()
        let app = document.documentElement.querySelector('#app')
        app.addEventListener('scroll', this.scrollPosition)
    },
    beforeDestroy () {
        let app = document.documentElement.querySelector('#app')
        app.removeEventListener('scroll', this.scrollPosition)
    },
    methods: {
        scrollToTop () {
            let app = document.documentElement.querySelector('#app')
            app.scrollTop = 0
        },
        scrollPosition () {
            let category = document.documentElement.querySelector('.category')
            let currentScrollPos = Math.abs(category.getBoundingClientRect().top - 30)
            this.position = currentScrollPos
        },
        fetchData () {
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
            getData()
        },
        gutterCalc () {
            this.gutter = window.innerWidth <= 1980 ? 10 : 24.5
        },
        loadImagesProgressively () {
            let imagesToLoad = this.$el.querySelectorAll('img[data-src]')
            let loadImages = function(image) {
                image.setAttribute('src', image.getAttribute('data-src'))
                image.onload = function() {
                    image.removeAttribute('data-src')
                }
            }
            if('IntersectionObserver' in window) {
                let observer = new IntersectionObserver(function(items, observer) {
                    items.forEach(function(item) {
                        if(item.isIntersecting) {
                            loadImages(item.target)
                            observer.unobserve(item.target)
                        }
                    })
                })
                imagesToLoad.forEach(function(img) {
                    observer.observe(img)
                })
            } else {
                imagesToLoad.forEach(function(img) {
                    loadImages(img)
                })
            }
        }
    }
}
</script>
