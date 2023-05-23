<template>
    <div class="nuxt-error text-center">
        <div id="sky" class="fixed z-50 top-0 h-screen w-screen flex justify-center items-center">
            <div class="hidden flex-col items-center justify-center bg-gray-900 text-white w-screen h-screen md:flex">
                <div id="stars" class="self-start z-30"></div>
                <div id="stars2" class="self-start z-40"></div>
                <div id="stars3" class="self-start z-20"></div>
                <h2 class="font-mono z-50 text-6xl" style="color:black" >
                    {{ error.statusCode }} - Algo deu errado, tente novamente mais tarde
                </h2>
                <nuxt-link to="/"
                    class="space cursor-pointer z-50 flex-col justify-center items-center flex pt-4 px-8 rounded-md text-purple-800 transform duration-150 ease-in hover:text-white hover:scale-105">
                    <img src="/ezgif.com-gif-maker.webp"
                        alt="" style="width: 250px;height: 250px;"/>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'nuxt-error',
    layout: 'default',
    props: {
        error: {
            type: Object,
            default: () => { },
        },
    },
    computed: {
        errorPage() {
            if (this.error.statusCode === 404) {
                return error404;
            }
            return error500;
        },
    },
}
</script>

<style scoped>
.nuxt-error{
    background-color: white;
}
</style>