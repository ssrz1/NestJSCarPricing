import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    email: String;

    @Column()
    @Exclude()
    password: String;

    @AfterInsert()
    logInsert(){
        console.log("User inserted with ID:", this.id );
    }

    @AfterUpdate()
     logUpdate(){
        console.log("User update with ID:",this.id );
    }

    @AfterRemove()
    logRemove(){
        console.log("User removed with ID:", this.id );
    }
    
}
