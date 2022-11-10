import orderModel,{Order} from "../models/order.model";
import db from "../providers/database.provider";

const orderEntity=new orderModel;
const getUpdatedOrder=async(newOrder:Order):Promise<Order>=>{
    const dbOrder:Order=await orderEntity.getById(newOrder.id as number);
    if(newOrder.status!=null)dbOrder.status=newOrder.status;
    if(newOrder.user_id!=null)dbOrder.user_id=newOrder.user_id;

    return dbOrder;
}
export default getUpdatedOrder;