import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloPovider } from '@vue/apollo-option'
import { setContext } from 'apollo-link-context'

const httplink = createHttpLink({
    uri: 'https://mt-c4-104462-apigateway.herokuapp.com/',
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            'Authorization': localStorage.getItem('token_access') || ""
        }
    }
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httplink),
    cache: new InMemoryCache()
})

const apolloProvider = new createApolloPovider({
    defaultClient: apolloClient
})

createApp(App).use(router).use(apolloProvider).mount('#app')
