<template>
    <view>

        <view>
            日期：{{currentDate}}
        </view>

        <!-- 页面中滚动的选择器 -->
        <picker-view @change="bindChange" class="picker-view">
            <picker-view-column>
                <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
            </picker-view-column>
        </picker-view>

    </view>
</template>

<script>
    export default {
        data: function() {
            return {
                years: ['2000', '2001', '2002', '2003', '2004'],
                months: ['1', '2', '3', '4', '5', '6'],
                days: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                currentDate: ""
            }
        },
        methods: {
            bindChange: function(e) {
                let val = e.detail.value;
                this.currentDate = `${this.years[val[0]]}年${this.months[val[1]]}月${this.days[val[2]]}日`;
            }
        }
    }
</script>

<style>
    .picker-view {

        /*高一定要设置*/
        height: 600rpx;

        text-align: center;
    }
</style>
