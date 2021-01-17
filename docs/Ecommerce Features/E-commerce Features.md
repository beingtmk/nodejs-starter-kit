# E-commerce Features

In this section, you'll learn about all the ecommerce feature this starter kit comes with and what you can do with them.

1. [Listing](#listing)
2. [Order](#order)
3. [Category](#category)
4. [Review](#review)
5. [Discount](#discount)
6. [Dynamic Carousel](#dynamic-carousel)
7. [Setting](#setting)

## Listing

This is the module that stores all the details surrounding the product. You can add listing thorough the listing admin panel's add btn. Which will open a multi-step form for adding the correspong details about the product, this modules provide various field through which you add the data. You can upload multiple images although you cannot upload videos itself you will have to upload it on someother platform and add the url directing towards that video. (Althoug we recommed using Youtube for that purpose since this startkit is best compatible with it.)

## Order

This is the module by which you can add the flow for purchasing the listing. You can view all the order placed to the platform under the order admin panel with various states such as:
Initiated -> The order has been placed and paid for.
Dispatched -> The order has been confirmed and sent for delivery. When the order reaches this state you can send a custom mail to customer through the orders admin panel.
Completed -> The order has been placed, confirmed and delivered.
Cancelled -> The order has been rejected due to some problem from the service provider.

## Category

This is the module that segregates all the listing. You can create a category through the category admin panel. You may add infinite sub category and infinite levels of sub categories. Just keep in mind that the sub category are linked to the parent category through the parent categories id, so be sure to select them whenever necessary

## Review

This is the module that allows the listing to be reviewed by the user it has been purchased by. A user has to by the product to be able to review it. Only the admin can review any product without ordering it.

## Discount

For a listing to have discounts you need to add this module. Discount can be added through the discount admin panel or listing admin panel. Discount may or may not have expiry date. By setting an end date for the discount it will auto update the price of the listing already added to cart while the discount was active. Once the discount has ended the listing cannot be bought at the discount price even though it was added to cart during discount active period.

## Dynamic Carousel

This is the module that provides dynamic behavior for the landing page components.

## Setting

Through this module you can change the Logo, name and type of the platform from multi-vendor to single vendor. This is the module that helps to integrate links to other social platfoms for branding purposes. Currently platform color theme change is under development.
