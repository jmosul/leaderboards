<template>
    <div class="join-league">
        <b-field
            grouped
            label="League Id"
            label-position="on-border"
            position="is-centered"
            :type="fieldType"
        >
            <b-input
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                v-cleave="leagueIdMask"
                icon-pack="fas"
                type="text"
                v-model="leagueId"
                :disabled="isJoining"
                expanded
            ></b-input>
            <p class="control">
                <button
                    class="button is-primary is-outlined"
                    type="button"
                    @click="joinLeague"
                    :disabled="isJoining"
                >
                    <span class="icon is-small">
                        <b-icon
                            icon="link"
                            pack="fas"
                            v-if="!isJoining"
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
                    <span>Join League</span>
                </button>
            </p>
        </b-field>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Field, Icon, Input} from 'buefy';
    import cleave from '../../directives/Cleave';
    import LeagueForm from './LeagueForm';

    Vue.use(Icon);
    Vue.use(Field);
    Vue.use(Input);
    Vue.directive('cleave', cleave);

    @Component({})
    export default class CreateLeague extends LeagueForm {
        leagueIdMask = {
            delimiters: ['-'],
            blocks: [8, 4, 4, 4, 12],
            lowercase: true,
        };

        get fieldType() {
            if (this.validateLeagueId()) {
                return 'is-success';
            } else if (this.leagueId.length === 0) {
                return '';
            }

            return 'is-danger';
        }
    }
</script>

<style scoped>
    .join-league {
        padding-top: 5px;
        flex-grow: 1;
    }
</style>
