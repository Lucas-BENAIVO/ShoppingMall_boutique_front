import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderItem {
  productId: string;
  boutiqueId: string;
  quantity: number;
  price: number;
  status?: string;
  // Populated fields
  productName?: string;
  productImage?: string;
  boutiqueName?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING' | 'CANCELLED';
  deliveryType: 'RETRAIT' | 'LIVRAISON';
  createdAt: Date;
  // Populated
  user?: {
    fullName: string;
    email: string;
    phone?: string;
  };
}

export interface CreateOrderRequest {
  userId: string;
  items: {
    productId: string;
    boutiqueId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  deliveryType: 'RETRAIT' | 'LIVRAISON';
}

export interface OrderResponse {
  success: boolean;
  count?: number;
  data: Order[];
}

export interface SingleOrderResponse {
  success: boolean;
  message?: string;
  data: Order;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/orders`;

  constructor(private http: HttpClient) {}

  createOrder(orderData: CreateOrderRequest): Observable<SingleOrderResponse> {
    return this.http.post<SingleOrderResponse>(this.apiUrl, orderData);
  }

  getAllOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(this.apiUrl);
  }

  getOrderById(orderId: string): Observable<SingleOrderResponse> {
    return this.http.get<SingleOrderResponse>(`${this.apiUrl}/${orderId}`);
  }

  getOrdersByUser(userId: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/user/${userId}`);
  }

  getOrdersByBoutique(boutiqueId: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/boutique/${boutiqueId}`);
  }

  updateItemStatus(orderId: string, productId: string, status: string): Observable<SingleOrderResponse> {
    return this.http.put<SingleOrderResponse>(`${this.apiUrl}/item-status`, {
      orderId,
      productId,
      status
    });
  }
}
