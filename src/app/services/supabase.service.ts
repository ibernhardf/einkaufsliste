import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://crektsjeyxolwnbtugmw.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZWt0c2pleXhvbHduYnR1Z213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDYxNjIsImV4cCI6MjA0NDA4MjE2Mn0.yx8NbHeeqP-dwgkqZuLQQyWGRhR2lkUqezSByGuBmos';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Produkt aus Einkaufsliste von Supabase abrufen
  async getProductList(): Promise<Product[]> {
    let { data, error } = await this.supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching products from supabase:', error);
      return [];
    }

    // Sicherstellen, dass Rückgabe mit Product-Interface übereinstimmt
    return data?.map(item => ({
      id: item.id,
      name: item.name ?? '',
      amount: item.amount ?? 1,
      bought: item.bought ?? false,
      annotation: item.annotation ?? ''
    })) || [];
  }

  // Produkt aus Einkaufsliste zu Supabase hinzufügen
  async addProduct(name: string, amount: number, annotation: string) {

    console.log('supabaseService: addProduct')

    const { data, error } = await this.supabase
      .from('products')
      .insert([{ name, amount, bought: false, annotation }]);

    if (error) {
      console.error('Error adding article:', error);
    }

    return data;
  }

  // Produkt aus Einkaufsliste als gekauft/nicht gekauft markieren
  async boughtProduct(id: number, bought: boolean) {
    const { data, error } = await this.supabase
      .from('products')
      .update({ bought })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
    }

    return data;
  }

  // Artikel aus der Liste löschen
  async removeProduct(id: number) {
    const { error } = await this.supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
    }
  }
}