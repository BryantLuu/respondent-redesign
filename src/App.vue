<template>
    <div id="app">
        <b-navbar toggleable class="navbar border-bottom">
            <b-navbar-brand href="#">
                <img src="./assets/respondent_logo.png" class="d-none d-lg-block d-xl-block">
                <img src="./assets/respondent_logo_mobile.png" class="d-lg-none d-xl-none">
            </b-navbar-brand>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#">Projects</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#">Log in</b-nav-item>
                    <b-nav-item href="#">Sign up</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <Projects />
    </div>
</template>

<script>
import Projects from './components/Projects.vue'

export default {
    name: 'app',
    components: {
        Projects,
    },
}
</script>

<style>
    .tooltip-inner {
        min-width: 500px;
    }
</style>
