<template>
    <div class="filterModule">
        <el-form :inline="true">
            <slot></slot>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" class="button-list">
            <el-form-item v-for="item in otherButtons" key="item.label">
                <template v-if="item.url">
                    <el-button :icon="item.icon" type="primary"
                    @click="jumpUrl(item.url)">{{item.label}}</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="item.event">{{item.label}}
                    </el-button>
                </template>
            </el-form-item>
        </el-form>
        <el-table border :data="tableData">
            <template v-for="item in tableList">
                <template v-if="!!item.url">
                    <el-table-column :label="item.label" key="url">
                        <template scope="scope">
                            <a :href="item.url">{{getScopeData(scope,item)}}</a>
                        </template>
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column :label="item.label" key="noneUrl">
                        <template scope="scope">
                            {{getScopeData(scope,item)}}
                        </template>
                    </el-table-column>
                </template>
            </template>
            <el-table-column label="操作" width="200px">
                <template scope="scope">
                    <template v-for="item in buttonList">
                        <template v-if="isShow(item, scope.row)">
                            <template v-if="item.type == 1 || item.type == 2 || item.type == 6">
                                <el-button type="primary" size="small" @click="handleOpen(scope.$index, scope.row, item)">{{getButtonText(item.type)}}</el-button>
                            </template>
                            <template v-else-if="item.type == 3 || item.type == 4 || item.type == 5">
                                <el-button type="primary" size="small" @click="handleEnsure(scope.$index, scope.row, item)">{{getButtonText(item.type)}}</el-button>
                            </template>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
            :current-page="curPage"
            :page-size="perPage"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog
            title="提示"
            :visible.sync="dialogInfo.visible"
            show-close="false"
            size="tiny">
            <span>{{dialogInfo.text}}</span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogInfo.visible = false">取 消</el-button> -->
                <el-button type="primary" @click="handleOperate(dialogInfo)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import tableData from './data.js'
    import nestRender from './nestRender'
    export default {
        name: 'filterModule',
        props: {
            tableData: {
                type: Array,
                default() {
                    return tableData.data.item
                }
            },
            tableList: {
                type: Array,
                default() {
                    return [{
                        label: '默认',
                        prop: ''
                    }]
                }
            },
            url: {
                type: String,
                default() {
                    return ''
                }
            },
            curPage: {
                type: Number,
                default: 0
            },
            perPage: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                default: 10
            },
            buttonList: {
                type: Array,
                default() {
                    return [{
                        label: '默认',
                        prop: ''
                    }]
                }
            },
            otherButtons: {
                type: Array,
                default() {
                    return [{
                        label: '默认',
                        clickEvent: '',
                        icons: '',
                        url: ''
                    }]
                }
            },
            nestedData:{
                type: Array,
                default() {
                    return [{
                        prop: '',
                        label: '默认'
                    }]
                }
            },
            formData:{
                type: Array,
                default() {
                    return []
                }
            },
            dialogInfo: {
                type: Object,
                default() {
                    return {
                        text: '',
                        data: {},
                        visible: false,
                        url: ''
                    }
                }
            },
            searchHandler: {
                type: Function
            },
            ensureHandle: {
                type: Function
            }
        },
        data(){
            return {}
        },
        methods: {
            // changePage: function(val) {
            //     axios.get(this.url + '&curpage=' + val + '&perpage=' + this.perPage)
            //     .then(response => {
            //         this.tableData = response.data.item;
            //         this.curPage = Number(response.data.curpage);
            //         this.perPage = Number(response.data.perpage);
            //         this.total = Number(response.data.total);
            //     })
            //     .catch(error => {
            //         this.tableData = tableData.data.item;
            //         this.curPage = Number(tableData.data.curpage);
            //         this.perPage = Number(tableData.data.perpage);
            //         this.total = Number(tableData.data.total);
            //     });
            // },
            handleSizeChange: function() {
                
            },
            handleCurrentChange: function() {

            },
            getScopeData: function(scope, item) {
                let data = scope.row;
                return eval(item.prop)
            },
            handleOpen(index, row, item) {
                let data = row;
                window.open(eval(item.url))
            },
            handleEnsure(index, row, item) {
                if(this.ensureHandle) {
                    this.ensureHandle(index,row,item)
                }
            },
            handleOperate: function() {
                
            },
            getButtonText(type){
                switch (type) {
                    case 1:
                        return '查看'
                        break;
                    case 2:
                        return '编辑'
                        break;
                    case 3:
                        return '上线'
                        break;
                    case 4:
                        return '下线'
                        break;
                    case 5:
                        return '删除'
                        break;
                    case 6:
                        return '日志'
                        break;
                    default:
                        return '查看'
                }
            },
            isShow(item, data) {
                if(item.condition == '') {
                    return true;
                } else {
                    return eval(eval(item.condition))
                }
            },
            jumpUrl(url) {
                window.open(url)
            },
            handleSubmit() {
                if(this.searchHandler) {
                    this.searchHandler();
                }
            }
        },
        watch: {
            url: function(val) {
                axios.get(this.url)
                .then(response => {
                    this.tableData = response.data.item
                    this.curPage = Number(response.data.page_no) || 1
                    this.perPage = Number(response.data.perpage) || 10
                    this.total = Number(response.data.total_num) || Number(response.data.total) || 0
                })
                .catch(error => {
                    this.tableData = tableData.data.item
                    this.curPage = Number(tableData.data.curpage)
                    this.perPage = Number(tableData.data.perpage)
                    this.total = Number(tableData.data.total)
                });
            },
            nestedData: function(val){
                window.ref = this.$refs
            }
        },
        nest: true,
        nestRender,
        components: {}
    }
</script>

<style scoped>

    .el-form {
        padding: 15px;
        background: #fff;
        border: solid 1px #eaeaea;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .el-table{
        margin-bottom: 20px;
    }

    .button-list .el-form-item{
        margin-bottom: 0;
    }
</style>
