import { Component, OnInit } from "@angular/core";
import { CustomerService } from "./customer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EMPTY, tap, catchError } from "rxjs";
import Swal from "sweetalert2";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html"
})

export class FormComponent implements OnInit {

    public error: String = "";
    public regions = [
        { id: null, name: "Seleccione una región" },
        { id: 1, name: "America" },
        { id: 2, name: "Asia" },
        { id: 3, name: "Europe" },
        { id: 4, name: "Africa" }
    ];

    constructor(private CustomerService: CustomerService, private router: Router, private activedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.loadCustomer();
    }

    customer: any = {
        name: '',
        lastname: '',
        email: '',
        region: {
            id: null
        }
    };

    loadCustomer(): void {
        this.activedRoute.params.pipe(
            tap(params => {
                let id = params["id"];
                if (id) {
                    this.CustomerService.getCustomer(id).pipe(
                        tap(customer => this.customer = customer),
                        catchError(err => {
                            this.router.navigate(["/customers/0"]);
                            return EMPTY;
                        })
                    ).subscribe();
                }
            })
        ).subscribe();
    }

    createCustomer(): void {

        this.CustomerService.createCustomer(this.customer).pipe(
            tap(response => {
                this.error = "";
                Swal.fire('Cliente registrado', response.message, 'success');
            }),
            catchError(err => {
                this.error = err.error.message;
                return EMPTY;
            })
        ).subscribe();
    }

    updateCustomer(): void {
        this.CustomerService.updateCustomer(this.customer).pipe(
            tap(response => {
                this.router.navigate(["/customers"]);
                Swal.fire('Cliente actualizado', response.message, 'success');
            }),
            catchError(err => {
                this.error = err.error.message;
                return EMPTY;
            })
        ).subscribe();
    }

    onFileSelected(event: any) {

        const selectedFile = event.target.files[0];

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas cambiar la foto de perfil?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambiar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.CustomerService.uploadPhoto(selectedFile, this.customer.id).pipe(
                    tap(response => {
                        this.customer = response.customer;
                        Swal.fire('Foto de perfil actualizada', response.message, 'success');
                    }),
                    catchError(err => {
                        this.error = err.error.message;
                        return EMPTY;
                    })
                ).subscribe();
            }
        })

    }

}
