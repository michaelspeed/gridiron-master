import {Args, Float, ID, Mutation, Resolver} from '@nestjs/graphql';
import {ProductVariantPrice} from '../../../entity';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';
import {ProductVariantsService} from '../../../service/services/admin/product-variants.service';

@Resolver(of => ProductVariantPrice)
export class ProductVariantPriceResolver extends CRUDResolver(ProductVariantPrice){
    constructor(
        @InjectQueryService(ProductVariantPrice) readonly service: QueryService<ProductVariantPrice>,
        private readonly productVariantsService: ProductVariantsService
    ) {
        super(service);
    }

    @Mutation(() => ProductVariantPrice)
    async CreateVariantPrice(
        @Args('variantId', {type: () => ID}) variantId: string,
        @Args('price', {type: () => Float}) price: number,
        @Args('taxId', {type: () => ID}) taxId: string,
        @Args('taxIncluded', {type: () => Boolean}) included: boolean,
    ): Promise<ProductVariantPrice> {
        return this.productVariantsService.createProductVariantPrice(variantId, price, taxId, included)
    }

    @Mutation(() => ProductVariantPrice)
    async UpdateVariantPrice(
        @Args('variantPriceId', {type: () => ID}) variantPriceId: string,
        @Args('price', {type: () => Float}) price: number,
        @Args('taxId', {type: () => ID}) taxId: string,
        @Args('taxIncluded', {type: () => Boolean}) included: boolean,
    ): Promise<ProductVariantPrice> {
        return this.productVariantsService.updateProductVariantPrice(variantPriceId, price, taxId, included)
    }
}
