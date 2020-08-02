import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {User} from '../../../entity';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectConnection() private connection: Connection,
        private readonly jwtService: JwtService
    ) {}

    private async DecryptToken(token: string): Promise<{userId: string}> {
        return new Promise(async (resolve, reject) => {
            const decoded: any = await this.jwtService.decode(token)
            resolve(decoded)
        })
    }

    GetCurrentUser(token: string): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            const decoded = await this.DecryptToken(token)
            const user = await this.connection.getRepository(User).findOne({where:{id: decoded.userId}, relations: ['administrator', 'vendor']})
            resolve(user)
        })
    }
}
