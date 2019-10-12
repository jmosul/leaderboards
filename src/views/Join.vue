<template>
    <div class="join">
        <section class="hero is-secondary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        <b-icon :icon="icon" pack="fas"></b-icon>
                        <span>&nbsp; Join {{name}}</span>
                    </h1>
                </div>
            </div>
        </section>
        <div class="columns is-desktop">
            <section class="column is-three-fifths-desktop is-offset-one-fifth-desktop has-text-centered">
                <p>Looks like you've been invited join {{name}}.</p>

                <p>To join just press the join button below.</p>

                <join-league v-if="!isLoading" :id="leagueId" :input-disabled="true" :is-primary-action="true"></join-league>
            </section>
        </div>

        <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Getter} from 'vuex-class';
    import JoinLeague from '../components/LeagueForms/JoinLeague';

    @Component({
        components: {
            JoinLeague
        },
    })
    export default class Home extends Vue {
        @Getter('league/leagueId') leagueId;
        @Getter('league/icon') icon;
        @Getter('league/name') name;
        @Getter('league/isLoading') isLoading;
    }
</script>

