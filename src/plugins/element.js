import Vue from 'vue'
import {
    Button, Form, FormItem, Input, Message, Header, Aside, Main, Container, Menu, Submenu,
    MenuItemGroup, MenuItem, Breadcrumb, BreadcrumbItem,Card,input,row,col,table,tableColumn
    ,Switch,tooltip,pagination,dialog,MessageBox,tag,tree,option,select,cascader,alert,tabs,
    tabPane,steps,step,checkboxGroup,checkbox,upload
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(input)
Vue.use(row)
Vue.use(col)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(Switch)
Vue.use(tooltip)
Vue.use(pagination)
Vue.use(dialog)
Vue.use(tag)
Vue.use(tree)
Vue.use(option)
Vue.use(select)
Vue.use(cascader)
Vue.use(alert)
Vue.use(tabs)
Vue.use(tabPane)
Vue.use(steps)
Vue.use(step)
Vue.use(checkboxGroup)
Vue.use(checkbox)
Vue.use(upload)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
