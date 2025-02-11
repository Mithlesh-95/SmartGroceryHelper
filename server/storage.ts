import {
  type GroceryItem,
  type Recipe,
  type ShoppingItem,
  type InsertGroceryItem,
  type InsertRecipe,
  type InsertShoppingItem,
} from "@shared/schema";

export interface IStorage {
  // Grocery Items
  getGroceryItems(): Promise<GroceryItem[]>;
  getGroceryItem(id: number): Promise<GroceryItem | undefined>;
  createGroceryItem(item: InsertGroceryItem): Promise<GroceryItem>;
  updateGroceryItem(id: number, item: Partial<InsertGroceryItem>): Promise<GroceryItem | undefined>;
  deleteGroceryItem(id: number): Promise<void>;

  // Recipes
  getRecipes(): Promise<Recipe[]>;
  getRecipe(id: number): Promise<Recipe | undefined>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  
  // Shopping List
  getShoppingList(): Promise<ShoppingItem[]>;
  createShoppingItem(item: InsertShoppingItem): Promise<ShoppingItem>;
  updateShoppingItem(id: number, item: Partial<InsertShoppingItem>): Promise<ShoppingItem | undefined>;
  deleteShoppingItem(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private groceryItems: Map<number, GroceryItem>;
  private recipes: Map<number, Recipe>;
  private shoppingItems: Map<number, ShoppingItem>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.groceryItems = new Map();
    this.recipes = new Map();
    this.shoppingItems = new Map();
    this.currentIds = { groceryItems: 1, recipes: 1, shoppingItems: 1 };
    
    // Add some sample recipes
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleRecipes: InsertRecipe[] = [
      {
        name: "Classic Pancakes",
        description: "Fluffy homemade pancakes perfect for breakfast",
        ingredients: ["2 cups flour", "2 eggs", "1 cup milk", "2 tbsp sugar"],
        instructions: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle"],
        imageUrl: "https://images.unsplash.com/photo-1601315379734-425a469078de",
        videoUrl: "https://youtube.com/watch?v=123",
        preparationTime: 20,
      },
      {
        name: "Garden Salad",
        description: "Fresh and healthy garden salad",
        ingredients: ["lettuce", "tomatoes", "cucumber", "olive oil"],
        instructions: ["Wash vegetables", "Chop ingredients", "Mix and serve"],
        imageUrl: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132",
        videoUrl: "https://youtube.com/watch?v=456",
        preparationTime: 10,
      },
    ];

    sampleRecipes.forEach(recipe => this.createRecipe(recipe));
  }

  // Grocery Items
  async getGroceryItems(): Promise<GroceryItem[]> {
    return Array.from(this.groceryItems.values());
  }

  async getGroceryItem(id: number): Promise<GroceryItem | undefined> {
    return this.groceryItems.get(id);
  }

  async createGroceryItem(item: InsertGroceryItem): Promise<GroceryItem> {
    const id = this.currentIds.groceryItems++;
    const newItem = { ...item, id };
    this.groceryItems.set(id, newItem);
    return newItem;
  }

  async updateGroceryItem(id: number, item: Partial<InsertGroceryItem>): Promise<GroceryItem | undefined> {
    const existingItem = this.groceryItems.get(id);
    if (!existingItem) return undefined;
    
    const updatedItem = { ...existingItem, ...item };
    this.groceryItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteGroceryItem(id: number): Promise<void> {
    this.groceryItems.delete(id);
  }

  // Recipes
  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async createRecipe(recipe: InsertRecipe): Promise<Recipe> {
    const id = this.currentIds.recipes++;
    const newRecipe = { ...recipe, id };
    this.recipes.set(id, newRecipe);
    return newRecipe;
  }

  // Shopping List
  async getShoppingList(): Promise<ShoppingItem[]> {
    return Array.from(this.shoppingItems.values());
  }

  async createShoppingItem(item: InsertShoppingItem): Promise<ShoppingItem> {
    const id = this.currentIds.shoppingItems++;
    const newItem = { ...item, id };
    this.shoppingItems.set(id, newItem);
    return newItem;
  }

  async updateShoppingItem(id: number, item: Partial<InsertShoppingItem>): Promise<ShoppingItem | undefined> {
    const existingItem = this.shoppingItems.get(id);
    if (!existingItem) return undefined;
    
    const updatedItem = { ...existingItem, ...item };
    this.shoppingItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteShoppingItem(id: number): Promise<void> {
    this.shoppingItems.delete(id);
  }
}

export const storage = new MemStorage();
