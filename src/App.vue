<template>
    <div id="app">
        <router-view :categories="categories"></router-view>
    </div>
</template>

<script>
/* eslint-disable */
import HomePage from './components/HomePage'

const axios = require('axios')

export default {
    name: 'app',
    data () {
        return {
        categories: []
        }
    },
    mounted () {
        this.fetchCategories()
    },
    methods: {
        fetchCategories() {
        let country = 'country=us&'
        let key = ''
        let url = 'https://newsapi.org/v2/sources?'
        let call = url + country + key

        let getData = async () => {
            try {
            let response = await axios.get(call);
            let news = response.data.sources
            news.map(item => {
                this.categories.push(item)
            })
            // console.log(news)
            let filteredCategories = []
            this.categories.forEach((element) => {
                filteredCategories.push(element.category)
            })
            filteredCategories = [...new Set(filteredCategories)]
            this.categories = filteredCategories
            } catch (error) {
            console.error(error)
            }
        }
        getData()
        },
    },
    components: {
        HomePage
    }
}
</script>

<style lang="scss">
@import 'src/style.scss';
</style>
