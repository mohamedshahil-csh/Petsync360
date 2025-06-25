export const productFormSchema = {
  title: "WooCommerce Product Form",
  fields: [
    // Basic Info
    { name: "name", label: "Product Name", type: "string", fieldType: "text", required: true },
    // { name: "slug", label: "Slug", type: "string", fieldType: "text", required: false },
    {
      name: "type", label: "Product Type", type: "string", fieldType: "dropdown", required: true, options: [
        { label: "Simple", value: "simple" },
        { label: "Variable", value: "variable" },
        { label: "Grouped", value: "grouped" },
        { label: "External", value: "external" }
      ]
    },
    {
      name: "status", label: "Status", type: "string", fieldType: "dropdown", required: true, options: [
        { label: "Draft", value: "draft" },
        { label: "Pending", value: "pending" },
        { label: "Private", value: "private" },
        { label: "Publish", value: "publish" }
      ]
    },


    { name: "description", label: "Full Description", type: "string", fieldType: "multiline", required: true },
    { name: "short_description", label: "Short Description", type: "string", fieldType: "multiline", required: false },
    {
      name: "catalog_visibility", label: "Catalog Visibility", type: "string", fieldType: "dropdown", required: false, options: [
        { label: "Visible", value: "visible" },
        { label: "Catalog", value: "catalog" },
        { label: "Search", value: "search" },
        { label: "Hidden", value: "hidden" }
      ]
    },
    // Pricing
    { name: "regular_price", label: "Regular Price", type: "string", fieldType: "text", required: true },
    { name: "sale_price", label: "Sale Price", type: "string", fieldType: "text", required: false },
    { name: "date_on_sale_from", label: "Sale Start Date", type: "string", fieldType: "text", required: false },
    { name: "date_on_sale_to", label: "Sale End Date", type: "string", fieldType: "text", required: false },

    // Downloadable & Virtual

    { name: "downloads", label: "Downloadable Files", type: "array", fieldType: "text", required: false },
    { name: "download_limit", label: "Download Limit", type: "number", fieldType: "text", required: false },
    { name: "download_expiry", label: "Download Expiry (days)", type: "number", fieldType: "text", required: false },

    // Inventory
    { name: "sku", label: "SKU", type: "string", fieldType: "text", required: false },

    { name: "stock_quantity", label: "Stock Quantity", type: "number", fieldType: "text", required: false },
    {
      name: "stock_status", label: "Stock Status", type: "string", fieldType: "dropdown", required: true, options: [
        { label: "In Stock", value: "instock" },
        { label: "Out of Stock", value: "outofstock" },
        { label: "On Backorder", value: "onbackorder" }
      ]
    },
    {
      name: "backorders", label: "Backorders", type: "string", fieldType: "dropdown", required: false, options: [
        { label: "No", value: "no" },
        { label: "Notify", value: "notify" },
        { label: "Yes", value: "yes" }
      ]
    },
    { name: "low_stock_amount", label: "Low Stock Threshold", type: "number", fieldType: "text", required: false },


    // Shipping
    { name: "weight", label: "Weight (kg)", type: "string", fieldType: "text", required: false },
    { name: "dimensions_length", label: "Length (cm)", type: "string", fieldType: "text", required: false },
    { name: "dimensions_width", label: "Width (cm)", type: "string", fieldType: "text", required: false },
    { name: "dimensions_height", label: "Height (cm)", type: "string", fieldType: "text", required: false },
    { name: "shipping_class_id", label: "Shipping Class ID", type: "number", fieldType: "text", required: false },

    // Tax
    {
      name: "tax_status", label: "Tax Status", type: "string", fieldType: "dropdown", required: true, options: [
        { label: "Taxable", value: "taxable" },
        { label: "Shipping Only", value: "shipping" },
        { label: "None", value: "none" }
      ]
    },
    { name: "tax_class", label: "Tax Class", type: "string", fieldType: "text", required: false },

    // Linked Products
    { name: "upsell_ids", label: "Upsell Product IDs", type: "array", fieldType: "text", required: false },
    { name: "cross_sell_ids", label: "Cross-sell Product IDs", type: "array", fieldType: "text", required: false },
    { name: "grouped_products", label: "Grouped Product IDs", type: "array", fieldType: "text", required: false },

    // Attributes & Variations
    { name: "attributes", label: "Attributes", type: "array", fieldType: "text", required: false },
    { name: "default_attributes", label: "Default Attributes", type: "array", fieldType: "text", required: false },
    { name: "variations", label: "Variation IDs", type: "array", fieldType: "text", required: false },

    // Categories & Tags
    { name: "categories", label: "Categories", type: "array", fieldType: "text", required: false },
    { name: "tags", label: "Tags", type: "array", fieldType: "text", required: false },



    // External Product
    { name: "external_url", label: "External URL", type: "string", fieldType: "text", required: false },
    { name: "button_text", label: "Button Text", type: "string", fieldType: "text", required: false },

    // Meta & SEO
    { name: "meta_data", label: "Custom Meta Data", type: "array", fieldType: "text", required: false },
    { name: "menu_order", label: "Menu Order", type: "number", fieldType: "text", required: false },

    // Misc

    { name: "purchase_note", label: "Purchase Note", type: "string", fieldType: "multiline", required: false },

    { name: "featured", label: "Is Featured?", type: "boolean", fieldType: "boolean", required: false },
    { name: "virtual", label: "Is Virtual?", type: "boolean", fieldType: "boolean", required: false },
    { name: "downloadable", label: "Is Downloadable?", type: "boolean", fieldType: "boolean", required: false },
    { name: "manage_stock", label: "Manage Stock?", type: "boolean", fieldType: "boolean", required: false },
    { name: "sold_individually", label: "Sold Individually?", type: "boolean", fieldType: "boolean", required: false },
    { name: "reviews_allowed", label: "Allow Reviews?", type: "boolean", fieldType: "boolean", required: false },

    { name: "image", label: "Main Image (URL or ID)", type: "string", fieldType: "singleImage", required: false },
    { name: "images", label: "Gallery Images (URLs or IDs)", type: "array", fieldType: "multiImage", required: false },
  ]
};
