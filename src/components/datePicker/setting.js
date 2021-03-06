import index from './index'
index.props['settingDefinition'] = {
    setting: {
        dateFormat: {
            type: 'el-input',
            label: '格式化',
            require: true,
            componentData: {
                value:'',
                template: '%i',
                placeholder: '年yyyy，月MM，日dd，以-分隔'
            },
        },
        placeholder: {
            type: 'el-input',
            label: 'placeholder',
            require: true,
            componentData: {
                value:''
            },
        },
        detail: {
            type: 'el-input',
            label: '详情信息',
            require: true,
            componentData: {
                value:''
            },
        },
        dateRef: {
            type: 'el-input',
            label: '绑定字段',
            require: true,
            componentData: {
                value:''
            },
        }
    },
    computed: {
        submitData: function () {
            return {
                dateFormat: this.dateFormat.value,
                placeholder: this.placeholder.value,
                detail: this.detail.value,
                dateRef: this.dateRef.value,
                ref: this.ref
            }
        }
    },
    methods:{
        backFill:function (submitData) {
            this.dateFormat.value = submitData.dateFormat
            this.placeholder.value = submitData.placeholder
            this.detail.value = submitData.detail
            this.dateRef.value = submitData.dateRef
            this.ref = submitData.ref
        }
    }
}
export default index
