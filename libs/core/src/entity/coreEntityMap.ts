import {Address} from './address/address.entity';
import {AssetsFolder} from './asset/assets-folder.entity';
import {Administrator} from './administrator/administrator.entity';
import {Collection} from './collection/collection.entity';
import {Country} from './country/country.entity';
import {Channel} from './channel/channel.entity';
import {Asset} from './asset/asset.entity';
import {CollectionAsset} from './collection/collection-asset.entity';
import {Customer} from './customer/customer.entity';
import {CustomerGroup} from './customer-group/customer-group.entity';
import {Facet} from './facet/facet.entity';
import {FacetValue} from './facet-value/facet-value.entity';
import {Order} from './order/order.entity';
import {Product} from './product/product.entity';
import {GlobalSettings} from './global-settings/global-settings.entity';
import {Vendor} from './vendor/vendor.entity';
import {Fulfillment} from './fulfillment/fulfillment.entity';
import {Pin} from './pin/pin.entity';
import {OrderLine} from './order-line/order-line.entity';
import {OrderItem} from './order-item/order-item.entity';
import {HistoryEntry} from './history-entry/history-entry.entity';
import {OrderHistoryEntry} from './history-entry/order-history-entry.entity';
import {VendorPin} from './vendorPin/vendorPin.entity';
import {User} from './user/user.entity';
import {TaxCategory} from './tax-category/tax-category.entity';
import {TaxRate} from './tax-rate/tax-rate.entity';
import {Zone} from './zone/zone.entity';
import {Store} from './Store/store.entity';
import {Role} from './role/role.entity';
import {Session} from './session/session.entity';
import {Seo} from './Seo/Seo.entity';
import {ProductAsset} from './product/product-asset.entity';
import {ProductVariant} from './product-variant/product-variant.entity';
import {ProductVariantAsset} from './product-variant/product-variant-asset.entity';
import {ProductOption} from './product-option/product-option.entity';
import {ProductOptionGroup} from './product-option-group/product-option-group.entity';
import {ProductVariantPrice} from './product-variant/product-variant-price.entity';
import {VendorPlans} from './plans/vendor-plans';
import {VendorLicense} from './plans/vendor-license';
import {AnonymousSession} from './session/anonymous-session.entity';
import {AuthenticatedSession} from './session/authenticated-session.entity';
import {BillingAgreement} from './billing-agreement/BillingAgreement';
import {ProductVariantSpecifications} from './product-variant/product-variant-specifications.entity';
import {Cart} from './cart/cart.entity';
import {View} from './view/view.entity';
import {BillingAgreementRequest} from './billing-agreement/BillingAgreementRequest';
import {StockKeeping} from './stock-movement/stock-keeping.entity';
import {Cancellation} from './stock-movement/cancellation.entity';
import {StockMovement} from './stock-movement/stock-movement.entity';
import {Sale} from './stock-movement/sale.entity';
import {Zip} from './Zip/zip.entity';
import {Menu} from './menu/menu.entity';

export const coreEntityMap = {
    Address,
    Administrator,
    Asset,
    AssetsFolder,
    BillingAgreement,
    BillingAgreementRequest,
    Seo,
    Cart,
    Channel,
    Country,
    Collection,
    CollectionAsset,
    Customer,
    CustomerGroup,
    Cancellation,
    Facet,
    FacetValue,
    Fulfillment,
    GlobalSettings,
    HistoryEntry,
    OrderHistoryEntry,
    Order,
    OrderItem,
    OrderLine,
    Pin,
    Product,
    ProductOption,
    ProductOptionGroup,
    ProductAsset,
    ProductVariant,
    ProductVariantPrice,
    ProductVariantAsset,
    ProductVariantSpecifications,
    User,
    Vendor,
    VendorPin,
    VendorPlans,
    VendorLicense,
    TaxCategory,
    TaxRate,
    Zone,
    Sale,
    Store,
    Session,
    StockKeeping,
    StockMovement,
    AuthenticatedSession,
    AnonymousSession,
    Role,
    View,
    Zip,
    Menu
}
