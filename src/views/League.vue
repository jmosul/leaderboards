<template>
    <div class="league columns is-desktop">
        <section class="column is-two-thirds">
            <league-table></league-table>
        </section>
        <section class="column is-one-third">
            <add-match></add-match>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AddMatch from '@/components/AddMatch';
    import LeagueTable from '@/components/LeagueTable';

    @Component({
        components: {LeagueTable, AddMatch},
    })
    export default class League extends Vue {

    }
</script>

<style scoped>

</style>
