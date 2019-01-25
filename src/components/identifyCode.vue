<template>
    <div>
        <el-button @click.prevent="run" :disabled="disabled || time > 0" class="sub_btn">{{ text }}</el-button>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
               time: 0,
               disabled:false,
            }
        },
        props: {
            second: {
                type: Number,
                default: 60
            },
            // disabled: {
            //     type: Boolean,
            //     default: false
            // }
        },
        methods: {
            run: function () {
                this.$emit('run');
            },
            start: function(){
                this.time = this.second;
                this.timer();
            },
            stop: function(){
                this.time = 0;
                this.disabled = false;
            },
            setDisabled: function(val){
                this.disabled = val;
            },
            timer: function () {
                if (this.time > 0) {
                    this.time--;
                    setTimeout(this.timer, 1000);
                }else{
                    this.disabled = false;
                }
            }
        },
        computed: {
            text: function () {
                return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
            }
        }
    }
</script>

<style scoped lang="scss" scoped>
    .sub_btn {
        background-color: #d6d6d6;
        border: 1px solid #ccc;
        color: #fff;
        border-radius: 2px;
        font-size: 14px;
        width: 95px;
        height: 34px;
        padding: 0;
    }
</style>