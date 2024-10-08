import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Tom King",
            "email": "tomking@gmail.com",
            "role": "admin"
        },
        {
            "id": 2,
            "name": "Sandra Manya",
            "email": "sandra@gmail.com",
            "role": "engineer"
        },
        {
            "id": 3,
            "name": "Jane Doe",
            "email": "janedoe@gmail.com",
            "role": "intern"
        },
        {
            "id": 4,
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "role": "intern"
        },
        {
            "id": 5,
            "name": "Matt Smith",
            "email": "mattsmith@gmail.com",
            "role": "engineer"
        },
    ]

    findAll(role?: 'intern' | 'engineer' | 'admin'){
        if(role){
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.filter(user => user.id === id)
        return user
    }

    create(user: {name: string, email: string, role: 'intern' | 'engineer' | 'admin'}){
        const usersByHighestId = [...this.users].sort((a,b)=> b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: {name?: string, email?: string, role?: 'intern' | 'engineer' | 'admin'}){
        this.users = this.users.map(user=> {
            if(user.id === id){
                return {...user, ...updatedUser}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user => user.id !== id)

        return removedUser
    }
}
