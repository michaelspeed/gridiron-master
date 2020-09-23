import {EmailEventListener} from "./email-listners";
import {
    AccountRegisterEvents,
    OrderLineEvents,
    OrderLineProcessedEvent,
    OrderStageType,
    PasswordResetEvents
} from "@gridiron/core";
import {EmailEventHandler} from "./email-handler";

export const orderConfirmationHandler = new EmailEventListener('order-confirmation')
    .on(OrderLineProcessedEvent)
    .setRecipient(event => event.user.email)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Order confirmation for #{{ order.id }}`)
    .setTemplateVars(event => ({ order: event.order, user: event.user }))

export const emailVerificationHandler = new EmailEventListener('email-verification')
    .on(AccountRegisterEvents)
    .setRecipient(event => event.user.email)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Please verify your email address`)
    .setTemplateVars(event => ({ user: event.user }))

export const passwordResetHandler = new EmailEventListener('password-reset')
    .on(PasswordResetEvents)
    .setRecipient(event => event.user.email)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Forgotten password reset`)
    .setTemplateVars(event => ({ user: event.user, resetcode: event.resetcode }))


export const defaultEmailHandlers: Array<EmailEventHandler<any, any>> = [
    orderConfirmationHandler,
    emailVerificationHandler,
    passwordResetHandler
];
