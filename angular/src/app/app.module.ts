import { DichvuService } from './share/services/dichvu.service';
import { PhongserviceService } from './share/services/phongservice.service';
import { CartserviceService } from './share/services/cartservice.service';
import { DishserviceService } from './share/services/dishservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { OwlModule } from 'ngx-owl-carousel';
import { AppComponent } from './app.component';
import { HomeComponent } from './html/home/home.component';
import { HeaderComponent } from './html/header/header.component';
import { FooterComponent } from './html/footer/footer.component';
import { SectionComponent } from './html/section/section.component';
import { DishComponent } from './html/dish/dish.component';
import { DishLishComponent } from './html/dish-lish/dish-lish.component';
import { RegisterComponent } from './html/register/register.component';
import { CartComponent } from './html/cart/cart.component';
import { PaymentComponent } from './html/payment/payment.component';
import { ListcartComponent } from './html/listcart/listcart.component';
import { BilledComponent } from './html/billed/billed.component';
import { DishExampleComponent } from './html/dish-example/dish-example.component';
import { ThucdonserviceService } from './share/services/thucdonservice.service';
import { ThucdonComponent } from './html/thucdon/thucdon.component';
import { DetaildishComponent } from './html/detaildish/detaildish.component';
import { ThucdonExampleComponent } from './html/thucdon-example/thucdon-example.component';
import { FilterdataPipe } from './filterdata.pipe';
import { UudaiComponent } from './html/uudai/uudai.component';
import { ThucdonListComponent } from './html/thucdon-list/thucdon-list.component';
import { PhongComponent } from './html/phong/phong.component';
import { PaymentTuComponent } from './html/payment-tu/payment-tu.component';
import { AdminLayoutComponent } from './html/admin-layout/admin-layout.component';
import { AdminComponent } from './html/admin-layout/admin/admin.component';
import { AdminLoginComponent } from './html/admin-layout/admin-login/admin-login.component';
import { BillsManagerComponent } from './html/admin-layout/admin/bills-manager/bills-manager.component';
import { BooknowComponent } from './html/admin-layout/admin/booknow/booknow.component';
import { CustomerManagerComponent } from './html/admin-layout/admin/customer-manager/customer-manager.component';
import { DichvuComponent } from './html/admin-layout/admin/dichvu/dichvu.component';
import { DishManagerComponent } from './html/admin-layout/admin/dish-manager/dish-manager.component';
import { MenuManagerComponent } from './html/admin-layout/admin/menu-manager/menu-manager.component';
import { RoomManagerComponent } from './html/admin-layout/admin/room-manager/room-manager.component';
import { BillDetailComponent } from './html/admin-layout/admin/bills-manager/bill-detail/bill-detail.component';
import { AdheaderComponent } from './html/admin-layout/admin/adheader/adheader.component';
import { LoaimonanComponent } from './html/admin-layout/admin/loaimonan/loaimonan.component';
import { LoaiphongComponent } from './html/admin-layout/admin/loaiphong/loaiphong.component';
import { DataTransferService } from './share/services/DataTransfer/data-transfer.service';
import { HumanService } from './share/services/human.service';
import { LoginService } from './share/services/login.service';
import { AboutusComponent } from './html/aboutus/aboutus.component';
import { GioithieuphongComponent } from './html/gioithieuphong/gioithieuphong.component';
import { ThongtinnguoidungComponent } from './html/thongtinnguoidung/thongtinnguoidung.component';
import { HoadonService } from './share/services/hoadon.service';
import { AuthGuard } from './share/services/guard/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'section', pathMatch: 'full' },
      { path: 'section', component: SectionComponent },
      { path: 'about', component: AboutusComponent },
      { path: 'room-introduce', component: GioithieuphongComponent },
      {path:'monan/:id',component:DetaildishComponent},
      {path:'uudai',component:UudaiComponent},
      {path:'user-profile',component:ThongtinnguoidungComponent},
      { path: 'dish', component: DishLishComponent ,children:[
        {path:'',redirectTo:'monan',pathMatch:'full'},
        {path:'monan',component:DishComponent},
        {path:'thucdon',component:ThucdonListComponent}
      ]},

      {
        path: 'listcart', component: ListcartComponent, children: [
          { path: '', redirectTo: 'cart', pathMatch: 'full' },
          { path: 'cart', component: CartComponent }
        ]
      }
    ]
  },
  { path: 'payment', component: PaymentComponent },
  
  { path: 'register', component: RegisterComponent },
  {path:'test',component:PhongComponent},
  {
    path: 'admin', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: AdminLoginComponent },
        {
          canActivate: [AuthGuard], path:'dashboard', component: AdminComponent, children: [
                { path: '', redirectTo: 'customer', pathMatch: 'full' },
                { path: 'customer', component: CustomerManagerComponent },
                { path: 'dish', component: DishManagerComponent },
                {path: 'dishtype', component: LoaimonanComponent},
                { path: 'menu', component: MenuManagerComponent },
                { path: 'services', component: DichvuComponent },
                { path: 'room', component: RoomManagerComponent },
                {path: 'roomtype', component: LoaiphongComponent},
                { path: 'booking', component: BooknowComponent },
                {
                    path: 'bills', component: BillsManagerComponent, children: [
                        { path: 'detail:/id', component: BillDetailComponent }
                    ]
                },
            ]
        }
    ]
}
]
@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    DishComponent,
    DishLishComponent,
    RegisterComponent,
    CartComponent,
    PaymentComponent,
    ListcartComponent,
    BilledComponent,
    DishExampleComponent,
    ThucdonComponent,
    DetaildishComponent,
    ThucdonExampleComponent,
    FilterdataPipe,
    UudaiComponent,
    ThucdonListComponent,
    PhongComponent,
    PaymentTuComponent,
    AdminLayoutComponent,
    AdminComponent,
    AdminLoginComponent,
    BillsManagerComponent,
    BooknowComponent,
    CustomerManagerComponent,
    DichvuComponent,
    DishManagerComponent,
    MenuManagerComponent,
    RoomManagerComponent,
    BillDetailComponent,
    AdheaderComponent,
    LoaimonanComponent,
    LoaiphongComponent,
    AboutusComponent,
    GioithieuphongComponent,
    ThongtinnguoidungComponent,
  ],
  imports: [
    OwlModule,
    AngularDateTimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DichvuService,LoginService,AuthGuard, HoadonService, HumanService,ThucdonserviceService,DishserviceService,DataTransferService, CartserviceService,PhongserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
