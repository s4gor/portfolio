---
title: "wc_get_orders() function from WooCommerce, A WordPress E-commerce plugin"
date: "2024-10-17"
excerpt: "WooCommerce&nbsp;is a free, open-source plugin designed for&nbsp;WordPress&nbsp;websites, specifically created to facilitate e-commerce functionalitie..."
featuredImage: "https://jstales.com/wp-content/uploads/2025/12/1_SjdpPdZlxlpZZjezDY9x2A.webp"
---

[WooCommerce](https://wordpress.org/plugins/woocommerce/) is a free, open-source plugin designed for [WordPress](https://wordpress.org/) websites, specifically created to facilitate e-commerce functionalities. It allows users to convert their WordPress sites into online stores, enabling them to sell products and services, manage inventory, process payments, and handle shipping, all within the WordPress platform.

With WooCommerce, users can customize their online stores extensively using themes, extensions, and plugins. It provides a user-friendly interface for managing products, orders, customer information, and various aspects of an online business. WooCommerce has gained popularity for its flexibility, scalability, and extensive community support, making it a go-to solution for many small and large-scale online businesses.

### **What is wc\_get\_orders() function from WooCommerce?**

The `wc_get_orders()` function in WooCommerce is a powerful tool for retrieving orders from the database. It allows developers to fetch orders based on specific parameters, providing flexibility in querying and manipulating order data.

### **How does wc\_get\_orders() work?**

The `wc_get_orders()` function in WooCommerce is a versatile tool for retrieving orders from the WordPress database. When this function is called, it performs a database query to fetch orders that match the specified criteria and returns an array of order objects.

**Here’s an overview of how** `**wc_get_orders()**` **typically works:**

1. **Parameters:** Developers pass various arguments (parameters) to customize the query. These parameters define the conditions for fetching orders. Parameters can include:
    - `status`: Specifies the order status (e.g., ‘completed’, ‘pending’, ‘processing’).
    - `customer`: Allows filtering by customer ID or email.
    - `date_created`: Specifies date ranges for orders (e.g., orders created after a certain date).
    - Other parameters for more precise filtering are based on various order properties.
2.  **Query Building:** Based on the provided parameters, `wc_get_orders()` constructs a database query using WordPress’s built-in functions. It translates these parameters into SQL queries that target the `wp_posts` table (where WooCommerce stores order data).
3.  **Execution:** The constructed SQL query is executed against the WordPress database.
4.  **Retrieval:** Orders that match the specified criteria are fetched from the database and converted into an array of order objects.
5.  **Return:** Finally, the function returns this array of order objects, allowing developers to iterate through them, process the order data, or perform any necessary operations.

Behind the scenes, WooCommerce uses WordPress’s robust database querying capabilities, specifically its `WP_Query` class, to fetch the orders based on the provided parameters. It leverages the WordPress database structure, particularly the post types and metadata structure, to retrieve order information efficiently.

Here’s a basic example of getting a completed order’s total amount

```php
function woo_total_earning() {
  $args = ['status' => 'completed', 'limit' => -1, 'type' => 'shop_order'];
  $order = wc_get_orders($args);
  
  $total_amount = 0;
  
  foreach($order as $o) {
      $total_amount += $o->get_total() - $o->get_total_refunded(); // substracting refunded amount will give the correct amount of earnings
  }

  return $total_amount;
}
```

### **List of Common Arguments (Parameters)**

Here’s a list of some common arguments that can be used with the `wc_get_orders()` function in WooCommerce:

1. **‘status’**: Filters orders by their status (e.g., ‘completed’, ‘pending’, ‘processing’).
2. **‘customer’**: Retrieves orders based on customer information. You can specify the customer’s ID or email.
3. **‘date_created’**: Fetches orders created within a specified date range. You can use comparative operators like ‘>’, ‘<’, ‘>=’, ‘<=’, or specific dates formatted as ‘YYYY-MM-DD’.
4. **‘date_modified’**: Similar to ‘date_created’, this filters orders based on the modification date.
5. **‘orderby’**: Specifies the attribute by which orders are ordered. Options include ‘date’, ‘id’, ‘title’, ‘menu_order’, ‘total’, and more.
6. **‘order’**: Determines the order of retrieved orders. Values can be ‘ASC’ (ascending) or ‘DESC’ (descending).
7. **‘limit’**: Limits the number of orders retrieved. Useful for pagination or restricting the number of results. Setting the limit to -1 refers to retrieving all.
8. **‘page’**: Specifies the page number of results when implementing pagination.
9. **‘paginate’**: If set to true, enables pagination for the results.
10. **‘type’**: Specifies the post type for which to retrieve orders. The default is ‘shop_order’.

### **List of methods from $order object**

```php
$args = ['status' => 'completed', 'limit' => -1, 'type' => 'shop_order'];
$order = wc_get_orders($args);

// Get Order ID and Key
$order->get_id();
$order->get_order_key();
 
// Get Order Totals
$order->get_formatted_order_total();
$order->get_cart_tax();
$order->get_currency();
$order->get_discount_tax();
$order->get_discount_to_display();
$order->get_discount_total();
$order->get_total_fees();
$order->get_formatted_line_subtotal();
$order->get_shipping_tax();
$order->get_shipping_total();
$order->get_subtotal();
$order->get_subtotal_to_display();
$order->get_tax_location();
$order->get_tax_totals();
$order->get_taxes();
$order->get_total();
$order->get_total_discount();
$order->get_total_tax();
$order->get_total_refunded();
$order->get_total_tax_refunded();
$order->get_total_shipping_refunded();
$order->get_item_count_refunded();
$order->get_total_qty_refunded();
$order->get_qty_refunded_for_item();
$order->get_total_refunded_for_item();
$order->get_tax_refunded_for_item();
$order->get_total_tax_refunded_by_rate_id();
$order->get_remaining_refund_amount();
  
// Get and Loop Over Order Items
foreach ( $order->get_items() as $item_id => $item ) {
   $product_id = $item->get_product_id();
   $variation_id = $item->get_variation_id();
   $product = $item->get_product();
   $product_name = $item->get_name();
   $quantity = $item->get_quantity();
   $subtotal = $item->get_subtotal();
   $total = $item->get_total();
   $tax = $item->get_subtotal_tax();
   $tax_class = $item->get_tax_class();
   $tax_status = $item->get_tax_status();
   $allmeta = $item->get_meta_data();
   $somemeta = $item->get_meta( 'anything', true );
   $item_type = $item->get_type(); // e.g. "line_item", "fee"
}
 
// Other Secondary Items Stuff
$order->get_items_key();
$order->get_items_tax_classes();
$order->get_item_count();
$order->get_item_total();
$order->get_downloadable_items();
$order->get_coupon_codes();
  
// Get Order Lines
$order->get_line_subtotal();
$order->get_line_tax();
$order->get_line_total();
  
// Get Order Shipping
$order->get_shipping_method();
$order->get_shipping_methods();
$order->get_shipping_to_display();
  
// Get Order Dates
$order->get_date_created();
$order->get_date_modified();
$order->get_date_completed();
$order->get_date_paid();
  
// Get Order User, Billing & Shipping Addresses
$order->get_customer_id();
$order->get_user_id();
$order->get_user();
$order->get_customer_ip_address();
$order->get_customer_user_agent();
$order->get_created_via();
$order->get_customer_note();
$order->get_address_prop();
$order->get_billing_first_name();
$order->get_billing_last_name();
$order->get_billing_company();
$order->get_billing_address_1();
$order->get_billing_address_2();
$order->get_billing_city();
$order->get_billing_state();
$order->get_billing_postcode();
$order->get_billing_country();
$order->get_billing_email();
$order->get_billing_phone();
$order->get_shipping_first_name();
$order->get_shipping_last_name();
$order->get_shipping_company();
$order->get_shipping_address_1();
$order->get_shipping_address_2();
$order->get_shipping_city();
$order->get_shipping_state();
$order->get_shipping_postcode();
$order->get_shipping_country();
$order->get_address();
$order->get_shipping_address_map_url();
$order->get_formatted_billing_full_name();
$order->get_formatted_shipping_full_name();
$order->get_formatted_billing_address();
$order->get_formatted_shipping_address();
  
// Get Order Payment Details
$order->get_payment_method();
$order->get_payment_method_title();
$order->get_transaction_id();
  
// Get Order URLs
$order->get_checkout_payment_url();
$order->get_checkout_order_received_url();
$order->get_cancel_order_url();
$order->get_cancel_order_url_raw();
$order->get_cancel_endpoint();
$order->get_view_order_url();
$order->get_edit_order_url();
  
// Get Order Status
$order->get_status();
 
// Get Thank You Page URL
$order->get_checkout_order_received_url();
```

### **Summary**

By utilizing `wc_get_orders()` and its flexible parameters, developers can dynamically retrieve specific sets of orders based on their needs, whether it’s for displaying orders on the front end, processing them in the backend, generating reports, or performing other operations within a WooCommerce-powered website or application.

Overall, `wc_get_orders()` serves as a foundational function within WooCommerce, empowering developers to efficiently manage and work with order data, contributing to the customization and enhancement of online stores built on WordPress.
