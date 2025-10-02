#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Testing NestJS Clean Architecture API${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Test 1: Create Product
echo -e "${GREEN}1. Creating a product...${NC}"
PRODUCT_RESPONSE=$(curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Gaming Mouse", "description": "RGB gaming mouse", "price": 59.99, "stock": 100}')
echo "$PRODUCT_RESPONSE" | jq '.'
PRODUCT_ID=$(echo "$PRODUCT_RESPONSE" | jq -r '.id')
echo -e "\nProduct ID: $PRODUCT_ID\n"

# Test 2: Get all products
echo -e "${GREEN}2. Getting all products...${NC}"
curl -s http://localhost:3000/products | jq '.'
echo ""

# Test 3: Get product by ID
echo -e "${GREEN}3. Getting product by ID...${NC}"
curl -s http://localhost:3000/products/$PRODUCT_ID | jq '.'
echo ""

# Test 4: Update product
echo -e "${GREEN}4. Updating product...${NC}"
curl -s -X PUT http://localhost:3000/products/$PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{"name": "Premium Gaming Mouse", "description": "Premium RGB gaming mouse", "price": 79.99}' | jq '.'
echo ""

# Test 5: Increase stock
echo -e "${GREEN}5. Increasing stock...${NC}"
curl -s -X PATCH http://localhost:3000/products/$PRODUCT_ID/increase-stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 50}' | jq '.'
echo ""

# Test 6: Decrease stock
echo -e "${GREEN}6. Decreasing stock...${NC}"
curl -s -X PATCH http://localhost:3000/products/$PRODUCT_ID/decrease-stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 20}' | jq '.'
echo ""

# Test 7: Create User
echo -e "${GREEN}7. Creating a user...${NC}"
USER_RESPONSE=$(curl -s -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Smith", "email": "jane@example.com"}')
echo "$USER_RESPONSE" | jq '.'
USER_ID=$(echo "$USER_RESPONSE" | jq -r '.id')
echo -e "\nUser ID: $USER_ID\n"

# Test 8: Get all users
echo -e "${GREEN}8. Getting all users...${NC}"
curl -s http://localhost:3000/users | jq '.'
echo ""

# Test 9: Get user by ID
echo -e "${GREEN}9. Getting user by ID...${NC}"
curl -s http://localhost:3000/users/$USER_ID | jq '.'
echo ""

# Test 10: Update user
echo -e "${GREEN}10. Updating user...${NC}"
curl -s -X PUT http://localhost:3000/users/$USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane.doe@example.com"}' | jq '.'
echo ""

# Test 11: Deactivate user
echo -e "${GREEN}11. Deactivating user...${NC}"
curl -s -X PATCH http://localhost:3000/users/$USER_ID/deactivate | jq '.'
echo ""

# Test 12: Activate user
echo -e "${GREEN}12. Activating user...${NC}"
curl -s -X PATCH http://localhost:3000/users/$USER_ID/activate | jq '.'
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}All tests completed!${NC}"
echo -e "${BLUE}========================================${NC}"

