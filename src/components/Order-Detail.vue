<template>
    <el-dialog title="订单详情" v-model="dialogVisible" center>
        <ul>
            <li class="list">
                商品名称：{{ order.productName }}
            </li>
            <li class="list">
                订单创建时间：{{ order.createTime }}
            </li>
            <li class="list">
                订单关闭时间：{{ order.closeTime }}
            </li>
            <li class="list">
                <div class="flex-end">
                    价格：{{ order.price }}
                </div>
            </li>
            <li class="list">
                <div class="text-right">
                    <el-button @click="payOrder(order.id)" type="primary">
                        立即支付
                    </el-button>
                    <el-button @click="cancelOrder(order.id)" type="danger">
                        取消订单
                    </el-button>
                </div>
            </li>
        </ul>
    </el-dialog>
    <div ref="payment-form"></div>
</template>

<script>
import {createOrder, payOrder, updateOrder} from '/@/utils/api'

export default {
    name: "Order-Detail",
    props: [
        'productId'
    ],
    data() {
        return {
            order: {},
            dialogVisible: false
        }
    },
    methods: {
        createOrder(productId) {
            createOrder({productId}).then(result => {
                if (result.code === '0000') {
                    this.order = result.data
                    this.dialogVisible = true
                }
            })
        },
        payOrder() {
            payOrder({orderId: this.order.id}).then(result => {
                if (result.code === '0000') {
                    this.$refs['payment-form'].innerHTML = result.data
                    document.forms[0].submit()
                    this.dialogVisible = false
                }
            })
        },
        cancelOrder() {
            updateOrder({id: this.order.id, status: 2}).then(result => {
                if (result.code === '0000') {
                    this.dialogVisible = false
                }
            })
        }
    }
}
</script>

<style>
</style>