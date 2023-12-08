# Endpoints

## products/populate

Fetches and persist products from the Shopify store into a database. Every time this endpoint is called, it retrieves the next 50 records and stores them in the corresponding table.

## products/getProducts

Returns all products stored in the database with the following format:
type Product = {
	id: string; // A unique ID for this product
	platform_id: string; // The Shopify ID of the product
	name: string; // The Shopify name of the product
}

## orders/populate

Fetches and persist orders from the Shopify store into a database. Every time this endpoint is called, it retrieves the next 50 records and stores them in the corresponding table.

## orders/getOrders

Returns all orders stored in the database with the following format:
type Order = {
	id: string; // A unique ID 
	platform_id: string; // The Shopify ID of the Order
	line_items: [
		{
			product_id: string | null; // An ID referencing the unique ID you used to store Shopify products. If the product does not exist in your database, return null
		}
	]
}