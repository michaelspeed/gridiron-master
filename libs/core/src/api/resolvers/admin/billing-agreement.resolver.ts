import {Args, Context, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {BillingAgreement, BillingAgreementRequest} from '../../../entity';
import {BillingAgreementService, UserService} from '../../../service';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';

@Resolver(() => BillingAgreement)
export class BillingAgreementResolver {
    constructor(
        // @InjectQueryService(BillingAgreement) readonly service: QueryService<BillingAgreement>,
        private readonly billingAgreementService: BillingAgreementService,
        private readonly userService: UserService
    ) {
        // super(service)
    }

    @Query(() => [BillingAgreement])
    async GetBillingAgreementByVendor(
        @Context() context
    ): Promise<BillingAgreement[]> {
        const auth = context.req.headers.authorization;
        const token = auth.split(' ')[1];
        const user = await this.userService.GetCurrentUser(token)
        if (user.administrator !== null) {
            return this.billingAgreementService.findAll()
        } else {
            return this.billingAgreementService.findAgreementByVendor(user.vendor.id)
        }
    }

    @Query(() => BillingAgreement)
    async GetBillingAgreement(
        @Args({name: 'id', type: () => ID, nullable: false}) id: string,
    ): Promise<BillingAgreement> {
        return this.billingAgreementService.findAgreementById(id)
    }

    @Mutation(() => BillingAgreementRequest)
    async CreateBillingRequest(
        @Args('id') id: string,
        @Args('value') value: string,
    ): Promise<BillingAgreementRequest> {
        return this.billingAgreementService.createBillingAgreementRequest(id, value)
    }

    @Query(() => [BillingAgreementRequest])
    async GetBillingRequestForAgreement(
        @Args('id') id: string,
    ): Promise<BillingAgreementRequest[]> {
        return this.billingAgreementService.findBillingRequestForBillingAgreement(id)
    }

    @Mutation(() => BillingAgreementRequest)
    async UpdateBillingRequest(
        @Args('id') id: string,
        @Args('value') value: string,
        @Context() context,
    ): Promise<BillingAgreementRequest> {
        return new Promise(async (resolve, reject) => {
            const auth = context.req.headers.authorization;
            const token = auth.split(' ')[1];
            const user = await this.userService.GetCurrentUser(token)
            if (user.administrator !== null) {
                this.billingAgreementService.updateBillingAgreementRequest(id, value)
                    .then(value1 => resolve(value1)).catch(error => reject(error))
            } else {
                reject('Not Authorized')
            }
        })
    }
}
