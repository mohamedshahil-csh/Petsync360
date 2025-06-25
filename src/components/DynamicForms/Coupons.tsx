export const CouponFormSchema = {
    "title": "Coupon Form",
    "fields": [
        {
            "name": "code",
            "label": "Coupon Code",
            "type": "text",
            "fieldType": "text",
            "placeholder": "Enter coupon code",
            "required": true,
            "description": "The code customers will enter to get the discount."
        },
        {
            "name": "amount",
            "label": "Discount Amount",
            "type": "number",
            "fieldType": "decimal",
            "placeholder": "100.00",
            "required": true,
            "description": "The amount discounted per product or cart."
        },
        {
            "name": "discount_type",
            "label": "Discount Type",
            "type": "select",
            "fieldType": "dropdown",
            "options": [
                { "label": "Fixed Product", "value": "fixed_product" },
                { "label": "Fixed Cart", "value": "fixed_cart" },
                { "label": "Percentage", "value": "percent" }
            ],
            "required": true,
            "description": "Select how the discount should be applied."
        },
        {
            "name": "status",
            "label": "Status",
            "type": "select",
            "fieldType": "dropdown",
            "options": [
                { "label": "Published", "value": "publish" },
                { "label": "Draft", "value": "draft" }
            ],
            "description": "Coupon status (publish to activate)."
        },
        {
            "name": "date_expires",
            "label": "Expiration Date",
            "type": "datetime-local",
            "fieldType": "datetime",
            "description": "When the coupon will expire (local time)."
        },
        {
            "name": "usage_limit",
            "label": "Total Usage Limit",
            "type": "number",
            "fieldType": "integer",
            "placeholder": "1",
            "description": "Total times this coupon can be used."
        },
        {
            "name": "usage_limit_per_user",
            "label": "Usage Limit Per User",
            "type": "number",
            "fieldType": "integer",
            "placeholder": "null",
            "description": "Limit per user (null for unlimited)."
        },
        {
            "name": "limit_usage_to_x_items",
            "label": "Limit to X Items",
            "type": "number",
            "fieldType": "integer",
            "placeholder": "null",
            "description": "Restrict the discount to a number of items."
        },

        {
            "name": "minimum_amount",
            "label": "Minimum Spend",
            "type": "number",
            "fieldType": "decimal",
            "placeholder": "0.00",
            "description": "Minimum cart total to apply coupon."
        },
        {
            "name": "maximum_amount",
            "label": "Maximum Spend",
            "type": "number",
            "fieldType": "decimal",
            "placeholder": "0.00",
            "description": "Maximum cart total to apply coupon."
        },
        {
            "name": "product_ids",
            "label": "Product IDs",
            "type": "text",
            "fieldType": "comma-list",
            "placeholder": "Comma-separated IDs",
            "description": "Apply coupon to specific products."
        },
        {
            "name": "excluded_product_ids",
            "label": "Excluded Product IDs",
            "type": "text",
            "fieldType": "comma-list",
            "placeholder": "Comma-separated IDs",
            "description": "Exclude these product IDs from coupon usage."
        },
        {
            "name": "product_categories",
            "label": "Product Categories",
            "type": "text",
            "fieldType": "comma-list",
            "placeholder": "Comma-separated category IDs",
            "description": "Apply coupon to specific categories."
        },
        {
            "name": "excluded_product_categories",
            "label": "Excluded Categories",
            "type": "text",
            "fieldType": "comma-list",
            "placeholder": "Comma-separated category IDs",
            "description": "Exclude categories from coupon usage."
        },
        {
            "name": "email_restrictions",
            "label": "Email Restrictions",
            "type": "text",
            "fieldType": "comma-list",
            "placeholder": "Comma-separated emails",
            "description": "Limit coupon usage to specific customer emails."
        },
        {
            "name": "description",
            "label": "Description",
            "type": "textarea",
            "fieldType": "multiline",
            "placeholder": "Optional description...",
            "description": "Internal note or description of the coupon."
        },
        {
            "name": "individual_use",
            "label": "Individual Use Only",
            "type": "checkbox",
            "fieldType": "boolean",
            "description": "Check to restrict this coupon from being used with others."
        },
        {
            "name": "exclude_sale_items",
            "label": "Exclude Sale Items",
            "type": "checkbox",
            "fieldType": "boolean",
            "description": "Check to prevent this coupon from applying to sale items."
        },
        {
            "name": "free_shipping",
            "label": "Allow Free Shipping",
            "type": "checkbox",
            "fieldType": "boolean",
            "description": "Check if using this coupon allows free shipping."
        },
    ]
}
