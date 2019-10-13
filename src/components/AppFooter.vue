<template>
    <footer class="footer">
        <div class="content has-text-centered has-text-grey-light">
            <p>
                <small>
                    Leaderboards | James O'Sullivan | &copy; {{year}}
                </small>
            </p>

            <a
                class="button is-small"
                href="https://github.com/jmosul/leaderboards"
                target="_blank"
                title="See code or report issues Leaderboards in GitHub"
            >
                <b-icon
                    icon="github"
                    pack="fab"
                    size="is-small"
                ></b-icon>
                <span>&nbsp;Github</span>
            </a>
        </div>
    </footer>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import BIcon from 'buefy/src/components/icon/Icon';

    @Component({
        components: {
            BIcon,
        },
    })
    export default class AppFooter extends Vue {
        get year() {
            return new Date().getFullYear();
        }
    }
</script>

<style scoped>
    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-bottom: 4em;
    }
</style>
