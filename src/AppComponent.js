import Vue from 'vue';

export default class AppComponent extends Vue {
    /**
     * @param {string} message
     * @param {string} type
     */
    showMessage(message, type = 'is-danger') {
        this.$buefy.toast.open({
            message,
            type,
            position: 'is-top',
            duration: 2500
        });
    }
}
