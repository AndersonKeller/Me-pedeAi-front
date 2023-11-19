import { CreateEstablish } from "@/interfaces/establish.interface";

export class Service {
  constructor() {}
  baseURL = "http://localhost:3333/";
  headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  async establishLogin(email: string, password: string) {
    const loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);
    const res = await fetch(`${this.baseURL}login`, {
      body: JSON.stringify(loginData),
      method: "POST",
      headers: this.headers,
    });
    return await res.json();
  }
  async createEstablish(establishData: CreateEstablish) {
    const res = await fetch(`${this.baseURL}establish`, {
      body: JSON.stringify(establishData),
      method: "POST",
      headers: this.headers,
    });

    return await res.json();
  }
  async establishRetrieve(token: string) {
    const res = await fetch(`${this.baseURL}establish/retrieve`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    });

    return await res.json();
  }
}
