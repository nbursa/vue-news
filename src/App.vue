<template>
    <div id="app">
        <router-view :categories="categories"></router-view>
    </div>
</template>

<script>
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
            let response = await this.$axios.get(call);
            let news = response.data.sources
            news.map(item => {
                this.categories.push(item)
            })
            let filteredCategories = []
            this.categories.forEach((element) => {
                filteredCategories.push(element.category)
            })
            filteredCategories = [...new Set(filteredCategories)]
            this.categories = filteredCategories
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
        }
        getData()
        },
    }
}
</script>

<style lang="scss">
@import 'src/style.scss';
</style>
