<template>
    <button
        :class="buttonClass"
        title="Copy league invite link"
        v-clipboard:copy="linkUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
    >
        <b-icon icon="share-alt" pack="fas"></b-icon>
        <span v-if="buttonText">&nbsp; {{buttonText}}</span>
    </button>
</template>

<script>
    import AppComponent from '../AppComponent';
    import Component from 'vue-class-component';

    @Component({
        props: {
            leagueId: String,
            type: String,
            text: String,
        },
    })
    export default class JoinLink extends AppComponent {
        copyError = false;

        get linkUrl() {
            return `${window.location.host}/${this.leagueId}/join`;
        }

        get buttonText() {
            return this.text && this.text.length ? this.text : undefined;
        }

        get buttonClass() {
            return `button ${this.type}`.trim();
        }

        onCopy() {
            this.showMessage('Link to join league copied!', 'is-success');
        }

        onError() {
            this.copyError = true;
            this.showMessage('Unable to copy join link.');
        }
    }
</script>

<style scoped>

</style>
