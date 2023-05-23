<template>
    <nav class="navbar navbar-dark bg-dark justify-content-center menu-bar">
        <div v-if="menus.length" class="col-sm-6 col-md-10 col-lg-8 navbar menu-bar text-center">
            <client-only v-for="(m, i) in menus" :key="i">
                <div class="dropdown-meu-bar col text-center">
                    <div @mouseover="onOver" @mouseleave="onLeave" class="text-center">
                        <b-dropdown :id="'dropdown-' + i" :text="m.titulo" ref="dropdown" class="m-md-2"
                            variant="outline">
                            <client-only v-for="(subs, si) in m.subs" :key="si">
                                <b-dropdown-item :to="'/categoria/' + subs.subCod" class="text-dark">
                                    <nuxt-link :to="'/categoria/' + subs.subCod" class="text-dark">
                                        {{ subs.titulo }}
                                    </nuxt-link>
                                </b-dropdown-item>
                            </client-only>
                        </b-dropdown>
                    </div>
                </div>
            </client-only>
        </div>
    </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "MenuBar",
    data() {
        return {
            menus: []
        }
    },
    async mounted() {
        this.menus = await this.getMenus();
    },
    methods: {
        ...mapActions({
            getMenus: 'menus/getMenus'
        }),
        onOver($event) {
            let id;

            if ($event?.relatedTarget?.id) {
                id = $event.relatedTarget.id.split('__')[0];
            } else {
                id = $event.relatedTarget?.children[0]?.children[0]?.id || '';
            }
            if (id != '') {
                id = id.split('__')[0];

                const obj = document.querySelector(`#${id}`).__vue__;

                if (obj) {
                    obj.visible = true
                }
            }
        },
        onLeave($event) {
            let id;

            if ($event?.relatedTarget?.id) {
                id = $event.relatedTarget.id.split('__')[0];
            } else {

                id = $event.relatedTarget?.children[0]?.children[0]?.id || '';
            }

            if (id != '') {
                id = id.split('__')[0];

                const obj = document.querySelector(`#${id}`).__vue__;

                if (obj) {
                    obj.visible = false
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.menu-bar {

    &.navbar {
        padding: 0px !important;
    }

    @media screen and (max-width: 414px) {
        &.menu-bar {
            // padding-right: 10px !important;
            // margin-right: -8px;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 1rem;
        }
    }
}
</style>
