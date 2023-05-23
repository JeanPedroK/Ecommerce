<template>
    <div class="user-menu btn-group">
        <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret class="clientname">
            <template #button-content class="h5 mb-2">
                <b-icon v-if="client.codigo == 0" icon="person-fill" shift-v="-6" blur></b-icon>
                <span class="client-name" v-if="client.codigo > 0">{{ client.nome.split(' ')[0].toUpperCase() }}</span>
            </template>
            <b-dropdown-item v-if="client.codigo == 0" to="/login">Login</b-dropdown-item>
            <b-dropdown-item v-if="client.codigo > 0" to="/minha-conta">Minha conta</b-dropdown-item>
            <b-dropdown-item to="/Carrinho">Meu carrinho</b-dropdown-item>
            <b-dropdown-divider v-if="client.codigo > 0"></b-dropdown-divider>
            <b-dropdown-item v-if="client.codigo > 0" @click="doLogout()">Sair</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: "UserMenu",
    computed: {
        ...mapGetters({
            client: 'client/getClient'
        }),
    },
    methods: {
        ...mapMutations({
            doLogout: 'client/logout'
        }),
    }
};
</script>

<style lang="scss" scoped>
.user-menu {

   
    .client-name {
        color: var(--primary-color);
        margin-left: -20px;
        font-size: medium;
        margin-right: 6px;
        width: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .clientname {
        left: 3px;
        top: 11px;
    }


    &.btn-group {
        margin-left: -1%;


        button {
            padding: 18px;

        }

        .dropdown-toggle {
            svg {
                font-size: 2.3rem !important;
                color: var(--primary-color);
                cursor: pointer;
                position: absolute;
                left: -28px;
            }

            svg:hover {
                color: var(--prodv-color);
            }
        }

        @media screen and (min-width: 815px) {
            .dropdown-toggle {
                svg {
                    top: -5px;
                }
            }
        }

        @media screen and (max-width: 415px) {

            &.navbar.navbar-dark.bg-dark.color-primary {
                position: fixed;
                width: 100%;
                z-index: 10;
                margin-top: -5px;
                padding-bottom: 0px;
                padding-top: 5px;
            }

            .clientname {
                left: 6px;
                top: 4px;
            }

            .dropdown-toggle {
                svg {
                    font-size: 1.8rem !important;
                    color: var(--primary-color);
                    cursor: pointer;
                    position: absolute;
                    top: -24px;
                    left: -7px;
                }

                svg:hover {
                    color: var(--prodv-color);
                }
            }

            .h6 {
                font-size: 1.3rem;
            }

            :root {
                --icon-size: 1.5rem;
            }

            #top-bar #cardp {
                margin-left: -5px;
                top: 10px;
                position: absolute;
                background-color: white;
                color: red;
                padding: 3px;
            }

            .navbar-dark .navbar-text {
                margin-right: 15px;
            }

            #contact-box-icons {
                margin-left: 0px;
                margin-top: -10px;
            }

            .form-input {
                width: 20%;
            }

            .tool-box {
                margin-right: -15px;
            }

            .tool-box .navbar-text .d-block .d-sm-none {
                margin-top: -6px;
            }
        }
    }
}
</style>

<style lang="scss" >
.user-menu {
    .btn:focus {
        box-shadow: none !important;
    }


    &.btn-group {
        .dropdown-menu {
            position: absolute;
            top: 46px !important;
            left: -145px !important;
            transform: unset !important;

            .dropdown-item {
                &:hover {
                    background-color: var(--primary-color);
                }
            }
        }

    }


    @media screen and (max-width: 414px) {
        &.btn-group {
            .dropdown-menu {
                position: absolute;
                top: 33px !important;
                left: -123px !important;
                transform: unset !important;
                background-color: #343a40 !important;
            }

            button {
                &:hover {
                    border-color: transparent !important;
                    background-color: transparent !important;
                }
            }
        }
    }
}
</style>
