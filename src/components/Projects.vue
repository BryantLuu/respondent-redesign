<template>
    <div class="container">
        <h1 class="text-center pb-2 mt-4 mb-2 border-bottom">Browse Active Projects</h1>
        <b-alert show class="pointer" variant="primary">
            <font-awesome-icon icon="lightbulb" size="lg"/>
            <span class="refer_promotion">Earn <b>$50</b> if you refer a friend to a study!</span>
        </b-alert>
        <div class="filter card">
            <i class="fa fa-search"></i>
            <b-form-input
                class="searchInput"
                v-model="searchText"
                type="text"
                placeholder="Keywords or Location e.g. Marketing or New York">
            </b-form-input>
            <font-awesome-icon icon="search" size="lg" class="search-icon"/>
            <div>
                <b-dropdown variant="light" size="md">
                    <template slot="button-content">
                        Compensation
                    </template>
                    <b-dropdown-item @click="addCompensationFilter(50)">Over $50</b-dropdown-item>
                    <b-dropdown-item @click="addCompensationFilter(150)">Over $150</b-dropdown-item>
                    <b-dropdown-item @click="addCompensationFilter(200)">Over $200</b-dropdown-item>
                </b-dropdown>
                <b-dropdown variant="light" size="md">
                    <template slot="button-content">
                        Length
                    </template>
                    <b-dropdown-item @click="addLengthFilter(30)"><= 30 Minutes</b-dropdown-item>
                    <b-dropdown-item @click="addLengthFilter(60)"><= 60 Minutes</b-dropdown-item>
                    <b-dropdown-item @click="addLengthFilter(90)"><= 90 Minutes</b-dropdown-item>
                </b-dropdown>
                <b-dropdown variant="light" size="md">
                    <template slot="button-content">
                        Type
                    </template>
                    <b-dropdown-item
                        v-for="type in possibleTypes"
                        @click="addTypeFilter(type)"
                    >
                        {{type}}
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="active_filters">
                <b-badge
                    class="pointer"
                    variant="primary"
                    v-for="(filter, index) in filters"
                    @click="removeFilterTag(index)"
                >
                    {{ filter.displayBadge }}
                </b-badge>
            </div>
        </div>
        <project
            v-for="project in projects"
            :title="project.name"
            :type="project.kindOfResearchFormatted"
            :description="project.description"
            :comp="project.respondentRemunerationFormatted"
            :length="project.timeMinutesRequired"
            :id="project.id"
            :skipProject="skipProject"
        >
        </project>
        <div v-if="projects.length == 0">
            <h2 class="text-center">¯\_(ツ)_/¯ No results matching those filters.</h2>
        </div>
    </div>
</template>

<script>
    import sampleData from '../sample.json'
    import Project from './Project.vue'
    const filter = function(display, filter, type) {
        this.displayBadge = display,
        this.filterFunction = filter
        this.type = type
    }
    const filterTypes = {
        'compensation':'compensation',
        'length':'length',
        'type':'type',
    }
    const possibleTypes = ["One-on-One", "In Respondent Home", "Other - Phone Interview", "Unmoderated Study", "Quantitative Study"]

    export default {
        name: 'Projects',
        components: {
            Project,
        },
        props: {
            msg: String
        },
        data() {
            return {
               searchText: '',
               filters: [],
               skippedProjects: [],
               possibleTypes,
            }
        },
        methods: {
            searchFilter(item) {
                const vm = this;
                return (
                    item.description && item.description.indexOf(vm.searchText) > 0 ||
                    item.locationFormatted && item.locationFormatted.indexOf(vm.searchText) > 0
                )
            },
            removeFilterTag(index) {
                const vm = this;
                vm.filters.splice(index, 1)
            },
            addCompensationFilter(amount) {
                const vm = this;
                vm.removeFilter(filterTypes.compensation)
                vm.filters.push(
                    new filter(
                        `Over $${amount}`,
                        (item) => item.respondentRemuneration >= amount,
                        filterTypes.compensation
                    )
                )
            },
            addLengthFilter(time) {
                const vm = this;
                vm.removeFilter(filterTypes.length)
                vm.filters.push(
                    new filter(
                        `Under ${time} minutes`,
                        (item) => time <= item.timeMinutesRequired,
                        filterTypes.length
                    )
                )
            },
            addTypeFilter(type) {
                const vm = this;
                vm.removeFilter(filterTypes.type)
                vm.filters.push(
                    new filter(
                        type,
                        (item) => type == item.kindOfResearchFormatted,
                        filterTypes.type
                    )
                )
            },
            removeFilter(type) {
                const vm = this;
                if (vm.filters.length > 0) {
                    vm.filters = vm.filters.filter(filter => filter.type != filterTypes.type)
                }
            },
            skipProject(id) {
                this.skippedProjects.push(id)
            }
        },
        computed: {
            projects() {
                const vm = this;
                let data = sampleData.projects
                if (vm.searchText) {
                    data = sampleData.projects.filter(vm.searchFilter)
                }
                vm.filters.forEach((filter) => {
                    data = data.filter(filter.filterFunction)
                })
                vm.skippedProjects.forEach((id) => {
                    data = data.filter(project => project.id != id)
                })
                console.log('skipped', this.skippedProjects)
                console.log(data)
                return data
            }
        }
    }
</script>

<style scoped>
    .dropdown-filter {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        padding: 14px;
        color: #666;
        -webkit-font-smoothing: antialiased;
        font-size: 13px;
    }
    .search-icon {
        margin-top:10px;
        margin-left:10px;
        position:absolute;
    }
    .searchInput {
        padding-left:40px;
    }
    .alert {
        color: black;
    }
    .refer_promotion {
        margin-left:5px;
    }
    .pointer {
        cursor: pointer;
    }

</style>
