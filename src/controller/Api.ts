
import { PageProps } from './../../.next/types/app/cardapio/page';
import { CreateEstablish } from "@/interfaces/establish.interface";
import { LoginData } from "@/interfaces/login.interface";
import {
  CreateProduct,
  CreateTypeProduct,
  UpdateTypeProduct,
} from "@/interfaces/products.interface";
import { userStore } from "@/store/user.store";
import { parseCookies } from "nookies";
import { Establish } from "./../interfaces/establish.interface";
import { StatusOrder, iOrder } from "@/interfaces/order.interface";
import { revalidatePath } from 'next/cache';
export class Service {
  constructor() {}
  baseURL = "http://localhost:3333/";
  headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  setToken = userStore().setToken;
  setEstablish = userStore().setEstablish;

  cookies = parseCookies();
  //establish
  async establishLogin(loginData: LoginData): Promise<string | undefined> {
    try {
      const res = await fetch(`${this.baseURL}login`, {
        body: JSON.stringify(loginData),
        method: "POST",
        headers: this.headers,
      });

      const token = await res.json();

      if (token.token) {
        this.setToken(token.token);
        return token.token;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async createEstablish(establishData: CreateEstablish) {
    const res = await fetch(`${this.baseURL}establish`, {
      body: JSON.stringify(establishData),
      method: "POST",
      headers: this.headers,
    });

    return await res.json();
  }
  async establishRetrieve(token: string): Promise<Establish | undefined> {
    try {
      const res = await fetch(`${this.baseURL}establish/retrieve`, {
        headers: { ...this.headers, Authorization: `Bearer ${token}` },
      });

      if (res.status == 201) {
        const establish = await res.json();
        this.setEstablish(establish);
        return establish;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  //types products
  async createTypeProduct(typeProductData: CreateTypeProduct) {
    console.log(typeProductData)
    const token = this.cookies["@mepedeAi-token"];
    const res = await fetch(`${this.baseURL}type-product`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify(typeProductData),
      next:{
        tags:["cardapio"]
      }
    });
    // revalidatePath('/cardapio')
    return await res.json();

  }
  async getTypeProducts(token: string) {
    const res = await fetch(`${this.baseURL}type-product`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
  async updateTypeProducts(id:number, typeProductData:UpdateTypeProduct){
    const token = this.cookies["@mepedeAi-token"];
    const res = await fetch(`${this.baseURL}type-product/${id}`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
      method:"PATCH", 
      body:JSON.stringify(typeProductData)
    });
    return await res.json();
  }
  //products
  async createProduct(productData: CreateProduct, token: string) {
    const res = await fetch(`${this.baseURL}product`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify(productData),
      method: "POST",
    });
    return await res.json();
  }
  async getProducts(token: string) {
    const res = await fetch(`${this.baseURL}product`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
  //menus
  async getMenu() {
    const token = this.cookies["@mepedeAi-token"];
    const establishJson = this.cookies["@mepedeAi-establish"];
    if (establishJson) {
      const establish: Establish = JSON.parse(establishJson);
      const establishId = establish.id;
      const res = await fetch(`${this.baseURL}menu/${establishId}`, {
        headers: { ...this.headers, Authorization: `Bearer ${token}` },
      });
     
      return await res.json();
    }
  }
  async createMenu(token: string) {
    const res = await fetch(`${this.baseURL}menu`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
      method: "POST",
    });
    return await res.json();
  }
  async retrieveShop() {
    const token = this.cookies["@mepedeAi-token"];
    try {
        
    const res = await fetch(`${this.baseURL}shop/retrieve`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    });
    
    return await res.json();
    } catch (error) {
      console.log(error)
    }
  }
  async getOrders(){
    const token = this.cookies["@mepedeAi-token"];
    try {
        
    const res:Response  = await fetch(`${this.baseURL}order`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    });
    
    return await res.json();
    } catch (error) {
      console.log(error)
    }
  }
  async updateStatusorder(id:number,statusData:StatusOrder){
    const token = this.cookies["@mepedeAi-token"];
    const body = {status:statusData}
    try {
        
      const res:Response  = await fetch(`${this.baseURL}order/${id}/status`, {
        headers: { ...this.headers, Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
        method:"PATCH"
      });
      
      return await res.json();
      } catch (error) {
        console.log(error)
      }
  }
}
