<template>
    <div class="toast-box">
        <div 
            class="alert" 
            :class="`alert-${type}`"
            role="alert"
            >
            {{ message }}
        </div>
        <div 
            class="alert" 
            :class="`alert-${type}`"
            role="alert"
            >
            {{ message }}
        </div>
        <div 
            class="alert" 
            :class="`alert-${type}`"
            role="alert"
            >
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'success'
        }
    }

}
</script>

<style>
.toast-box{
    position: fixed;
    top: 10px;
    right: 10px;
}

</style>