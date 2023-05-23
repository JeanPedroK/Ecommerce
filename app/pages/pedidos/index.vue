<template>
    <div class="bgList">
        <div class="container pedidos">
            <div class="row md-3 p-3 mr-0">
                <div class="card-roud shadow col-12 p-3">
                    <span class="text-secondary">
                        <b-icon icon="caret-right-fill"></b-icon> PEDIDOS
                    </span>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
.pedidos {
    .card.shadow {
        input {
            outline: none;
            border: none;

            &::-webkit-input-placeholder {
                color: #acacac;

            }

            &:-moz-placeholder {
                color: #acacac;

            }

            &::-moz-placeholder {
                color: #acacac;

            }

            &:-ms-input-placeholder {
                color: #acacac;

            }
        }

    }

    .text-secondary {
        color: #6c757d !important;
    }

    .card-roud {
        background-color: #fff;
        border-radius: 5px;
    }
}
</style>