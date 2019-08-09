<template>
    <form name="createLeague" @submit.prevent="handleCreate">
        <b-field label="League Name">
            <b-input
                :disabled="isCreating"
                v-model="league.name"
                required="required"
                minlength="4"
            ></b-input>
        </b-field>

        <b-field label="Choose an icon"></b-field>

        <b-field grouped>
            <b-radio-button
                v-for="(icon, key) in icons" :key="key"
                v-model="league.icon"
                type="is-info"
                :native-value="icon"
                :disabled="isCreating"
            >
                <b-icon :icon="icon" pack="fas"></b-icon>
            </b-radio-button>
        </b-field>

        <b-field>
            <button
                native-type="submit"
                class="button is-primary is-outlined is-fullwidth"
            >
                <span class="icon is-small">
                    <b-icon
                        icon="plus"
                        pack="fas"
                        v-if="!isCreating"
                    >
                    </b-icon>
                    <b-icon
                        pack="fas"
                        icon="volleyball-ball"
                        custom-class="fa-spin"
                        v-else
                    >
                    </b-icon>
                </span>
                <span>Create League</span>
            </button>
        </b-field>
    </form>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Button, Field, Icon, Input, Radio} from 'buefy';
    import LeagueForm from './LeagueForm';
    import LeaguesService from '../../services/LeaguesService';
    import {Getter} from 'vuex-class';

    Vue.use(Button);
    Vue.use(Radio);
    Vue.use(Field);
    Vue.use(Input);
    Vue.use(Icon);

    @Component({})
    export default class CreateLeague extends LeagueForm {
        @Getter('league/leaguePool') leaguePool;

        icons = [
            'list-ol',
            'table-tennis',
            'futbol',
            'dice',
            'dot-circle',
            'chess',
        ];

        league = {
            name: '',
            icon: 'list-ol',
            leaguePool: '',
        };

        mounted() {
            this.competitorName = this.username;
        }

        handleCreate() {
            this.isCreating = true;

            this.league.leaguePool = this.leaguePool;

            return LeaguesService.store(this.league).then(
                (league) => {
                    this.leagueId = league.leagueId;

                    this.isJoining = true;
                    this.isCreating = false;

                    return this.joinLeague();
                },
                () => {
                    this.isCreating = false;
                }
            );
        }
    }

</script>

<style scoped>

</style>
