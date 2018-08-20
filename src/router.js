import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/Login";
import Home from "./components/Home/Home";
import Index from "./views/Index/Index";
import Classify from "./views/Classify/Classify";
import GoodsList from "./views/Classify/GoodsList";
import Cart from "./views/Cart/Cart";
import Project from "./views/Project/Project";
import ProjectList from "./views/Project/ProjectList";
import Option from "./views/Project/Option";
import Material from "./views/Project/Option/Material";
import ConPrice from "./views/Project/Option/ConPrice";
import ContractInfo from "./views/Project/Option/ContractInfo";
import ArrivalInformation from "./views/Project/Option/ArrivalInformation";
import InfoItem from "./views/Project/Option/InfoItem";
import PaymentLabel from "./views/Project/Option/PaymentLabel";
import PriceDetails from "./views/Project/Option/Details/PriceDetails";
import DeliveryDetails from "./views/Project/Option/Details/DeliveryDetails";
import ContractDetails from "./views/Project/Option/Details/ContractDetails";
import MsgList from "./views/Message/MsgList";
import Message from "./views/Message/Message";
import Apply from "./views/Apply/Apply";
import Contact from "./views/Contact/Contact";
import Count from "./views/Count/Count";
import Users from "./views/Users/Users";
import UsersPwd from "./views/Users/UsersPwd";
import UsersInfo from "./views/Users/UsersInfo";
import Supplier from "./views/Supplier/Supplier";
import SupplieType from "./views/Supplier/SupplieType";
import TaskList from "./views/TaskWait/TaskList";
import TaskWait from "./views/TaskWait/TaskWait";
import TaskYCFrom from "./views/TaskWait/TaskYCFrom";
import TaskZFFrom from "./views/TaskWait/TaskZFFrom";
import TaskKKFrom from "./views/TaskWait/TaskKKFrom";
import TaskPKFrom from "./views/TaskWait/TaskPKFrom";
import TaskJDFrom from "./views/TaskWait/TaskJDFrom";
import TaskDJFrom from "./views/TaskWait/TaskDJFrom";
import Quotation from "./views/Transaction/Quotation";
import TranContract from "./views/Transaction/TranContract";
import ShippingInfo from "./views/Transaction/ShippingInfo";
import TranPayment from "./views/Transaction/TranPayment";
import Tranrial from "./views/Transaction/Tranrial";
import Inventory from "./views/Transaction/Inventory";
import Customerlist from "./views/CustomerList/CustomerList";
import InquiryDetails from "./views/Project/Option/Details/InquiryDetails";
Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      redirect: "/index",
      component: Home,
      children: [
        {
          path: "/index",
          name: "index",
          component: Index,
          meta: {
            title: "首页" // 页面标题
          }
        },
        {
          path: "/classify",
          name: "classify",
          component: Classify,
          meta: {
            title: "物资分类" // 页面标题
          }
        },
        {
          path: "/goodsList",
          name: "goodsList",
          component: GoodsList,
          meta: {
            title: "物资列表" // 页面标题
          }
        },
        {
          path: "/cart",
          name: "cart",
          component: Cart,
          meta: {
            title: "购物车" // 页面标题
          }
        },
        {
          path: "/taskWait",
          name: "taskWait",
          component: TaskWait,
          meta: {
            title: "待办列表" // 页面标题
          }
        },
        {
          path: "/taskList",
          name: "taskList",
          component: TaskList,
          meta: {
            title: "待办事宜" // 页面标题
          }
        },
        {
          path: "/projectList",
          name: "projectList",
          component: ProjectList,
          meta: {
            title: "选择项目" // 页面标题
          }
        },
        {
          path: "/project",
          name: "project",
          component: Project,
          meta: {
            title: "合作项目" // 页面标题
          }
        },
        {
          path: "/project/option",
          name: "option",
          component: Option,
          meta: {
            title: "项目功能" // 页面标题
          }
        },
        {
          path: "/project/option/material",
          name: "material",
          component: Material,
          meta: {
            title: "项目详情" // 页面标题
          }
        },
        {
          path: "/taskWait/taskYCFrom",
          name: "taskYCFrom",
          component: TaskYCFrom,
          meta: {
            title: "预存单审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskZFFrom",
          name: "taskZFFrom",
          component: TaskZFFrom,
          meta: {
            title: "支付申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskKKFrom",
          name: "taskKKFrom",
          component: TaskKKFrom,
          meta: {
            title: "扣款申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskJDFrom",
          name: "taskJDFrom",
          component: TaskJDFrom,
          meta: {
            title: "解冻申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskPKFrom",
          name: "taskPKFrom",
          component: TaskPKFrom,
          meta: {
            title: "批款申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskDJFrom",
          name: "taskDJFrom",
          component: TaskDJFrom,
          meta: {
            title: "冻结申请审核" // 页面标题
          }
        },
        {
          path: "/msgList",
          name: "msgList",
          component: MsgList,
          meta: {
            title: "消息列表" // 页面标题
          }
        },
        {
          path: "/message",
          name: "message",
          component: Message,
          meta: {
            title: "我的消息" // 页面标题
          }
        },
        {
          path: "/apply",
          name: "apply",
          component: Apply,
          meta: {
            title: "应用" // 页面标题
          }
        },
        {
          path: "/contact",
          name: "contact",
          component: Contact,
          meta: {
            title: "通讯录" // 页面标题
          }
        },
        {
          path: "/count",
          name: "count",
          component: Count,
          meta: {
            title: "数据统计" // 页面标题
          }
        },
        {
          path: "/users",
          name: "users",
          component: Users,
          meta: {
            title: "用户中心" // 页面标题
          }
        },
        {
          path: "/users/usersPwd",
          name: "usersPwd",
          component: UsersPwd,
          meta: {
            title: "修改密码" // 页面标题
          }
        },
        {
          path: "/users/usersInfo",
          name: "usersInfo",
          component: UsersInfo,
          meta: {
            title: "个人信息" // 页面标题
          }
        },
        {
          path: "/users/supplier",
          name: "supplier",
          component: Supplier,
          meta: {
            title: "供应商设置" // 页面标题
          }
        },
        {
          path: "/users/supplier/type",
          name: "supplierType",
          component: SupplieType,
          meta: {
            title: "供应商物资" // 页面标题
          }
        },
        {
          path: "/project/option/conprice",
          name: "conprice",
          component: ConPrice,
          meta: {
            title: "确认价格" // 页面标题
          }
        },
        {
          path: "/project/option/contractinfo",
          name: "contractinfo",
          component: ContractInfo,
          meta: {
            title: "合同信息" // 页面标题
          }
        },
        {
          path: "/project/option/arrivalinformation",
          name: "arrivalinformation",
          component: ArrivalInformation,
          meta: {
            title: "到货信息" // 页面标题
          }
        },
        {
          path: "/project/option/infoitem",
          name: "infoitem",
          component: InfoItem,
          meta: {
            title: "项目信息" //页面标题
          }
        },
        {
          path: "/project/option/details/pricedetails",
          name: "pricedetails",
          component: PriceDetails,
          meta: {
            title: "询价单编辑" //页面标题
          }
        },
        {
          path: "/project/option/details/deliverydetails",
          name: "deliverydetails",
          component: DeliveryDetails,
          meta: {
            title: "发货单编辑" //页面标题
          }
        },
        {
          path: "/project/option/details/contractdetails",
          name: "contractdetails",
          component: ContractDetails,
          meta: {
            title: "合同清单详情" //页面标题
          }
        },
        {
          path: "/project/option/paymentlabel",
          name: "paymentlabel",
          component: PaymentLabel,
          meta: {
            title: "付款信息列表" //页面标题
          }
        },
        {
          path: "/transaction/quotation",
          name: "quotation",
          component: Quotation,
          meta: {
            title: "报价单" //页面标题
          }
        },
        {
          path: "/customerlist/customerlist",
          name: "customerlist",
          component: Customerlist,
          meta: {
            title: "客户列表" //页面标题
          }
        },
        {
          path: "/transaction/trancontract",
          name: "trancontract",
          component: TranContract,
          meta: {
            title: "合同信息" //页面标题
          }
        },
        {
          path: "/transaction/shippinginfo",
          name: "shippinginfo",
          component: ShippingInfo,
          meta: {
            title: "发货信息" //页面标题
          }
        },
        {
          path: "/transaction/tranpayment",
          name: "tranpayment",
          component: TranPayment,
          meta: {
            title: "付款信息" //页面标题
          }
        },
        {
          path: "/transaction/tranrial",
          name: "tranrial",
          component: Tranrial,
          meta: {
            title: "付款信息" //页面标题
          }
        },
        {
          path: "/transaction/inventory",
          name: "inventory",
          component: Inventory,
          meta: {
            title: "清单详情" //页面标题
          }
        },
        {
          path: "/project/option/details/inquirydetails",
          name: "inquirydetails",
          component: InquiryDetails,
          meta: {
            title: "询价单明细编辑" //页面标题
          }
        },
      ]
    }
  ]
});
