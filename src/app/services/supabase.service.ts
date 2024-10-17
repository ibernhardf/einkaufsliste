import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product } from '../product';
import { Shop } from '../shop';


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://crektsjeyxolwnbtugmw.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZWt0c2pleXhvbHduYnR1Z213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDYxNjIsImV4cCI6MjA0NDA4MjE2Mn0.yx8NbHeeqP-dwgkqZuLQQyWGRhR2lkUqezSByGuBmos';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async ensureObject<T>(input: T | T[]): Promise<T> {
    if (Array.isArray(input)) {
      return input[0]; // Return the first object if it's an array
    }
    return input; // Return the object if it's already an object
  }

  // Produkt aus Einkaufsliste von Supabase abrufen
  async getProductList(): Promise<Product[]> {
    let { data, error } = await this.supabase
      .from('product')
      .select(
        `
          id, name, amount, bought, annotation, shop_id,
          shop (name, color)
        `
      )
      .order('shop_id', { ascending: true });

    console.log('data from supabase: ', data);

    if (error) {
      console.error('Error fetching products from supabase:', error);
      return [];
    }

    // Sicherstellen, dass Rückgabe mit Product-Interface übereinstimmt

    const data2 = await Promise.all(data?.map(async (item) => ({
      id: item.id,
      name: item.name ?? '',
      amount: item.amount ?? 1,
      bought: item.bought ?? false,
      annotation: item.annotation ?? '',
      shop_id: item.shop_id ?? null,
      shop: item.shop ? await this.ensureObject(item.shop) : { name: '', color: '' }
    })) || []);

    console.log('data2:', data2)

    return (
      data2 || []
    );
  }

  // Shop aus Liste der Shops von Supabase abrufen
  async getShopList(): Promise<Shop[]> {
    let { data, error } = await this.supabase
      .from('shop')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching shops from supabase:', error);
      return [];
    }

    // Sicherstellen, dass Rückgabe mit Shop-Interface übereinstimmt
    return (
      data?.map((item) => ({
        id: item.id,
        name: item.name ?? '',
        color: item.color ?? '',
      })) || []
    );
  }

  // Produkt aus Einkaufsliste zu Supabase hinzufügen
  async addProduct(product: Product) {
    console.log('supabaseService: addProduct');

    const name = product.name;
    const amount = product.amount;
    const annotation = product.annotation;
    const shop_id = product.shop_id;

    if (product.name.trim()) {
      const { data, error } = await this.supabase
        .from('product')
        .insert([{ name, amount, bought: false, annotation, shop_id: shop_id }]);

      if (error) {
        console.error('Error adding article:', error);
      }

      return data;
    } else {
      return;
    }
  }

  // Produkt aus Einkaufsliste als gekauft/nicht gekauft markieren
  async boughtProduct(id: number, bought: boolean) {
    const { data, error } = await this.supabase
      .from('product')
      .update({ bought })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
    }

    return data;
  }

  // Produkt aus der Liste löschen
  async removeProduct(id: number) {
    const { error } = await this.supabase
      .from('product')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
    }
  }

  // Shop zur Liste der Shops in Supabase hinzufügen
  async addShop(shop: Shop) {
    console.log('supabaseService: addShop');

    const name = shop.name;
    const color = shop.color;

    if (shop.name.trim()) {
      const { data, error } = await this.supabase
        .from('shop')
        .insert([{ name, color }]);

      if (error) {
        console.error('Error adding shop:', error);
      }

      return data;
    } else {
      return;
    }
  }

  // Shop aus Supabase Shops-Tabelle löschen
  async deleteShop(id: number) {
    const { error } = await this.supabase.from('shop').delete().eq('id', id);

    if (error) {
      console.error('Error deleting shop:', error);
    }
  }
}
