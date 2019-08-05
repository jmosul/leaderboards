<template>
    <div class="home">
        <section class="panel">
            <p class="panel-heading">
                Your Leagues
                <b-icon
                    :v-if="isLoading"
                    icon="volleyball-ball"
                    size="is-small"
                    pack="fas"
                    custom-class="fa-spin"
                ></b-icon>
            </p>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input
                        class="input is-small"
                        type="text"
                        placeholder="Search"
                        :disabled="isLoading"
                    >
                    <b-icon icon="search" size="is-small" pack="fas" class="is-left"></b-icon>
                </p>
            </div>
            <a class="panel-block" v-for="(league, index) in leagues" :key="index">
                {{league.name}}
            </a>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Icon} from 'buefy';
    import LeaguesService from '../services/LeaguesService';

    Vue.use(Icon);

    @Component()
    export default class Home extends Vue {
        leagues = [
            {
                name: 'My League'
            }
        ];

        isLoading = true;

        mounted() {
            LeaguesService.index()
                .then((leagues) => {
                    this.leagues = leagues;
                    console.log(leagues);
                    this.isLoading = false;
                })
                .catch((error) => console.log(error))
        }
    }
</script>
