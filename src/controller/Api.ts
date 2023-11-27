import { CreateEstablish } from "@/interfaces/establish.interface";
import { LoginData } from "@/interfaces/login.interface";
import {
  CreateProduct,
  CreateTypeProduct,
} from "@/interfaces/products.interface";
import { userStore } from "@/store/user.store";
import { parseCookies } from "nookies";
import { Establish } from "./../interfaces/establish.interface";
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
  async createTypeProduct(typeProductData: CreateTypeProduct, token: string) {
    const res = await fetch(`${this.baseURL}type-product`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify(typeProductData),
    });
    return await res.json();
  }
  async getTypeProducts(token: string) {
    const res = await fetch(`${this.baseURL}type-product`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
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
}
