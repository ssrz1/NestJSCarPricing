import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    //Whats going on constructor defination.
    //Our Argument name is Repo 
    //Private for shorthand otherwise we have to use -> repo: Repository<User>(Outside of Constructor) and inside of Constructor this.repo = repo;
    //type annotation (what type it is ) Type is Reposotry and we applied a Generic type of User
    //IF THIS SYNTAX IS CONFUSING JUST MEMORIZE IT AND REPEAT WHENEVER WE NEED TYPEORM REPO
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    create(email: string, password: string){
        const user =this.repo.create({email,password})

        //we can also directly passed of an object to the save()
        //but it will bypass our entity that we have created this could leads to a PROBLEM and NOT RECOMMENDED
        //also hooks such as (beforeInsert, AfterInsert, AfterUpdate this will not be run/executed which will be very though for us to Debug)
        return this.repo.save(user)
    }
    
    async findOne(id: number) {
        return this.repo.findOne({ where: { id: id as any } });
    }
    
   find(email: string) {

         return this.repo.find({ where: { email: email as any } });
    }
    

    //Watch lecture 56 'Updating Data' from Stephen Grinder course for revesion.
   async update(id: number, attrs: Partial<User>){
         const user = await this.findOne(id);

         if(!user){
            throw  new Error('user not found')
         }
         Object.assign(user, attrs)
         return this.repo.save(user)

    }

   async  remove(id: number){
        const user = await this.findOne(id);
        if(!user){
            throw  new Error('user not found')
         }
         Object.assign(user)
         return this.repo.remove(user)
    }
    
}
