import "reflect-metadata"
import { Blog } from "src/entity/blog.entity"
import { Contact } from "src/entity/contact.entity"
import { Portfolio } from "src/entity/portfolio.entity"
import { Setting } from "src/entity/setting.entity"
import { User } from "src/entity/user.entity"
import { DataSource } from "typeorm"


const AppDataSource = new DataSource({
    type:"mysql",
    host: "localhost",
    port: 3306,
    username: "administrator",
    password: "123456",
    database: "adminPanel",
    entities: [User,Setting,Contact,Portfolio,Blog],
    synchronize: true,
    logging: true
})


export default AppDataSource