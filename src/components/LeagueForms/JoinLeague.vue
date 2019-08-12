<template>
    <form class="join-league" @submit.prevent="joinLeague">
        <b-field
            label="League Id"
            position="is-centered"
            :type="fieldType"
        >
            <b-input
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                icon-pack="fas"
                type="text"
                v-model="leagueId"
                :disabled="isJoining"
                expanded
                required
            ></b-input>
        </b-field>
        <button
            class="button is-primary is-outlined"
            type="submit"

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
    </form>
</template>

<script>
    import Component from 'vue-class-component';
    import LeagueForm from './LeagueForm';

    @Component({})
    export default class JoinLeague extends LeagueForm {
        mounted() {
            this.competitorName = this.username;
        }

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
