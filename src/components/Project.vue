<template>
    <div class="card project-card">
        <h4 v-if="title.length > 88"
            class="card-header"
            v-b-tooltip.hover
            :title="title"
        >
            {{ title | truncate(title.length) }}
            <font-awesome-icon icon="window-close" size="lg" pull="right" @click="skipProject(id)"/>
        </h4>
        <h4 v-else
            class="card-header"
        >
            {{ title | truncate(title.length) }}
            <font-awesome-icon icon="window-close" size="lg" pull="right" @click="skipProject(id)"/>
        </h4>
        <div class="card-body">
            <h5 class="card-text">{{ comp }} / {{ length }} {{ 'minute' | pluralize(length) }}</h5>
            <p class="card-text">{{ type }}</p>
            <p class="card-text">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Project',
    components: {
    },
    props: ['title', 'type', 'description', 'comp', 'length', 'skipProject', 'id'],
    methods: {
        goToProject(location) {
            window.location = location
        },
    }
}
</script>
<style scoped>
    .project-card {
        margin: 20px;
        cursor: pointer;
    }
</style>
