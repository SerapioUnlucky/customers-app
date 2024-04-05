import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class CustomerService {

    private urlEndPoint: string = "http://localhost:8080/api";
    private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

    constructor(private http: HttpClient) { }

    getCustomers(page: number): Observable<any> {
        return this.http.get<any>(this.urlEndPoint + `/customers/${page}`);
    }

    getCustomer(id: number): Observable<any> {
        return this.http.get<any>(this.urlEndPoint + "/customer/" + id);
    }

    createCustomer(customer: any): Observable<any> {
        return this.http.post<any>(this.urlEndPoint + "/customer/create", customer, { headers: this.httpHeaders });
    }

    updateCustomer(customer: any): Observable<any> {
        return this.http.put<any>(this.urlEndPoint + "/customer/update/" + customer.id, customer, { headers: this.httpHeaders });
    }

    deleteCustomer(id: number): Observable<any> {
        return this.http.delete<any>(this.urlEndPoint + "/customer/delete/" + id, { headers: this.httpHeaders });
    }

    uploadPhoto(file: File, id: number): Observable<any> {
        let formData = new FormData();
        formData.append("file", file);
        return this.http.post<any>(this.urlEndPoint + `/customer/upload/${id}`, formData);
    }

}
