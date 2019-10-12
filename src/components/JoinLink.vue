<template>
    <div class="join__link">
        <button
            class="button"
            v-clipboard:copy="linkUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
        >
            <b-icon icon="share-alt" pack="fas"></b-icon>
            <span>&nbsp; Invite link</span>
        </button>

        <small v-if="copyError">
            Copy link:
            <a :href="linkUrl" target="_blank" title="Join League">{{linkUrl}}</a>
        </small>
    </div>
</template>

<script>
    import AppComponent from '../AppComponent';
    import Component from 'vue-class-component';

    @Component({
        props: {
            leagueId: String,
        },
    })
    export default class JoinLink extends AppComponent {
        get linkUrl() {
            return `${window.location.host}/${this.leagueId}/join`;
        }

        onCopy() {
            this.showMessage('Link to join league copied', 'is-info');
        }

        onError() {
            this.copyError = true;
            this.showMessage('Unable to copy join link');
        }
    }
</script>

<style scoped>

</style>
