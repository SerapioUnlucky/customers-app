import { Component } from "@angular/core";
import { formatDate } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "./customer.service";
import { EMPTY, catchError, tap } from "rxjs";
import Swal from "sweetalert2";

@Component({
    selector: "app-customer",
    templateUrl: "./customer.component.html"
})

export class CustomerComponent {

    customers: [];
    currentPage: number;
    totalPages: number;

    public urlPhoto: string = "http://localhost:8080/api/customer/viewphoto/";

    constructor(private customerService: CustomerService, private router: Router, private activedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.loadCustomers();

    }

    loadCustomers(): void {

        this.activedRoute.params.subscribe(params => {

            let page = params["page"];

            if (!page) {

                page = 0;

            }

            this.currentPage = Number(page);

            this.customerService.getCustomers(page).pipe(
                tap(response => {
                    this.totalPages = response.totalPages;
                    (response.content as []).forEach((customer: { createdAt: string | number | Date; }) => {
                        customer.createdAt = formatDate(customer.createdAt, "dd-MM-yyyy", "en-US");
                    });
                })
            ).subscribe(response => this.customers = response.content as []);

        });

    }

    handlerPage(page: number): void {

        this.router.navigate(["/customers/", page]);

    }

    deleteCustomer(customer: any): void {

        Swal.fire({
            title: "Advertencia!",
            text: `¿Esta seguro que desea eliminar al cliente ${customer.name} ${customer.lastname}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                this.customerService.deleteCustomer(customer.id).pipe(
                    tap(response => {
                        this.loadCustomers();
                        Swal.fire('Cliente eliminado', response.message, 'success');
                    }),
                    catchError(err => {
                        Swal.fire('Error', err.error.message, 'error');
                        return EMPTY;
                    })
                ).subscribe();
            }
        });

    }

    showModal(photo: String) {

        Swal.fire({
            title: 'Imagen de perfil',
            imageUrl: this.urlPhoto + photo,
            imageWidth: 500,
            imageHeight: 500,
            imageAlt: 'Imagen de perfil'
        });
    }

}
