import Vue from 'vue'
import {
    Button, Form, FormItem, Input, Message, Header, Aside, Main, Container, Menu, Submenu,
    MenuItemGroup, MenuItem, Breadcrumb, BreadcrumbItem,Card,input,row,col,table,tableColumn
    ,Switch,tooltip,pagination,dialog,MessageBox 
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

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
